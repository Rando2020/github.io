"""
Orivo patient-side pipeline — data layer.

SQLite for the pilot scaffold. Swap for Postgres (RDS) before any PHI workflow.
Every table that touches a patient event is written through log_audit() so the
"what did the system do and who approved it" question is always answerable.
"""
import sqlite3
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "orivo_pilot.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,            -- E.164, e.g. +14145551234
    org_id TEXT NOT NULL,                  -- pilot partner (pharmacy) identifier
    language TEXT NOT NULL DEFAULT 'en',   -- 'en' or 'es' for pilot one
    med_category TEXT,                     -- coarse category only (e.g. 'new_start')
    enrolled_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS consents (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL REFERENCES patients(id),
    status TEXT NOT NULL CHECK (status IN ('pending','granted','revoked')),
    method TEXT NOT NULL,                  -- 'sms_reply' for pilot one
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL REFERENCES patients(id),
    direction TEXT NOT NULL CHECK (direction IN ('inbound','outbound')),
    body TEXT NOT NULL,
    twilio_sid TEXT,
    delivery_status TEXT,                  -- updated by status callbacks
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS triage_cases (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL REFERENCES patients(id),
    message_id TEXT NOT NULL REFERENCES messages(id),
    intent TEXT NOT NULL,                  -- emergency|side_effect|cost|transport|what_for|refill|other
    urgency TEXT NOT NULL CHECK (urgency IN ('emergency','high','routine')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_review','resolved')),
    ai_draft TEXT,                         -- model-suggested reply (never auto-sent for clinical intents)
    human_final TEXT,                      -- what the reviewer actually approved/sent
    reviewer TEXT,
    created_at TEXT NOT NULL,
    resolved_at TEXT
);

CREATE TABLE IF NOT EXISTS audit_log (
    id TEXT PRIMARY KEY,
    event TEXT NOT NULL,                   -- e.g. consent.granted, triage.created, message.sent
    payload TEXT NOT NULL,                 -- JSON details incl. model_version where relevant
    created_at TEXT NOT NULL
);
"""


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    return conn


def log_audit(conn, event: str, payload: dict) -> None:
    conn.execute(
        "INSERT INTO audit_log (id, event, payload, created_at) VALUES (?,?,?,?)",
        (str(uuid.uuid4()), event, json.dumps(payload), now()),
    )
    conn.commit()


def upsert_patient(conn, phone: str, org_id: str, language: str = "en",
                   med_category: str | None = None) -> str:
    row = conn.execute("SELECT id FROM patients WHERE phone=?", (phone,)).fetchone()
    if row:
        return row["id"]
    pid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO patients (id, phone, org_id, language, med_category, enrolled_at) "
        "VALUES (?,?,?,?,?,?)",
        (pid, phone, org_id, language, med_category, now()),
    )
    conn.execute(
        "INSERT INTO consents (id, patient_id, status, method, updated_at) "
        "VALUES (?,?,?,?,?)",
        (str(uuid.uuid4()), pid, "pending", "sms_reply", now()),
    )
    conn.commit()
    log_audit(conn, "patient.enrolled", {"patient_id": pid, "org_id": org_id})
    return pid


def get_patient_by_phone(conn, phone: str):
    return conn.execute("SELECT * FROM patients WHERE phone=?", (phone,)).fetchone()


def get_consent(conn, patient_id: str):
    return conn.execute(
        "SELECT * FROM consents WHERE patient_id=? ORDER BY updated_at DESC LIMIT 1",
        (patient_id,),
    ).fetchone()


def set_consent(conn, patient_id: str, status: str) -> None:
    conn.execute(
        "UPDATE consents SET status=?, updated_at=? WHERE patient_id=?",
        (status, now(), patient_id),
    )
    conn.commit()
    log_audit(conn, f"consent.{status}", {"patient_id": patient_id})


def save_message(conn, patient_id: str, direction: str, body: str,
                 twilio_sid: str | None = None) -> str:
    mid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO messages (id, patient_id, direction, body, twilio_sid, created_at) "
        "VALUES (?,?,?,?,?,?)",
        (mid, patient_id, direction, body, twilio_sid, now()),
    )
    conn.commit()
    return mid


def create_triage_case(conn, patient_id: str, message_id: str, intent: str,
                       urgency: str, ai_draft: str | None) -> str:
    tid = str(uuid.uuid4())
    conn.execute(
        "INSERT INTO triage_cases (id, patient_id, message_id, intent, urgency, ai_draft, created_at) "
        "VALUES (?,?,?,?,?,?,?)",
        (tid, patient_id, message_id, intent, urgency, ai_draft, now()),
    )
    conn.commit()
    log_audit(conn, "triage.created",
              {"case_id": tid, "intent": intent, "urgency": urgency})
    return tid
