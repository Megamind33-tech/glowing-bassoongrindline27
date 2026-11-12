# Grindline 27 vision and implementation map

Grindline 27 is an Android-first racing league game with realistic driving, team and career progression, weather, and
distinctive locations. This project reuses LibreCorsa's existing racing technology, then develops a Grindline game around
it. The Flash-2026 vision is treated as the product brief; its engine-specific implementation and private files are not
copied into this repository.

## Foundation decision

- **Simulation and rendering:** LibreCorsa's TypeScript physics and Three.js renderer.
- **Android delivery:** Capacitor's native Android project with a bundled, fullscreen landscape game.
- **Offline-first:** the first build bundles its playable track and car and defaults Grindline online services off.
- **Product identity:** Grindline 27 branding, touch-first Android launch, and a local-first save foundation. LibreCorsa is
  credited as the open-source racing base.

Capacitor hosts the existing game in Android WebView. This is an installed Android application, while the simulation and
graphics continue to run in the reused web technology stack. It avoids throwing away the existing physics, tracks, AI,
weather and race UI for a second engine.

## What exists in this checkout

| Vision area | Current foundation | Remaining work |
|---|---|---|
| Android game | Capacitor app identity, bundled static export, landscape/fullscreen configuration and native back handling | Build and accept on real devices; optimize for Android GPU and thermal budgets |
| Driving | LibreCorsa 500 Hz physics, touch steering/pedals, AI races, local practice | Tune touch feel and difficulty for phone play; replace borrowed content where rights require it |
| Track and weather | RISE Motordrome, dynamic wetness, time of day, PBR/WebGL rendering | Expand locations; improve water, road surface detail, city architecture, traffic, crowds and foliage |
| Cars | One included 2026 prototype model with working vehicle physics | Build a distinct fictional roster, with cleared models, sounds, licenses and mobile LODs |
| Offline play | Core game and included assets ship in the app; local settings and lap data | Verify cold launch and a complete race in airplane mode on target devices |
| League and career | Race session/results systems in the inherited base | Add original drivers and teams, points, events, seasons, contracts and career persistence |
| Online play | Reusable peer-to-peer multiplayer code; Grindline online API is off by default | Decide and build Grindline-operated services only when league features need them |

## Realism and Android acceptance goals

These are implementation targets, not claims that the current app already meets them:

1. **Driving:** steering, throttle and brake feel predictable on touch; AI races complete reliably; weather changes tire
   grip and visibility; controls remain responsive during long sessions.
2. **Surfaces:** asphalt has layered aggregate and rubber; wetness follows surface height; puddles reflect their
   surroundings; geometry-based road defects affect the wheels and sound.
3. **Locations:** buildings use city-specific materials and authored details; traffic, spectators, signs, flags and
   foliage add movement without overwhelming the phone GPU.
4. **Cars:** original fictional designs use reflective paint and glass, detailed wheels and brakes, and LODs that preserve
   their shape at distance. Do not ship trademarked designs or unlicensed badges.
5. **Career:** progress through events and seasons, build a team, manage drivers and retain a save locally so the game
   works without an account or network connection.
6. **Performance:** record frame time, memory and thermal behavior on low- and mid-range Android devices before setting
   budgets. Keep visible geometry, draw calls and texture memory within those measured budgets.

## Delivery order

1. Finish the Android shell and verify launch, rotation, input, audio, pause/back behavior and offline race flow on devices.
2. Stabilize phone controls, graphics tiers and performance capture for the included race.
3. Implement a local-first career and league model around the existing race results, with explicit save migration.
4. Replace or clear restricted vehicle, track and sound assets; create the Grindline fictional roster and visual identity.
5. Improve one showcase location against the realism goals, then add venues and league events in measured increments.
6. Add optional Grindline online services after offline career and race play are solid.

## Rights and attribution

The inherited source is MIT licensed, but assets are separately licensed. In particular, RISE Motordrome is CC BY-NC-SA
and cannot be included in a commercial release without new permission or replacement. See [CREDITS.md](../CREDITS.md)
and the asset-specific license files. Track and car sourcing is a release gate, not an assumption that every included
asset is cleared for Grindline's future distribution.
