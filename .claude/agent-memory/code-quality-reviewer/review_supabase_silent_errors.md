---
name: review-supabase-silent-errors
description: Recurring review check — supabase-js query builders return {error}, never throw; try/catch around them swallows DB failures silently
metadata:
  type: feedback
---

Proactively check any `await supabase.from(...).insert/upsert/update/select(...)` for swallowed
errors. The supabase-js query builder resolves to `{ data, error }` and does **not** throw on
DB-level errors (unique violation, NOT NULL, RLS deny, PostgREST error). A `try { await ... }
catch {}` block therefore does NOT catch those — it only catches transport-level throws — and if
the returned `error` is never destructured/inspected, the failure is lost with no log.

**Why:** Seen in the PayPal edge functions (`paypal-create-order`, `paypal-capture-order`) where
"best-effort" try/catch blocks wrap `.insert()` / `.upsert()` but never check `error`, so a
failed payments-row write is silently dropped despite an intended `console.error`. In a money/
audit context this loses the reference/quote-number trail and can leave "charged but DB not
updated" states.

**How to apply:** Flag when a DB write's `error` field is ignored, especially in code that
comments itself as "best-effort logging". Correct pattern: `const { error } = await ...; if
(error) console.error(...)`. The try/catch is still fine for the truly-thrown case, but the
`error` check is what actually catches DB failures.
