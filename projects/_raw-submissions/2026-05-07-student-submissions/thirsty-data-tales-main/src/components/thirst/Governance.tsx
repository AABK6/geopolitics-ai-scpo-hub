import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const timeline = [
  { year: "2019", label: "Singapore imposes a moratorium on new data center construction, citing land scarcity, energy constraints, and sustainability concerns. First jurisdiction in Asia to act preemptively.", tone: "active" },
  { year: "2021", label: "Uptime Institute: only 51% of operators track water in any form. Of those, only 10% track it across their entire portfolio. Most cite \u201cno business justification.\u201d", tone: "muted" },
  { year: "Feb 2022", label: "Netherlands: 9-month preparatory moratorium on hyperscale data centers announced, first step toward a permanent national restriction.", tone: "active" },
  { year: "Q2 2022", label: "Singapore lifts moratorium conditionally. New data centers must meet best-in-class energy efficiency and sustainability requirements. 60 MW of capacity made available under a selective pilot.", tone: "muted" },
  { year: "Oct 2023", label: "EU EED 2023/1791 enters into force. Annual reporting mandatory for DCs ≥ 500 kW, including WUE (water), PUE, energy, heat reuse, and renewables. First deadline: 15 September 2024.", tone: "muted" },
  { year: "Jan 2024", label: "Netherlands: permanent nationwide ban on hyperscale DC takes effect. Two exceptions only: Eemshaven and Agriport A7/B1. First country in the world to make such a restriction permanent.", tone: "active" },
  { year: "May 2024", label: "Singapore's Green Data Centre Roadmap: 300 MW of additional capacity announced, subject to explicit WUE reduction targets, the first national water efficiency standard for data centers in Asia.", tone: "active" },
  { year: "Aug 2024", label: "EU AI Act enters into force. Documents compute for high-risk AI systems. Omits water. Inference workloads, dominant over a model's lifetime, fall outside the reporting scope.", tone: "muted" },
  { year: "Oct 2024", label: "Google signs first corporate SMR agreement (Kairos Power, 500 MW by 2035). Amazon signs Energy Northwest deal. Nuclear-data center convergence becomes commercially concrete, carbon problem targeted, water problem unresolved.", tone: "muted" },
  { year: "Nov 2024", label: "Johor, Malaysia: ~30% of data center applications rejected to protect local resources. Rare case of proactive sub-national regulation in the Global South.", tone: "active" },
  { year: "2025", label: "Trump administration accelerates federal permitting, scales back NEPA oversight, rolls back clean-energy mandates.", tone: "warn" },
  { year: "2028", label: "Projection: U.S. on-site DC water consumption, 150 to 280 billion liters/year across all facility types; 60 to 124 billion liters for hyperscale alone.", tone: "warn" },
  { year: "2030", label: "First commercial SMR-powered data centers expected online. Water implications unresolved: SMRs with conventional cooling can reach >3,000 L/MWh, demand displaced, not eliminated.", tone: "warn" },
  { year: "2050", label: "MSCI (~14,000 assets): 1 in 4 data centers facing more frequent water scarcity days. S&P Global (9,055 assets): 45% in high water-stress exposure, up from 43% today. Both trajectories point in the same direction.", tone: "warn" },
];

const regions = [
  {
    region: "European Union",
    status: "Partial · significant gaps remain",
    note: "EED 2023/1791 mandates annual reporting for DCs ≥ 500 kW including WUE. Data is aggregated nationally, however no facility-level accountability where hydrological impacts actually occur. Inference workloads, which dominate lifetime consumption, fall outside the reporting scope. The AI Act, in force since August 2024, requires documenting computational resources for high-risk systems but does not address water consumption.",
    color: "hsl(var(--water))",
  },
  {
    region: "United States",
    status: "Federal absence · uneven state responses",
    note: "No federal binding framework exists. The Trump 2025 administration has accelerated permitting and scaled back environmental oversight including NEPA exemptions and clean-energy rollbacks. In the absence of federal direction, 190+ data center bills have been introduced across state legislatures in 2025, with uneven results.",
    color: "hsl(var(--drought))",
  },
  {
    region: "Global South",
    status: "Limited or absent frameworks",
    note: "In much of the Global South, regulatory frameworks on data center water use remain limited or absent with some exceptions. Mexico: CONAGUA has recommended against new water permits in Querétaro; Microsoft and Amazon have continued to expand in the region. Chile offers a partial counter-example: a tribunal required Google to restart its Cerrillos permit process, though the outcome remains to be fully assessed.",
    color: "hsl(var(--destructive))",
  },
];

const usStates = [
  { st: "Arizona", note: "No enacted statewide framework. Regulatory pressure has emerged at the municipal level: Chandler caps DC water use at 115 gallons/day per 1,000 sq ft (since 2015); Marana banned potable water supply to DC cooling (Dec. 2024). State-level proposals remain in committee." },
  { st: "Virginia", note: "A water disclosure bill was considered in 2025 but did not clear the Senate before the crossover deadline; it is expected to be reconsidered in 2027. Loudoun County data centers consumed approximately 900M gallons in 2023, a 63% increase from 2019." },
  { st: "Texas", note: "SB 6, signed in June 2025, gives grid operators emergency curtailment authority over loads exceeding 75 MW and requires developers to contribute to grid infrastructure costs." },
  { st: "California", note: "A water disclosure bill passed both chambers but was vetoed by Governor Newsom. Diesel backup generator phase-out is ongoing. Further water legislation remains under consideration." },
];

export default function Governance() {
  return (
    <SectionShell
      id="regulation"
      chapter="Chapter 06"
      kicker="Regulatory Patchwork"
      title={
        <>
          A patchwork where <em className="italic text-gradient">arbitrage</em> thrives.
        </>
      }
      lede={
        <>
          Regulatory frameworks for data center water use differ sharply across jurisdictions, and those differences
          matter. Where disclosure is mandatory, some accountability follows. Where it is absent, the question of who
          bears the cost of water consumption remains largely unanswered. Whether this divergence actively drives
          siting decisions is difficult to establish without better data. What is clear is that it creates the
          conditions for it.
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {regions.map((r, i) => (
          <motion.div
            key={r.region}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-card/50 border border-border backdrop-blur-sm relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${r.color}, transparent)` }}
            />
            <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: r.color }}>
              {r.status}
            </div>
            <h3 className="font-display text-2xl font-light mb-3">{r.region}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.note}</p>
          </motion.div>
        ))}
      </div>

      {/* US state-level deep dive */}
      <div className="rounded-2xl bg-card/40 border border-border p-7 md:p-9 backdrop-blur-sm mb-12">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">U.S. state-level responses · 2025</div>
        <h3 className="font-display text-2xl md:text-3xl font-light mb-2">When the federation goes silent, the states improvise.</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
          In the absence of federal leadership, state-level responses have become the primary locus of regulatory
          activity.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {usStates.map((s) => (
            <div key={s.st} className="p-4 rounded-xl bg-background/40 border border-border">
              <div className="font-display text-lg text-foreground mb-1">{s.st}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 md:pl-12">
        <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-destructive" />
        {timeline.map((t, i) => (
          <motion.div
            key={`${t.year}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative pb-8 last:pb-0"
          >
            <span
              className={`absolute -left-[27px] md:-left-[35px] top-2 h-3 w-3 rounded-full ring-4 ring-background ${
                t.tone === "warn" ? "bg-destructive" : t.tone === "active" ? "bg-primary" : "bg-muted-foreground"
              }`}
            />
            <div className="font-mono text-sm text-primary">{t.year}</div>
            <div className={`font-display text-base md:text-lg font-light mt-1 leading-snug ${t.tone === "warn" ? "text-destructive/90" : "text-foreground"}`}>
              {t.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing insight */}
      <div className="mt-10 p-7 rounded-2xl bg-gradient-to-r from-primary/10 via-card/40 to-accent/10 border border-border backdrop-blur-sm">
        <p className="font-display italic text-xl md:text-2xl text-foreground/90 leading-snug">
          &ldquo;Public pressure, not federal leadership, is increasingly the driver of accountability.&rdquo;
        </p>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4">
          Yale Clean Energy Forum, November 2025
        </div>
      </div>
    </SectionShell>
  );
}
