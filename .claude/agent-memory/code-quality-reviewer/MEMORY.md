# Code Quality Reviewer — Memory Index

- [BrandText legal-name exemption](convention_brandtext_legal_name.md) — legal/copyright "Mustgo Co., Ltd." is plain text, not <BrandText />; don't false-flag
- [Supabase silent DB errors](review_supabase_silent_errors.md) — supabase-js writes return {error} not throw; try/catch swallows DB failures — always check error
