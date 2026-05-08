import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

function Ring({ pct, label, sub }: { pct: number; label: string; sub: string }) {
  const r = 80;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={r} stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
          <motion.circle
            cx="100"
            cy="100"
            r={r}
            stroke="url(#grad)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * pct) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--water))" />
              <stop offset="100%" stopColor="hsl(var(--drought))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl md:text-6xl font-light text-gradient">{pct}%</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{sub}</span>
        </div>
      </div>
      <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">{label}</p>
    </div>
  );
}

const causes = [
  {
    tag: "No central body",
    body: "No NGO, government, or international institution currently holds a mandate to collect or standardize data center water data globally. Reporting frameworks exist at the regional level, most notably under the EU's Energy Efficiency Directive, but they are geographically limited and their outputs aggregated.",
  },
  {
    tag: "No incentive to share",
    body: "Many operators appear to treat consumption figures as commercially sensitive. Disclosure can reveal operational inefficiencies, invite reputational risk in water-stressed regions, or create precedent for regulatory scrutiny. This is not a legal violation, in most jurisdictions, it is simply the rational response to an absence of mandatory disclosure requirements.",
  },
  {
    tag: "Weak legal authority",
    body: "NGOs generally cannot demand water audits from private operators. Confidentiality clauses are invoked routinely in several jurisdictions, including Brazil, where 13 of 22 data centers audited in an investigation declined to share their energy and water consumption data, legally, under Brazilian law.",
  },
  {
    tag: "Aggregation hides locality",
    body: "Where reporting does exist (notably under the EU Energy Efficiency Directive) data is published at the national level, not the facility level. The hydrological impact of a data center, however, occurs within a specific watershed, not a country. National aggregates can obscure acute local stress.",
  },
  {
    tag: "Standards without teeth",
    body: "ISO/IEC 30134-9 (2022) defines a Water Usage Effectiveness standard for data centers. But adoption is entirely voluntary, no targets or limits are specified, and significant methodological variation between operators makes facility-level comparisons unreliable in practice. A revision of the standard is currently underway. The framework exists; the enforcement architecture does not.",
  },
];

export default function DataVacuum() {
  return (
    <SectionShell
      id="data"
      chapter="Chapter 02"
      kicker="The Data Vacuum"
      title={
        <>
          What you cannot <em className="italic text-gradient">measure</em>, you cannot govern.
        </>
      }
      lede={
        <>
          Reframing the problem reveals what may be structurally broken: not the water use itself, but the difficulty
          of knowing how much is consumed, where, and to what consequence. The data gaps documented in this section are
          not incidental features of a young industry, they appear to reflect a governance architecture that has not
          yet caught up with the scale of the problem.
        </>
      }
      className="bg-gradient-to-b from-background via-card/20 to-background"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex justify-around gap-6">
          <Ring pct={51} label="of data center owners and operators track water use in any form (Uptime Institute, 2021)." sub="Track any" />
          <Ring pct={10} label="track it across their entire fleet. Most cite the absence of a business case, water is too cheap, regulators too quiet." sub="Track fully" />
        </div>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            A 2021 global survey of data center operators found just over half measure water in any form. Only one in
            ten do so comprehensively. The rest report no business justification for doing so, a rational response, in
            the short term, to a resource that is systematically underpriced and rarely regulated at the facility level.
          </p>
          <p className="text-foreground">
            The downstream consequence is policy shaped by incomplete information. Governments face difficulty
            regulating what is not reported. Communities near data center campuses have limited means to assess local
            water risk. Researchers have often had to reconstruct consumption estimates from public utility billing
            records and freedom-of-information requests, a process that can take months of legal effort, as the case
            of The Dalles, Oregon illustrates.
          </p>
          <div className="border-l-2 border-primary pl-6 py-2 font-display text-xl md:text-2xl italic text-foreground/90">
            &ldquo;The absence of information becomes a governance problem in itself.&rdquo;
          </div>
        </div>
      </div>

      {/* causes grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {causes.map((c, i) => (
          <motion.div
            key={c.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">{c.tag}</div>
            <p className="text-foreground/90 leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Concentration sidebar */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-accent/10 via-card/40 to-primary/10 border border-border backdrop-blur-sm flex flex-col md:flex-row items-center gap-8">
        <div className="font-display text-7xl md:text-8xl font-light text-gradient leading-none shrink-0">65%</div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Concentration · England</div>
          <p className="text-foreground/90 leading-relaxed">
            of the data center sector&rsquo;s total water consumption in England is attributable to just{" "}
            <span className="text-primary">six</span> facilities, according to anonymised MOSL billing data. At the same
            time, 67% of facilities consume less than 1,000 m³ per year (figures comparable to those of a medium-sized
            office building). Effective oversight in this sector may not require tracking thousands of operators. It
            may require compelling disclosure from a very small number of highly concentrated actors and the legal
            infrastructure to do so.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
