# Grindline 27

**Grindline 27 is an Android racing game built on the LibreCorsa racing-simulation stack.** This repository packages the
existing 500 Hz vehicle simulation and Three.js renderer as a fullscreen, landscape Android app, with touch controls and
offline play.

The Android shell uses Capacitor and Android WebView. The game itself continues to use LibreCorsa's TypeScript vehicle
physics, Three.js WebGL renderer, audio, AI and race systems. This reuses a substantial working racing foundation instead
of replacing it with a new engine.

## Current build

- Android app id: `com.grindline27.racing`
- Bundled content: the 2026 prototype car and RISE Motordrome circuit
- Existing game systems: practice, AI racing, weather, touch controls, local settings and lap history
- Online Grindline services: not configured in this repository build
- Career, teams, season management, city traffic and the expanded original car roster: planned work, not implemented yet

This is an early Android foundation. It has not been device-accepted or released through Google Play. The exact included
content and its limits are documented in [the vision implementation map](docs/GRINDLINE_VISION.md).

## Build the Android app

Requirements: Node.js 22 or newer, JDK 21, Android Studio, and an Android SDK installed through Android Studio.

```bash
npm ci
npm run android:sync
npm run android:open
```

`android:sync` exports the static game into `out/` and syncs it into the native Android project. In Android Studio, run
the `android` app configuration on a device or emulator. To build a debug APK from the command line after syncing:

```bash
cd android
./gradlew assembleDebug
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`. Release signing keys must be supplied by the
project owner and must not be committed.

Pushes to `main` or `master` also build an **unsigned debug APK** in GitHub Actions and attach it as the
`grindline-27-android-debug` workflow artifact. It is for development installs, not a Play Store release.

For web development, `npm run dev` starts the Next.js app at `http://localhost:3000`. The regular browser build remains
available for development and preview.

## Upstream and asset licenses

The simulation and renderer are based on [LibreCorsa by KhazP](https://github.com/KhazP/librecorsa). The inherited code
is MIT licensed; the upstream source and its author are credited in [CREDITS.md](CREDITS.md). Grindline 27 is an
independent project and is not affiliated with LibreCorsa.

Models, circuits, audio, fonts and other content retain their own licenses. Some shipped assets are explicitly
non-commercial or share-alike, and are not covered by the code's MIT license. Review [CREDITS.md](CREDITS.md) and each
asset's license before redistribution. This checkout is not cleared for commercial release as-is; replace or separately
clear restricted assets before a commercial launch.

## Project documents

- [Grindline vision and implementation map](docs/GRINDLINE_VISION.md)
- [Inherited asset credits and license notes](CREDITS.md)
- [MIT license for source code](LICENSE)
