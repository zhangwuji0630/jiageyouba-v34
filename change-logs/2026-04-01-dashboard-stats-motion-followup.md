# 2026-04-01 Dashboard And Stats Motion Follow-up

## Scope

This follow-up keeps the previously added dashboard and stats motion work, but tightens the trigger timing so the entrance animations reliably play instead of being swallowed by the first paint.

## Changes Made

- `app.js`
  - Switched dashboard stagger entrance from frame-based triggering to explicit timer-based staggering.
  - Switched stats category-row reveal from frame-based triggering to explicit timer-based staggering.
  - Kept the motion scope limited to dashboard and stats surfaces only.

## Verification

- Local preview verification on a narrow mobile viewport
- Confirmed dashboard early state shows only part of the entrance sequence before all six motion targets finish
- Confirmed stats category rows start hidden and then fully reveal
- Confirmed donut share arc still sweeps clockwise to the final share and the center percentage catches up to the final value
