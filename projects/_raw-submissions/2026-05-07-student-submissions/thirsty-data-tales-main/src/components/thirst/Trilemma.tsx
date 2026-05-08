import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const nodes = [
  { label: "Water", color: "hsl(var(--water))", pos: "top-0 left-1/2 -translate-x-1/2" },
  { label: "Energy", color: "hsl(var(--drought))", pos: "bottom-6 left-6" },
  { label: "Geography", color: "hsl(var(--water-glow))", pos: "bottom-6 right-6" },
];

const tradeoffs = [
  {
    from: "Less water",
    to: "More energy",
    body: "Dry or waterless cooling eliminates on-site evaporation but adds 10–25% to electricity consumption, which itself carries a scope-2 water footprint from the grid. In many configurations, the dominant component of total water use. Solving the visible problem shifts it upstream and out of the accounting.",
  },
  {
    from: "Less energy",
    to: "More water",
    body: "Evaporative cooling delivers the lowest PUE and the highest energy efficiency. It also remains the dominant technology in most hyperscale facilities globally, and quietly evaporates the most water per kWh. Because electricity is 40–60% of operating costs and water is treated as a rounding error, the economics reliably produce this outcome.",
  },
  {
    from: "Best climate",
    to: "Worst grid",
    body: "Cool, humid northern regions favor free-air cooling, Meta's Luleå campus in Sweden achieves a WUE below 0.3 on this basis. But these regions rely partly on hydropower, which itself consumes between 0.3 and more than 400 L/kWh through reservoir evaporation, depending on the site. The water footprint moves off-site. It does not disappear.",
  },
  {
    from: "Sun-rich",
    to: "Water-poor",
    body: "Regions ideal for low-carbon solar (Arizona, Texas, Spain, the Gulf) are precisely the arid zones where freshwater is most contested. Decarbonizing the grid and minimizing water stress pull in opposite geographic directions. No siting decision currently satisfies both simultaneously.",
  },
];

const determinants = [
  { rank: 1, name: "Server energy efficiency", note: "Counterintuitive: more important than cooling technology." },
  { rank: 2, name: "Water intensity of the local electricity grid", note: "Scope-2 dominates in most siting decisions." },
  { rank: 3, name: "Server utilization rate", note: "Idle capacity is wasted energy and wasted water." },
  { rank: 4, name: "Cooling system type", note: "Only the 4th-most decisive factor." },
  { rank: 5, name: "Infrastructure efficiency (PUE)" },
  { rank: 6, name: "Climate zone" },
  { rank: 7, name: "Idle server percentage" },
  { rank: 8, name: "Server refresh cycle" },
];

export default function Trilemma() {
  return (
    <SectionShell
      id="technology"
      chapter="Chapter 04"
      kicker="The Technological Trilemma"
      title={
        <>
          Three corners. <em className="italic text-gradient">Pick two.</em>
        </>
      }
      lede={
        <>
          The water question in AI infrastructure is not, at its core, a question about technology. It is a question
          about trade-offs that no single technology resolves. Academic research has now mapped these trade-offs with
          enough precision to make one thing clear: the intuitive interventions, switch to dry cooling, site in a cold
          climate, run on renewables, each solve one dimension of the problem while worsening another. There is no
          free corner.
        </>
      }
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="l1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--water))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--drought))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <motion.polygon
              points="150,40 40,250 260,250"
              fill="url(#l1)"
              fillOpacity="0.08"
              stroke="url(#l1)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            {[
              { x: 150, y: 40 },
              { x: 40, y: 250 },
              { x: 260, y: 250 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="8"
                fill={nodes[i].color}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              />
            ))}
          </svg>
          {nodes.map((n) => (
            <div key={n.label} className={`absolute ${n.pos} font-display text-xl md:text-2xl`}>
              <span style={{ color: n.color }}>{n.label}</span>
            </div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">No free</div>
              <div className="font-display italic text-2xl text-gradient">corner</div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          {tradeoffs.map((t, i) => (
            <motion.div
              key={t.from}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-5 rounded-xl bg-card/50 border border-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-2 font-mono text-xs uppercase tracking-widest">
                <span className="text-primary">{t.from}</span>
                <svg width="24" height="10" viewBox="0 0 24 10" className="text-muted-foreground">
                  <path d="M0 5 L20 5 M15 1 L20 5 L15 9" stroke="currentColor" fill="none" strokeWidth="1" />
                </svg>
                <span className="text-accent">{t.to}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Eight determinants */}
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 mb-12">
        <div className="rounded-2xl bg-card/40 border border-border p-7 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">The 8 determinants of water use</div>
          <h3 className="font-display text-2xl font-light mb-6">Ranked by importance</h3>
          <ol className="space-y-3">
            {determinants.map((d) => (
              <li key={d.rank} className="flex gap-4 items-baseline">
                <span className="font-mono text-xs text-primary w-6 shrink-0">0{d.rank}</span>
                <div className="flex-1 border-b border-border/50 pb-2">
                  <div className="font-display text-base text-foreground">{d.name}</div>
                  {d.note && <div className="text-xs text-muted-foreground italic mt-0.5">{d.note}</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-4">
          <div className="p-7 rounded-2xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/30">
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Without mitigation</div>
            <div className="font-display text-5xl font-light text-gradient leading-none">×7</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Global data center water consumption could increase more than seven times by mid-century driven by compute
              growth outpacing efficiency gains.
            </p>
          </div>
          <div className="p-7 rounded-2xl bg-gradient-to-br from-accent/15 to-transparent border border-accent/30">
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">With combined best practices</div>
            <div className="font-display text-5xl font-light text-gradient leading-none">−86% / −73%</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Water and carbon reductions technically achievable by 2030 through smart siting, faster grid
              decarbonization, and operational efficiency, but measured against worst-case scenarios, not current
              levels, and constrained by existing energy infrastructure. The roadmap exists. The political and market
              conditions to execute it do not yet.
            </p>
          </div>
        </div>
      </div>

      {/* Variability + policy implication */}
      <div className="rounded-2xl bg-card/40 border border-border p-7 md:p-9 backdrop-blur-sm space-y-5 mb-10">
        <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
          What makes the trilemma analytically important is not just that trade-offs exist but that the variability in
          outcomes is extreme. Workload-level water consumption across data center configurations can vary by a factor
          of <span className="text-primary">×10,000</span>. This variability is driven primarily by more than 1,000-fold
          differences in the water intensity of local electricity grids, and approximately 10-fold differences in
          server workload efficiency, not by cooling system choice, which ranks only fourth among determinants.
          Hyperscale facilities are roughly 6× more water-efficient than enterprise internal data centers, a gap that
          reflects the advantages of scale, not of virtue.
        </p>
        <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
          The policy implication is uncomfortable: there is no universal benchmark, no single technology mandate, and
          no siting rule that generalizes across climates and grids. Optimal outcomes require tailored combinations of
          all eight determinants. Regulation that targets only the visible layer (on-site cooling) will systematically
          miss the larger problem.
        </p>
      </div>
    </SectionShell>
  );
}
