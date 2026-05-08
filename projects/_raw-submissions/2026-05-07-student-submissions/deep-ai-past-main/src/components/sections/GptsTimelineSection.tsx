import { useState } from "react";
import { Section } from "./Section";

const ENTRIES = [
  { name: "Domestication of plants", year: "c. 9000 BCE", numericYear: -9000, marker: "c. 9000 BC" },
  { name: "Water wheel", year: "1st c. BCE", numericYear: -50, marker: "1st c. BCE" },
  { name: "Printing press", year: "c. 1440", numericYear: 1440, marker: "1440s" },
  { name: "Steam engine", year: "c. 1760", numericYear: 1760, marker: "1769" },
  { name: "Electricity", year: "c. 1870", numericYear: 1870, marker: "c. 1880" },
  { name: "Internal combustion engine", year: "c. 1885", numericYear: 1885, marker: "1885" },
  { name: "The internet", year: "c. 1969", numericYear: 1969, marker: "1969" },
  { name: "Artificial intelligence", year: "c. 2020s", numericYear: 2025, marker: "TODAY" },
];

export function GptsTimelineSection() {
  return (
    <Section
      label="§ 02 / The 24 GPTs in History"
      heading="24 technologies, eleven thousand years."
      standfirst={
        <>
          General Purpose Technologies (GPTs) are the kinds of technological
          advancements that occasionally transform society's economic, social,
          and political structure.
        </>
      }
      fullBleed
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <p className="prose-body">
            They are characterized by their pervasiveness across sectors, their
            continuous scope for technical improvement, and their innovative
            complementarities that raise R&amp;D productivity in downstream
            industries.
          </p>
          <hr className="my-8 border-t border-[color:var(--rule)]/40" />
          <p className="prose-body">
            GPTs must reorganize the economy around themselves, not just adding
            to it. This makes them rare by essence and it's the reason why many
            economists treat them as the principal engines behind long-term
            growth.
          </p>
        </div>
        <aside className="col-span-12 font-sans text-xs leading-[1.4] text-[color:var(--ink-mute)] md:col-span-4 md:col-start-9 md:border-l md:border-l-[color:var(--rule)]/20 md:pl-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink)]">
            Source
          </div>
          Lipsey, R., Carlaw, K., &amp; Bekar, C. (2005). <em>Economic
          Transformations: General Purpose Technologies and Long-Term Economic
          Growth.</em> Oxford University Press.
        </aside>
      </div>

      {/* Timeline strip */}
      <div className="mt-16">
        <p className="prose-body mb-8 max-w-3xl font-serif italic text-[color:var(--ink-2)]">
          Lipsey, Carlaw and Bekar count twenty-four general purpose
          technologies across the historical record. The eight shown here are
          those most relevant to the state–private security argument developed
          in this project.
        </p>

        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
          <span>Timeline · 9000 BCE — 2020s</span>
          <span className="hidden md:inline">scroll →</span>
        </div>

        <div className="-mx-6 overflow-x-auto md:-mx-0">
          <div className="relative min-w-[980px] px-6 pb-2 md:px-0">
            {/* Axis */}
            <div className="relative h-px bg-[color:var(--rule)]" />

            {/* Ticks + labels */}
            <div className="grid grid-cols-8">
              {ENTRIES.map((e, i) => {
                const isAI = i === ENTRIES.length - 1;
                return (
                  <div
                    key={e.name}
                    className="relative flex flex-col items-start pt-0"
                  >
                    {/* Tick */}
                    <div
                      className="absolute left-0 top-[-1px] h-3 w-px"
                      style={{
                        backgroundColor: isAI
                          ? "var(--accent)"
                          : "var(--rule)",
                        height: isAI ? "16px" : "10px",
                      }}
                    />
                    {/* Year above axis - move via negative margin */}
                    <div
                      className="absolute left-0 top-[-26px] font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{
                        color: isAI ? "var(--accent)" : "var(--ink-mute)",
                      }}
                    >
                      {e.year}
                    </div>
                    {/* Label below */}
                    <div className="mt-5 max-w-[120px] pr-4">
                      <div
                        className="text-sm font-medium leading-tight"
                        style={{
                          color: isAI ? "var(--accent)" : "var(--ink)",
                        }}
                      >
                        {e.name}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--ink-mute)]">
                        {e.marker}
                        {isAI && (
                          <span className="ml-2 text-[color:var(--accent)]">
                            ◼ here
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <GptExplainer />
    </Section>
  );
}

const PANELS = [
  {
    kicker: "Panel 01 / Spin-off & Spin-on",
    headline: "Most twentieth-century GPTs were spin-offs from state procurement.",
    body: (
      <>
        <p>
          When describing the origin and effects of technologies, particularly
          those developed following the rise of nation-states, and by extension
          the divide of public–private, the terms <em>spin-on</em> and{" "}
          <em>spin-off</em> appeared in the defense-innovation literature.
        </p>
        <p className="mt-4">
          A <strong>spin-off</strong>, in this sense, is a technology developed
          under military or public-mission R&amp;D that later migrates to
          civilian use (i.e.: semiconductors, GPS, jet engines, the internet).
        </p>
        <p className="mt-4">
          A <strong>spin-on</strong>, on the other hand, is a commercially
          developed technology absorbed into defense. Most twentieth century
          GPTs are predominantly spin-offs. Ruttan identifies six whose
          development was decisively shaped by US military procurement:
          interchangeable parts, aircraft, nuclear energy, computers, the
          internet and space.
        </p>
      </>
    ),
    sources: "Molas-Gallart (1997); Ruttan (2006).",
  },
  {
    kicker: "Panel 02 / AI as a GPT",
    headline: "AI is a GPT — and an invention of a method of invention.",
    body: (
      <p>
        Artificial Intelligence (AI), specifically machine learning, and now
        foundation models, is widely regarded today as a GPT. It satisfies the
        three criteria and adds a feature none of its predecessors had: it is
        an <em>invention of a method of invention</em> (IMI), raising
        productivity in the production of ideas themselves. The underlying
        mechanism can be framed as a fall in the cost of prediction, which
        pervades by that route rather than through a new power source or
        communications medium.
      </p>
    ),
    sources: "Cockburn, Henderson & Stern (2018); Agrawal, Gans & Goldfarb (2018).",
  },
];

function GptExplainer() {
  const [i, setI] = useState(0);
  const panel = PANELS[i];
  return (
    <div className="mt-24 border-t border-[color:var(--rule)] pt-12">
      <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
        <span>What is a GPT? · {i + 1} / {PANELS.length}</span>
        <div className="flex items-center gap-2">
          {PANELS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to panel ${idx + 1}`}
              className="h-1.5 w-6 transition-colors"
              style={{
                backgroundColor:
                  idx === i ? "var(--accent)" : "var(--rule)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {panel.kicker}
          </div>
          <h3 className="font-display text-2xl font-semibold leading-[1.15] tracking-[-0.01em] text-[color:var(--ink)] md:text-3xl">
            {panel.headline}
          </h3>
          <div className="prose-body mt-6 text-[1.0625rem] leading-[1.6]">
            {panel.body}
          </div>
        </div>
        <aside className="col-span-12 font-sans text-xs leading-[1.4] text-[color:var(--ink-mute)] md:col-span-3 md:col-start-10 md:border-l md:border-l-[color:var(--rule)]/20 md:pl-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink)]">
            Sources
          </div>
          {panel.sources}
        </aside>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-[color:var(--rule)]/40 pt-5">
        <button
          onClick={() => setI((p) => Math.max(0, p - 1))}
          disabled={i === 0}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink)] transition-opacity disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          onClick={() => setI((p) => Math.min(PANELS.length - 1, p + 1))}
          disabled={i === PANELS.length - 1}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)] transition-opacity disabled:opacity-30"
        >
          {i === PANELS.length - 1 ? "End" : "Next →"}
        </button>
      </div>
    </div>
  );
}
