"""
Enroll a pilot roster from CSV and send the consent request text.

CSV columns: phone,org_id,language,med_category
Example row: +14145551234,providence_pharmacy,en,new_start

Usage:
  python -m app.enroll roster.csv            # enroll + send consent texts
  python -m app.enroll roster.csv --dry-run  # enroll only, print what would send
"""
import csv
import os
import sys

from twilio.rest import Client

from . import db, replies

PHARMACY_NAME = os.environ.get("PILOT_PHARMACY_NAME", "Your Pharmacy")


def main(path: str, dry_run: bool = False) -> None:
    sid = os.environ.get("TWILIO_ACCOUNT_SID")
    token = os.environ.get("TWILIO_AUTH_TOKEN")
    from_number = os.environ.get("TWILIO_MESSAGING_SERVICE_SID") or os.environ.get("TWILIO_FROM")
    client = None
    if not dry_run:
        if not (sid and token and from_number):
            sys.exit("Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and "
                     "TWILIO_MESSAGING_SERVICE_SID (or TWILIO_FROM), or use --dry-run.")
        client = Client(sid, token)

    conn = db.get_conn()
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            phone = row["phone"].strip()
            lang = (row.get("language") or "en").strip()
            pid = db.upsert_patient(conn, phone, row["org_id"].strip(), lang,
                                    (row.get("med_category") or "").strip() or None)
            body = replies.t(replies.CONSENT_REQUEST, lang, pharmacy=PHARMACY_NAME)
            if dry_run:
                print(f"[dry-run] {phone}: {body}")
                continue
            kwargs = {"to": phone, "body": body}
            if from_number.startswith("MG"):
                kwargs["messaging_service_sid"] = from_number
            else:
                kwargs["from_"] = from_number
            msg = client.messages.create(**kwargs)
            db.save_message(conn, pid, "outbound", body, twilio_sid=msg.sid)
            db.log_audit(conn, "consent.requested", {"patient_id": pid, "sid": msg.sid})
            print(f"sent consent request -> {phone} ({msg.sid})")


if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    main(args[0], dry_run="--dry-run" in args)
