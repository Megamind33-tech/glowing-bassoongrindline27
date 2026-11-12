import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const node = process.execPath;

function run(script, args = [], env = process.env) {
  const result = spawnSync(node, [script, ...args], { cwd: root, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("scripts/build-branding.mjs");

// Bundle only the content and services this offline-first Android build is allowed to ship with.
run("node_modules/next/dist/bin/next", ["build"], {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: "",
  NEXT_PUBLIC_HOSTED_CONTENT: "0",
  NEXT_PUBLIC_ONLINE_API: "",
  NEXT_PUBLIC_SIM_WS_URL: "",
  NEXT_PUBLIC_TURN_URLS: "",
  NEXT_PUBLIC_TURN_USERNAME: "",
  NEXT_PUBLIC_TURN_CREDENTIAL: "",
});

run("scripts/prepare-android.mjs");
run("node_modules/@capacitor/cli/bin/capacitor", ["sync", "android"]);
