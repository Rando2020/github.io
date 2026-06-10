"""
Orivo triage engine — pilot one.

Order of operations matters and is a safety decision, not a style decision:
  1. Emergency red flags first. Always. A cost question that mentions chest
     pain is an emergency, not a cost question.
  2. Barrier classification second (cost, transport, side effect, education,
     refill). These are the three pilot use cases plus the two most common
     urban-access barriers.
  3. AI draft last, and ONLY as a suggestion for the human reviewer. For
     pilot one nothing clinical is auto-sent.

Urban-specific notes baked into the taxonomy:
  - 'transport' includes bus/transit language, not just "no car" — urban
    patients more often cite transit cost/time than vehicle access.
  - 'cost' includes copay, deductible, and "pharmacy said it's not covered"
    phrasing common at the counter.
  - 'pharmacy_access' captures hours/closed/moved — pharmacy deserts are an
    urban problem too, not just rural.
"""
import re

EMERGENCY_PATTERNS = [
    r"\bchest (pain|tight|pressure)\b", r"\bcan'?t breathe\b", r"\btrouble breathing\b",
    r"\bsuicid", r"\bkill (myself|me)\b", r"\boverdos", r"\btook too (many|much)\b",
    r"\bpassed out\b", r"\bfaint(ed|ing)\b", r"\bseizure\b", r"\bswelling.*(face|throat|tongue)\b",
    r"\bthroat (is )?(closing|swelling)\b", r"\b(throat|face|tongue).{0,20}swell", r"\ballergic reaction\b", r"\bstroke\b",
    r"\bnumb(ness)? (on one side|in my (arm|face))\b", r"\bbleeding (a lot|won'?t stop)\b",
]

INTENT_PATTERNS = {
    "side_effect": [
        r"\bside effect", r"\bdizzy\b", r"\bnause", r"\brash\b", r"\bitch",
        r"\bheadache", r"\bstomach (hurts?|ache|pain)\b", r"\bmakes? me feel\b",
        r"\bfeel(ing)? (weird|sick|off|worse)\b", r"\bthrow(ing)? up\b", r"\bvomit",
        r"\btired all the time\b", r"\bswollen\b",
    ],
    "cost": [
        r"\bafford\b", r"\btoo expensive\b", r"\bcost", r"\bcopay\b", r"\bco-pay\b",
        r"\bdeductible\b", r"\bnot covered\b", r"\binsurance (denied|won'?t)\b",
        r"\bprice\b", r"\bcheaper\b", r"\bcoupon\b", r"\bgoodrx\b", r"\$\d+",
        r"\bcan'?t pay\b", r"\bmoney\b",
    ],
    "transport": [
        r"\bride\b", r"\bbus\b", r"\btrain\b", r"\btransit\b", r"\buber\b", r"\blyft\b",
        r"\bno (car|way to get)\b", r"\bcan'?t get (there|to the pharmacy)\b",
        r"\btoo far\b", r"\bget(ting)? a ride\b", r"\bbus pass\b", r"\bfare\b",
    ],
    "pharmacy_access": [
        r"\b(pharmacy|store) (is )?closed\b", r"\bhours\b", r"\bopen (late|on weekends?)\b",
        r"\bmoved\b", r"\bline (is|was) too long\b", r"\bwait(ed)? (an hour|too long)\b",
        r"\bdeliver", r"\bmail\b",
    ],
    "what_for": [
        r"\bwhat('?s| is) (this|it|that)\b.{0,25}\bfor\b", r"\bwhy (am i|do i) (taking|on)\b",
        r"\bwhat does (this|it) do\b", r"\bhow do i take\b", r"\bwith food\b",
        r"\bmorning or night\b", r"\bmissed a dose\b", r"\bforgot to take\b",
    ],
    "refill": [
        r"\brefill\b", r"\bran out\b", r"\bout of (pills|meds|medication)\b",
        r"\balmost (out|empty)\b", r"\brenew\b", r"\bmore (pills|medication)\b",
    ],
}

URGENCY_BY_INTENT = {
    "emergency": "emergency",
    "side_effect": "high",       # pharmacist reviews same day
    "refill": "high",            # gap in therapy directly hits PDC
    "cost": "routine",
    "transport": "routine",
    "pharmacy_access": "routine",
    "what_for": "routine",
    "other": "routine",
}


def classify(text: str) -> tuple[str, str]:
    """Return (intent, urgency). Emergency always wins."""
    t = text.lower()
    for pat in EMERGENCY_PATTERNS:
        if re.search(pat, t):
            return "emergency", "emergency"
    scores = {}
    for intent, pats in INTENT_PATTERNS.items():
        hits = sum(1 for p in pats if re.search(p, t))
        if hits:
            scores[intent] = hits
    if not scores:
        return "other", "routine"
    intent = max(scores, key=scores.get)
    return intent, URGENCY_BY_INTENT[intent]


# ---------------------------------------------------------------------------
# Draft suggestions for the human reviewer.
# Pilot one ships with templates. When you're ready to add an LLM, replace
# draft_reply() internals with an API call — the contract (returns a draft
# string that a HUMAN approves before sending) must not change.
# ---------------------------------------------------------------------------

DRAFTS = {
    "en": {
        "emergency": None,  # emergencies get the immediate auto-reply in replies.py, not a draft
        "side_effect": ("Thank you for telling us. A pharmacist is reviewing your message "
                        "and will follow up shortly. If your symptoms get worse, call 911."),
        "cost": ("Thanks for letting us know. We're sending this to the pharmacy team to "
                 "look at lower-cost options or assistance programs that may be available."),
        "transport": ("Got it — we'll check what pickup, delivery, or transportation support "
                      "options are available and follow up with you."),
        "pharmacy_access": ("Thanks for telling us. We'll check options like different pickup "
                            "times or delivery and get back to you."),
        "what_for": ("Good question — a pharmacist will send you a plain-language answer "
                     "about your medication shortly."),
        "refill": ("Thanks — we're flagging your refill to the pharmacy now so there's no "
                   "gap in your medication."),
        "other": ("Thanks for your message. A member of the pharmacy team will review it "
                  "and follow up with you."),
    },
    "es": {
        "emergency": None,
        "side_effect": ("Gracias por avisarnos. Un farmacéutico está revisando su mensaje y "
                        "le responderá pronto. Si sus síntomas empeoran, llame al 911."),
        "cost": ("Gracias por avisarnos. Enviaremos esto al equipo de la farmacia para "
                 "buscar opciones de menor costo o programas de asistencia."),
        "transport": ("Entendido — revisaremos opciones de recogida, entrega o transporte "
                      "y le responderemos."),
        "pharmacy_access": ("Gracias por avisarnos. Revisaremos opciones como otros horarios "
                            "de recogida o entrega a domicilio."),
        "what_for": ("Buena pregunta — un farmacéutico le enviará una respuesta clara sobre "
                     "su medicamento pronto."),
        "refill": ("Gracias — estamos avisando a la farmacia sobre su resurtido para que no "
                   "haya interrupción en su medicamento."),
        "other": ("Gracias por su mensaje. Un miembro del equipo de la farmacia lo revisará "
                  "y le responderá."),
    },
}


def draft_reply(intent: str, language: str = "en") -> str | None:
    lang = DRAFTS.get(language, DRAFTS["en"])
    return lang.get(intent, lang["other"])
