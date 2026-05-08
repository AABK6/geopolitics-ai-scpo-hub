import { createFileRoute } from "@tanstack/react-router";
import { IntroSection } from "@/components/sections/IntroSection";
import { GptsTimelineSection } from "@/components/sections/GptsTimelineSection";
import { ConvergenceInterstitial } from "@/components/sections/ConvergenceInterstitial";
import { TensionsSection } from "@/components/sections/TensionsSection";
import { FlagsSection } from "@/components/sections/FlagsSection";
import { ScenariosSection } from "@/components/sections/ScenariosSection";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/")({
  component: Index,
});

export function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Masthead */}
      <header className="sticky top-0 z-30 border-b border-[color:var(--rule)] bg-[color:var(--paper)]/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--paper)]/80">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold tracking-[-0.01em] text-[color:var(--ink)]">
              Geopolitics of AI
            </span>
            <span className="hidden h-3 w-px bg-[color:var(--rule)] md:inline-block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)] md:inline">
              An essay
            </span>
          </div>
          <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
            <a href="#section-02" className="hover:text-[color:var(--accent)]">§ 02</a>
            <a href="#section-03" className="hover:text-[color:var(--accent)]">§ 03</a>
            <a href="#section-04" className="hover:text-[color:var(--accent)]">§ 04</a>
            <a href="#section-05" className="hover:text-[color:var(--accent)]">§ 05</a>
            <span className="hidden text-[color:var(--ink)] md:inline">2026</span>
          </nav>
        </div>
      </header>
      <ScrollProgress />

      <IntroSection />
      <div id="section-02"><GptsTimelineSection /></div>
      <ConvergenceInterstitial />
      <div id="section-03"><TensionsSection /></div>
      <div id="section-04"><FlagsSection /></div>
      <div id="section-05"><ScenariosSection /></div>

      {/* Colophon footer */}
      <footer className="border-t border-[color:var(--rule)] px-6 py-12">
        <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
          <div className="col-span-12 md:col-span-4">
            <div className="mb-2 text-[color:var(--ink)]">Colophon</div>
            Set in IBM Plex Sans, Serif &amp; Mono. Built with TanStack Start.
          </div>
          <div className="col-span-6 md:col-span-4">
            <div className="mb-2 text-[color:var(--ink)]">Sections</div>
            01 · Introduction<br />
            02 · The 24 GPTs in History<br />
            03 · Historical precedents<br />
            More to come
          </div>
          <div className="col-span-6 md:col-span-4">
            <div className="mb-2 text-[color:var(--ink)]">Authors</div>
            Aleksandra Majowka<br />
            Abe de Ruijter<br />
            Ram Erik Glomseth<br />
            Shariya Ashraf<br />
            Sebastian Ramirez Hernandez
          </div>
        </div>
      </footer>
    </main>
  );
}
