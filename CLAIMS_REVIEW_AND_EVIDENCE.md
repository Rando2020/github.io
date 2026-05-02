# Orivo Health Claims Review and Evidence Register

This file supports the public website and pitch. It separates evidence-backed market claims from Orivo-specific pilot hypotheses.

## Key rule

Use public research to support the **problem**. Do not imply Orivo has achieved outcomes until pilots generate data.

## Supported public claims

| Claim | Status | Source |
|---|---|---|
| Medication nonadherence is associated with roughly 125,000 deaths per year in the U.S. | Supported as an estimate | Public Health Reports / Surgeon General: https://pmc.ncbi.nlm.nih.gov/articles/PMC3234383/ |
| Nonadherence costs are commonly estimated in the $100B-$300B annual range | Supported as a range | Public Health Reports: https://pmc.ncbi.nlm.nih.gov/articles/PMC3234383/ and JAMA: https://jamanetwork.com/journals/jama/fullarticle/1690707 |
| Non-optimized medication therapy has been estimated at $528.4B annually | Supported with nuance | NASPA summary of Watanabe et al.: https://naspa.us/blog/2018/04/06/new-study-reports-non-optimized-medication-therapy-costs-528-4-billion-annually/ |
| Only 12% of U.S. adults have proficient health literacy | Supported | NCBI Bookshelf: https://www.ncbi.nlm.nih.gov/books/NBK44254/ and AHRQ NHQDR: https://www.ncbi.nlm.nih.gov/books/n/nhqdr2019/ch4/ |
| Cell phone ownership is nearly universal in the U.S. | Supported | Pew Mobile Fact Sheet: https://www.pewresearch.org/internet/fact-sheets/mobile/ |
| PDC is the preferred method for PQA adherence measures and 80% is a common threshold | Supported | PQA: https://www.pqaalliance.org/adherence-measures |
| Medication adherence for diabetes, hypertension/RAS antagonists, and statins is part of Medicare Part D Star Ratings reporting | Supported | CMS 2025 MA and Part D Star Ratings: https://www.cms.gov/newsroom/fact-sheets/2025-medicare-advantage-and-part-d-star-ratings |
| Transportation, food access, housing, utilities, and financial strain are recognized HRSN categories | Supported | CMS SDOH/HRSN: https://www.cms.gov/priorities/innovation/key-concepts/social-drivers-health-and-health-related-social-needs and Medicaid.gov: https://www.medicaid.gov/medicaid/section-1115-demonstrations/health-related-social-needs |
| Twilio can support HIPAA-eligible communication workflows when eligible products are used and a BAA is signed | Supported with implementation caveats | Twilio HIPAA: https://www.twilio.com/en-us/hipaa |
| RxNorm provides normalized names for clinical drugs and supports interoperability across drug vocabularies | Supported | NLM RxNorm: https://www.nlm.nih.gov/research/umls/rxnorm/index.html |

## Claims to rewrite before public/investor review

| Current/Risky Claim | Recommended Replacement |
|---|---|
| Orivo reduces ADEs | Orivo is designed to capture patient-reported medication concerns and route potential safety signals to pharmacists or care teams for review. |
| Orivo improves PDC scores | Orivo is designed to support adherence workflows tied to PDC-tracked medication classes. |
| HIPAA compliant | Designed for future HIPAA-aligned deployment with BAAs, encryption, audit logs, access controls, and security review. |
| Any phone, any country, any insurance | Designed for U.S. SMS-first pilots, with basic-phone compatibility and future multilingual expansion. |
| Everyone else built an app | Many digital health tools still assume apps, portals, downloads, or high digital literacy. |
| Only longitudinal conversational health dataset in existence | Long-term opportunity: build a longitudinal dataset of patient-reported medication concerns and access barriers. |

## Orivo-specific claims that are not yet supported

Do not publish these as facts until pilot data exists:

- Orivo improves adherence.
- Orivo improves PDC.
- Orivo reduces adverse drug events.
- Orivo reduces hospitalizations.
- Orivo improves Star Ratings.
- Orivo reduces pharmacist workload by a specific percentage.
- Orivo has validated clinical accuracy.
- Orivo is HIPAA compliant in production.
- Orivo supports every insurance plan.
- Orivo supports every language/country operationally.

## Public phrase bank

- “Prototype-stage”
- “Designed to”
- “Pilot hypothesis”
- “Supports adherence workflows”
- “Routes potential safety signals”
- “Pharmacist-in-the-loop”
- “Human-reviewed response”
- “HIPAA-conscious architecture”
- “No PHI should be submitted through this static site”
