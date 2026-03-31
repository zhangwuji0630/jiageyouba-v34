# 2026-03-31 Dashboard Original Restore

## Scope

Repository: `jiageyouba-v34-clean`

This log records the restoration of the original dashboard story-card image after the user requested the exact original visual instead of a fallback replacement.

## Problem

- The dashboard card had first been switched from the broken external image to a working local fallback.
- That fallback solved loading, but it was not the original picture the user wanted.
- A later correction made the card follow vehicle type, which still did not satisfy the request because the original dashboard card used one fixed image.

## Changes Made

- Downloaded the original dashboard story-card image through a reachable proxy and stored it locally as `assets/dashboard-story-original.png`.
- Updated `index.html` to use the local original image instead of any placeholder or vehicle-linked artwork.
- Removed the dashboard story-card runtime artwork override from `app.js` so the card now stays on the restored original image.

## Result

- The dashboard story card now uses the original picture again.
- The image is same-origin and no longer depends on the external Google-hosted URL at runtime.
- Other vehicle-art logic remains in place for the settings page only.
