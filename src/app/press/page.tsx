import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GrindlineLogo } from "@/components/ui/GrindlineLogo";
import { REPO_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the project",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/press" },
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#08090D] text-[#F5F7FA]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[920px] flex-col gap-10 px-5 py-8 sm:px-10 sm:py-12">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="no-underline"><GrindlineLogo variant="compact" size="sm" /></Link>
          <Link href="/play" className="lc-title rounded-full bg-[#CCFF00] px-5 py-2.5 text-[#08090D] no-underline">Play</Link>
        </header>
        <section className="flex flex-col gap-5">
          <p className="font-f1-mono text-[12px] font-bold tracking-[0.2em] text-[#CCFF00]">PROJECT STATUS</p>
          <h1 className="lc-disp m-0 text-[clamp(44px,9vw,76px)]">Grindline 27</h1>
          <p className="m-0 max-w-[740px] text-[19px] leading-relaxed text-[#C5CBD8]">
            An Android-first racing game in development. This first Android build brings LibreCorsa&apos;s 500 Hz vehicle
            simulation, AI races, dynamic weather and touch controls into a fullscreen app.
          </p>
          <p className="m-0 max-w-[740px] text-[15px] leading-relaxed text-[#8E96AA]">
            Career progression, teams, a larger original car roster and richer city environments are part of the Grindline
            vision and are still to be built. The current project contains one bundled car and one circuit.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#3A4157] px-5 py-3 text-sm font-semibold text-[#F5F7FA] no-underline hover:border-[#CCFF00]">
              Source and updates <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <Link href="/privacy" className="rounded-full border border-[#3A4157] px-5 py-3 text-sm font-semibold text-[#F5F7FA] no-underline hover:border-[#CCFF00]">Privacy</Link>
          </div>
        </section>
        <section className="mt-auto border-t border-[#262B3D] pt-6 text-[13px] leading-relaxed text-[#8E96AA]">
          <p className="m-0">Grindline 27 is independent and is not affiliated with LibreCorsa or any vehicle manufacturer, racing series, team, or circuit.</p>
        </section>
      </div>
    </main>
  );
}
