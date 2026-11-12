import type { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";
import { GrindlineLogo } from "@/components/ui/GrindlineLogo";
import { REPO_URL, SITE_NAME } from "@/lib/site";

const DESCRIPTION = "What Grindline 27 stores on your device and how optional online racing works.";
const UPDATED = "12 November 2026";

export const metadata: Metadata = {
  title: "Privacy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", siteName: SITE_NAME, title: `Privacy | ${SITE_NAME}`, description: DESCRIPTION, locale: "en_US" },
};

const SECTION = "flex flex-col gap-4 border-t border-[#262B3D] pt-8";
const H2 = "lc-disp text-[28px] text-[#F5F7FA]";
const P = "m-0 max-w-[680px] text-[15px] leading-relaxed text-[#C5CBD8]";
const LINK = "text-[#F5F7FA] underline decoration-[#3A4157] underline-offset-4 hover:decoration-[#CCFF00]";

export default function PrivacyPage() {
  return (
    <main className="h-dvh overflow-y-auto bg-[#08090D] text-[#F5F7FA]">
      <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-10 px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Grindline 27 home" className="no-underline">
            <GrindlineLogo variant="compact" size="sm" />
          </Link>
          <Link href="/play" className="lc-title inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-5 py-2.5 text-[15px] text-[#08090D] no-underline">
            <Play aria-hidden className="h-4 w-4" strokeWidth={2.5} />
            Play
          </Link>
        </header>

        <section className="flex flex-col gap-4">
          <h1 className="lc-disp text-[clamp(44px,9vw,72px)] text-[#F5F7FA]">Privacy</h1>
          <p className="m-0 max-w-[680px] text-[17px] leading-relaxed text-[#C5CBD8]">
            Grindline 27 has no accounts, ads or third-party trackers. The Android build is playable offline and does not
            report gameplay activity to a Grindline server.
          </p>
          <p className="m-0 text-[13px] text-[#8E96AA]">Last changed {UPDATED}</p>
        </section>

        <section className={SECTION} aria-labelledby="local">
          <h2 id="local" className={H2}>Data stored on your device</h2>
          <p className={P}>
            Settings, controls, car setups, saved laps, race history, driver name and a locally generated driver key are
            kept in the app&apos;s storage. In a browser build, this data stays in that browser&apos;s site storage. Clearing
            the app&apos;s data or the browser&apos;s site data removes it.
          </p>
        </section>

        <section className={SECTION} aria-labelledby="network">
          <h2 id="network" className={H2}>Optional network connections</h2>
          <p className={P}>
            This repository build has no Grindline online leaderboard, scheduled race or usage-report service configured.
            If you create or join a direct multiplayer room, the game uses WebRTC. The connection broker and other players
            may receive your IP address as part of setting up that connection. Multiplayer room data is not saved by this
            build.
          </p>
        </section>

        <section className={SECTION} aria-labelledby="contact">
          <h2 id="contact" className={H2}>Questions</h2>
          <p className={P}>
            Grindline 27 is an independent project based on the open-source LibreCorsa racing simulator. For privacy
            questions, open an issue in the <a href={REPO_URL} className={LINK}>project repository</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
