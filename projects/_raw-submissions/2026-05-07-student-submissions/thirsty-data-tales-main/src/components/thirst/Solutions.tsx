import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const pillars = [
  {
    tag: "Governance",
    title: "Standardize the metric.",
    points: [
      "Facility-level (not national) disclosure under IEA or UNEP authority.",
      "Mandatory water impact assessments for large AI workloads.",
      "Independent audits with legal authority, including in the Global South.",
      "Dynamic, site-specific water budgets indexed to local hydrology.",
      "Extend EU AI Act scope to include water, and to inference, not just training.",
    ],
  },
  {
    tag: "Pricing",
    title: "Price water for its scarcity.",
    points: [
      "End the underpricing that makes evaporative cooling economically rational.",
      "Tiered tariffs reflecting real-time hydrological stress.",
      "Tax incentives for heat-recovery, reuse, and reclaimed-water systems.",
      "Surcharges in declared water-stress zones (Arizona model, generalized).",
      "Revoke water concessions granted on outdated hydrological assessments.",
    ],
  },
  {
    tag: "Sobriety",
    title: "Digital water sobriety.",
    points: [
      "Evaluate AI applications by social value per liter consumed.",
      "Restrict new infrastructure in water-stressed basins (Netherlands model).",
      "Default to facility-level public transparency.",
      "Temporal load-shifting toward periods of water abundance.",
      "Geographic load balancing across basins, not just grids.",
    ],
  },
];

const principles = [
  { n: "01", title: "Transparency by default", body: "Disclosure is the price of operating, not a corporate favor." },
  { n: "02", title: "Locality is the unit", body: "Aggregated national data is worse than no data, it produces false reassurance." },
  { n: "03", title: "Pricing must signal scarcity", body: "Markets respond to price. Hydrology does not respond to wishes." },
  { n: "04", title: "No basin without a budget", body: "Every facility must operate within an enforceable, dynamic water envelope." },
];

export default function Solutions() {
  return (
    <SectionShell
      id="solutions"
      chapter="Chapter 08"
      kicker="Pathways Forward"
      title={
        <>
          Two tracks. <em className="italic text-gradient">One deadline.</em>
        </>
      }
      lede={
        <>
          Technology alone cannot solve what it created. The trilemma guarantees that no single intervention closes the
          gap. The answer is governance reform in the near term, technological transformation in the long, and a
          framework, call it digital water sobriety, that questions which AI workloads deserve their footprint at all.
        </>
      }
      className="bg-gradient-to-b from-background via-card/30 to-background"
    >
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {pillars.map((p, i) => (
          <motion.article
            key={p.tag}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative p-8 rounded-2xl bg-card/60 border border-border backdrop-blur-sm group hover:border-primary/40 transition-colors"
          >
            <div className="absolute top-8 right-8 font-display text-7xl font-light text-primary/10 group-hover:text-primary/20 transition-colors leading-none">
              0{i + 1}
            </div>
            <div className="relative">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">{p.tag}</div>
              <h3 className="font-display text-3xl font-light leading-tight mb-6">{p.title}</h3>
              <ul className="space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-[0.55rem] h-px w-3 bg-primary/60 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Four principles */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 border border-primary/20 p-8 md:p-10 backdrop-blur-sm">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">Four operating principles</div>
        <h3 className="font-display text-3xl md:text-4xl font-light mb-8 max-w-2xl">
          A minimum doctrine for governing the next decade of compute.
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((p) => (
            <div key={p.n} className="p-5 rounded-xl bg-background/50 border border-border">
              <div className="font-mono text-xs text-primary mb-2">{p.n}</div>
              <div className="font-display text-lg mb-2">{p.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
