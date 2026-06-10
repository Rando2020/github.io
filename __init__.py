"""
Orivo patient-side pipeline — webhook + reviewer API.

Flow for every inbound patient text:

  Twilio --> POST /sms (signature validated)
    └─ STOP?  -> revoke consent, confirm, done
    └─ not enrolled? -> polite redirect, done
    └─ consent pending + YES? -> grant consent, welcome, done
    └─ consented message:
         classify (triage.py)
         ├─ emergency -> immediate 911 auto-reply + HIGH-priority case for staff
         └─ everything else -> acknowledgment + triage case with AI draft
                               (a human approves the substantive reply)

Run locally:
  pip install -r requirements.txt
  uvicorn app.main:app --reload --port 8000
  ngrok http 8000   # point your Twilio number's webhook at the ngrok URL + /sms
"""
import os
from fastapi import FastAPI, Request, Response, HTTPException
from twilio.request_validator import RequestValidator
from twilio.twiml.messaging_response import MessagingResponse

from . import db, triage, replies

app = FastAPI(title="Orivo Patient Pipeline", version="0.1.0")

TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "")
PHARMACY_NAME = os.environ.get("PILOT_PHARMACY_NAME", "Your Pharmacy")
VALIDATE_SIGNATURES = os.environ.get("VALIDATE_TWILIO_SIGNATURES", "true") == "true"


async def _validate_twilio(request: Request, form: dict) -> None:
    """Reject requests that aren't genuinely from Twilio."""
    if not VALIDATE_SIGNATURES:
        return  # local dev only — never disable in a deployed environment
    validator = RequestValidator(TWILIO_AUTH_TOKEN)
    signature = request.headers.get("X-Twilio-Signature", "")
    url = str(request.url)
    if not validator.validate(url, form, signature):
        raise HTTPException(status_code=403, detail="Invalid Twilio signature")


def _twiml(message: str | None) -> Response:
    resp = MessagingResponse()
    if message:
        resp.message(message)
    return Response(content=str(resp), media_type="application/xml")


@app.post("/sms")
async def inbound_sms(request: Request) -> Response:
    form = dict(await request.form())
    await _validate_twilio(request, form)

    from_phone = form.get("From", "")
    body = (form.get("Body") or "").strip()
    body_norm = body.lower().strip(".!? ")

    conn = db.get_conn()
    patient = db.get_patient_by_phone(conn, from_phone)

    # --- Unknown number ---------------------------------------------------
    if patient is None:
        return _twiml(replies.t(replies.NOT_ENROLLED, "en"))

    lang = patient["language"]
    pid = patient["id"]
    msg_id = db.save_message(conn, pid, "inbound", body)

    # --- Opt-out always wins ----------------------------------------------
    if body_norm in replies.STOP_WORDS:
        db.set_consent(conn, pid, "revoked")
        return _twiml(replies.t(replies.OPT_OUT_CONFIRMED, lang))

    consent = db.get_consent(conn, pid)

    # --- Consent state machine ---------------------------------------------
    if consent["status"] == "revoked":
        if body_norm in replies.YES_WORDS:  # patient re-opting in
            db.set_consent(conn, pid, "granted")
            return _twiml(replies.t(replies.CONSENT_CONFIRMED, lang))
        return _twiml(None)  # do not message revoked patients

    if consent["status"] == "pending":
        if body_norm in replies.YES_WORDS:
            db.set_consent(conn, pid, "granted")
            return _twiml(replies.t(replies.CONSENT_CONFIRMED, lang))
        return _twiml(replies.t(replies.AWAITING_CONSENT, lang, pharmacy=PHARMACY_NAME))

    # --- Consented: triage -------------------------------------------------
    intent, urgency = triage.classify(body)
    draft = triage.draft_reply(intent, lang)
    db.create_triage_case(conn, pid, msg_id, intent, urgency, draft)

    if intent == "emergency":
        reply = replies.t(replies.EMERGENCY_REPLY, lang)
        db.save_message(conn, pid, "outbound", reply)
        db.log_audit(conn, "emergency.autoreply", {"patient_id": pid, "message_id": msg_id})
        return _twiml(reply)

    # Non-emergency: send the acknowledgment now; the substantive answer is
    # approved by a human in the reviewer queue before it goes out.
    if draft:
        db.save_message(conn, pid, "outbound", draft)
        return _twiml(draft)
    return _twiml(None)


@app.post("/sms/status")
async def status_callback(request: Request) -> Response:
    """Twilio delivery status callbacks — keep the audit trail honest."""
    form = dict(await request.form())
    await _validate_twilio(request, form)
    conn = db.get_conn()
    conn.execute(
        "UPDATE messages SET delivery_status=? WHERE twilio_sid=?",
        (form.get("MessageStatus"), form.get("MessageSid")),
    )
    conn.commit()
    return Response(status_code=204)


# ---------------------------------------------------------------------------
# Reviewer endpoints — the pharmacist-facing side. Pilot one can drive these
# with curl or a tiny internal page; do NOT expose publicly without auth.
# ---------------------------------------------------------------------------

@app.get("/queue")
def open_cases():
    conn = db.get_conn()
    rows = conn.execute(
        "SELECT t.id, t.intent, t.urgency, t.status, t.ai_draft, t.created_at, "
        "m.body AS patient_message, p.language, p.med_category "
        "FROM triage_cases t "
        "JOIN messages m ON m.id = t.message_id "
        "JOIN patients p ON p.id = t.patient_id "
        "WHERE t.status != 'resolved' "
        "ORDER BY CASE t.urgency WHEN 'emergency' THEN 0 WHEN 'high' THEN 1 ELSE 2 END, "
        "t.created_at"
    ).fetchall()
    return [dict(r) for r in rows]


@app.post("/queue/{case_id}/resolve")
def resolve_case(case_id: str, reviewer: str, final_reply: str | None = None):
    """Reviewer approves (optionally edits) the reply; we record both versions."""
    conn = db.get_conn()
    case = conn.execute("SELECT * FROM triage_cases WHERE id=?", (case_id,)).fetchone()
    if not case:
        raise HTTPException(404, "Case not found")
    conn.execute(
        "UPDATE triage_cases SET status='resolved', human_final=?, reviewer=?, resolved_at=? "
        "WHERE id=?",
        (final_reply or case["ai_draft"], reviewer, db.now(), case_id),
    )
    conn.commit()
    db.log_audit(conn, "triage.resolved", {
        "case_id": case_id, "reviewer": reviewer,
        "edited": bool(final_reply and final_reply != case["ai_draft"]),
    })
    return {"ok": True}


@app.get("/metrics")
def pilot_metrics():
    """The numbers that prove (or disprove) the concept."""
    conn = db.get_conn()
    def one(q):
        return conn.execute(q).fetchone()[0]
    return {
        "patients_enrolled": one("SELECT COUNT(*) FROM patients"),
        "consent_granted": one("SELECT COUNT(*) FROM consents WHERE status='granted'"),
        "consent_revoked": one("SELECT COUNT(*) FROM consents WHERE status='revoked'"),
        "inbound_messages": one("SELECT COUNT(*) FROM messages WHERE direction='inbound'"),
        "cases_by_intent": {r["intent"]: r["n"] for r in conn.execute(
            "SELECT intent, COUNT(*) n FROM triage_cases GROUP BY intent")},
        "open_cases": one("SELECT COUNT(*) FROM triage_cases WHERE status!='resolved'"),
        "barriers_surfaced": one(
            "SELECT COUNT(*) FROM triage_cases WHERE intent IN "
            "('cost','transport','pharmacy_access')"),
    }
