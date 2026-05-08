const NAV_LINKS = [
  { href: "#section-02", label: "GPTs in History" },
  { href: "#section-03", label: "Historical Precedents" },
  { href: "#section-04", label: "National Cases" },
  { href: "#section-05", label: "Scenarios" },
];

export function IntroSection() {
  return (
    <section className="w-full px-6 pb-20 pt-12 md:pb-32 md:pt-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          <span>§ 01 / Introduction</span>
          <span className="h-px flex-1 bg-[color:var(--rule)] opacity-40" />
          <span className="text-[color:var(--ink-mute)]">Essay · 2026</span>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <h1 className="col-span-12 text-5xl font-semibold leading-[0.98] tracking-[-0.025em] text-[color:var(--ink)] md:col-span-10 md:text-7xl lg:text-[88px]">
            Downstream of the Frontier
          </h1>

          <p className="col-span-12 mt-2 font-serif text-lg italic leading-snug text-[color:var(--ink-2)] md:col-span-9 md:text-xl">
            Artificial intelligence is the first general purpose technology
            whose frontier sits outside the state, and the first whose frontier
            is also a security asset. How will this inversion transform the
            tensions between sovereign authority and privately owned firms
            regarding national security?
          </p>

          <nav className="col-span-12 mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[color:var(--rule)] py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
            <span className="text-[color:var(--ink)]">Jump to</span>
            {NAV_LINKS.map((l, i) => (
              <span key={l.href} className="flex items-center gap-x-6">
                <span aria-hidden>·</span>
                <a
                  href={l.href}
                  className="transition-colors hover:text-[color:var(--accent)]"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </nav>

          <div className="col-span-12 mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 has-dropcap md:col-span-9">
              <p className="prose-body">
                The technologies that reshaped economies and won wars have
                historically moved in one direction: funded
                by the state, made strategically usable by the military, then
                released downstream into civilian life. Artificial intelligence
                has reversed this pattern. The Pentagon now buys frontier
                models from companies it neither founded nor controls. China
                has institutionalised the same dependency under a different
                name.
              </p>
              <p className="prose-body mt-5">
                For the first time, a strategically decisive general purpose
                technology has a privately held frontier, and national and
                global security depend on it. This column explores the
                national security tensions between the state and the private
                firms at the frontier, through the historical precedents that
                shaped it, the national cases that define it today, and the
                scenarios that may decide it tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
