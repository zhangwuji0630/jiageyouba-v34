# 2026-04-01 Dashboard Transition And Settings Pills

## Scope

This pass fixes only two follow-up issues:

- dashboard page flash and overly jumpy entrance motion when switching quickly between pages
- settings page preference pills appearing too harsh in dark mode

## Changes Made

- `index.html`
  - Aligned the dashboard static card markup with the final rendered layout so the page no longer flashes the old structure before motion begins.
  - Marked dashboard hero, cards, and story card as motion targets from first paint.
  - Added an early dashboard fast-return gate so quick jumps back from other internal pages skip the re-entry animation before the browser paints the page.
- `app.js`
  - Refined dashboard entrance timing so the hero and main spend card lead with tighter overlap instead of a strong top-to-bottom drop.
  - Added same-session page visit tracking so rapid returns to the dashboard use immediate reveal instead of replaying the full entrance.
- `app.css`
  - Softened dashboard entrance motion by reducing travel distance and shortening the easing curve.
  - Added a no-transition rule for dashboard fast returns.
  - Tuned the dark-mode active state for settings preference pills to a dimmer tinted accent instead of a bright solid block.

## Verification

- Local browser verification on mobile viewport
- Confirmed dashboard no longer flashes the old card layout before motion starts
- Confirmed rapid internal returns can render the dashboard immediately without replaying the entrance
- Confirmed dashboard entrance feels softer and less top-to-bottom on a cold load
- Confirmed settings preference active pills in dark mode no longer render as bright green with harsh light text
