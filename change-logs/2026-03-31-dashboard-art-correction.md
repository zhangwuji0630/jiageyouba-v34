# 2026-03-31 Dashboard Art Correction

## Scope

Repository: `jiageyouba-v34-clean`

This log records the correction after the dashboard story card was restored with the wrong local fallback image.

## Problem

- The previous follow-up replaced the broken dashboard image with a working local asset, but the chosen asset was a fixed off-road illustration.
- That fallback did not match the expected V3.6 dashboard artwork language and could show the wrong vehicle type for the active car.

## Changes Made

- `index.html`
  - Added a stable `dashboardStoryArtwork` hook for the dashboard story image.
  - Changed the static fallback from `offroad-blue.svg` to `coupe-blue.svg`, which is closer to the default V3.6 sports-car presentation.
- `app.js`
  - Reused `getVehicleArtworkMeta(activeVehicle.name)` so the dashboard story image now follows the active vehicle name, the same way the settings current-car card already does.
  - Updated the runtime `alt` text to describe the active vehicle artwork rather than a hard-coded off-road image.

## Expected Result

- A sports-car active vehicle such as `保时捷 911 GT3` now resolves to `./assets/vehicle-art/coupe-blue.svg`.
- SUV or off-road names still resolve to `offroad-blue.svg`.
- Sedan-like names resolve to `sedan-blue.svg`.

## Verification Target

- Re-open `index.html` and confirm the dashboard story image source matches the active vehicle.
- Confirm the asset still loads locally with non-zero image dimensions.
