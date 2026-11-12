import { withBasePath } from "@/lib/base-path";

/**
 * Links made before the home page existed open the game at "/": invites (`?room=`), car links, the developer
 * switches, sites that frame the game and installs from before the manifest pointed at /play. This inline script
 * sends those on to /play with their query and hash, before anything is drawn. The parameter list is every one the
 * game reads.
 *
 * A Capacitor Android build and installed PWA open straight into the game. A normal browser visitor keeps the home hub.
 *
 * It sits in the root layout, which is drawn once per page load: in the home page itself, React would render the
 * tag again on an in-site visit to "/" (and say so), though only a fresh load needs it. Anywhere but "/" it does
 * nothing.
 */
const GAME_PARAMS = ["room", "car", "sim", "f1physics", "vf26engine", "depth", "sky", "colliders", "perf", "profile"];
const HOME = withBasePath("/").replace(/\/+$/, "") || "/";

export const FORWARD_TO_GAME = `(function(){try{if((location.pathname.replace(/\\/+$/,"")||"/")!==${JSON.stringify(HOME)})return;var q=new URLSearchParams(location.search);var game=${JSON.stringify(GAME_PARAMS)}.some(function(k){return q.has(k)});var framed=window.self!==window.top;var app=matchMedia("(display-mode: standalone)").matches||!!(window.Capacitor&&typeof window.Capacitor.isNativePlatform==="function"&&window.Capacitor.isNativePlatform());if(game||framed||app)location.replace(${JSON.stringify(withBasePath("/play"))}+location.search+location.hash)}catch(e){}})()`;
