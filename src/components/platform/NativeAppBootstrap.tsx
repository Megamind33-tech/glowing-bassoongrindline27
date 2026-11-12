"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar } from "@capacitor/status-bar";

/** Native Android boot behavior; web installs continue to use the PWA manifest and service worker. */
export function NativeAppBootstrap() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    void StatusBar.hide();
    const splashTimer = window.setTimeout(() => void SplashScreen.hide(), 700);
    let removeBackListener: (() => void) | undefined;

    void App.addListener("backButton", () => {
      // Let the game's existing Escape/back handlers pause or close the current screen.
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
    }).then((listener) => {
      removeBackListener = () => void listener.remove();
    });

    return () => {
      window.clearTimeout(splashTimer);
      removeBackListener?.();
    };
  }, []);

  return null;
}
