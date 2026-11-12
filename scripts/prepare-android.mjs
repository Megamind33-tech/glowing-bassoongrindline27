import { rm } from "node:fs/promises";

// These press-kit archives and screenshots are useful in the source repository but are not part of the Android game.
await rm(new URL("../out/press/", import.meta.url), { recursive: true, force: true });
