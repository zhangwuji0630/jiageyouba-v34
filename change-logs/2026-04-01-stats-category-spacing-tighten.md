# 2026-04-01 Stats Category Spacing Tighten

## Scope

Repository: `jiageyouba-v34-clean`

This change fixes only the trend page category detail spacing that still looked too loose after the previous pass.

## Requested Issue

- On the trends page, the vertical spacing between category detail rows such as `加油` and `保养` was still too large.
- The requested target was tighter than the current build and also slightly tighter than the previous version, but not cramped.

## Changes Made

- `stats.html`
  - Tightened the category list wrapper from `space-y-3` to `space-y-2`.
- `app.js`
  - Tightened the clickable row vertical padding from `py-1` to `py-0.5` while preserving click and keyboard navigation.
- Version metadata
  - Bumped the app release markers to `V3.6.2` in the page titles, settings version label, `manifest.webmanifest`, `service-worker.js`, `app.js`, `README.md`, and `supabase/setup.sql`.

## Verification

- Local preview served from `http://127.0.0.1:4173`
- Desktop trend-page screenshot captured after the change
- Mobile trend-page screenshot captured after the change
- Narrow spillover check limited to the same trend-page category block

## Review Note

- This was handled as a strict-scope fix.
- No unrelated UI adjustments were intentionally added.
