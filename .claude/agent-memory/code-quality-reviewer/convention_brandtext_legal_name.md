---
name: convention-brandtext-legal-name
description: BrandText exemption — legal entity name / copyright lines render plain "Mustgo", not <BrandText />
metadata:
  type: feedback
---

CLAUDE.md says the "Mustgo" wordmark must ALWAYS render through `<BrandText />`, but in
practice the codebase exempts the **legal entity name and copyright line**: these render as
plain text "Mustgo Co., Ltd." / "© 2026 Mustgo Co., Ltd." and "(주)머스트고".

**Why:** Established precedent in `src/components/layout/Footer.jsx` — the copyright line is
plain text while the tagline prose uses `<BrandText />`. `PayPage.jsx` follows the same split.

**How to apply:** When reviewing, do NOT flag plain-text "Mustgo Co., Ltd." in footers,
business-registration lines, or copyright notices as a BrandText violation. The BrandText rule
applies to the brand wordmark in **prose/marketing copy**, not the legal name. `alt="Mustgo"`
on the logo image is also fine (alt text, not a rendered wordmark).
