import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/base-path";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "GR27",
    description: SITE_DESCRIPTION,
    start_url: withBasePath("/play"),
    scope: withBasePath("/"),
    display: "fullscreen",
    orientation: "landscape",
    background_color: "#08090D",
    theme_color: "#08090D",
    categories: ["games", "sports"],
    icons: [
      { src: withBasePath("/branding/grindline-27-icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: withBasePath("/branding/grindline-27-icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: withBasePath("/branding/grindline-27-icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: withBasePath("/branding/grindline-27-mark.svg"), sizes: "any", type: "image/svg+xml" },
    ],
  };
}
