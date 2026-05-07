import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import SectionShell from "./SectionShell";

const data = [
  { name: "Direct cooling (today)", value: 150, fill: "hsl(var(--water))" },
  { name: "Lifecycle (low est.)", value: 600, fill: "hsl(var(--water-glow))" },
  { name: "Lifecycle (high est.)", value: 1500, fill: "hsl(var(--drought))" },
  { name: "Global AI 2027 (low)", value: 4200, fill: "hsl(var(--drought-deep))" },
  { name: "Global AI 2027 (high)", value: 6600, fill: "hsl(var(--destructive))" },
];

const stats = [
  { num: "560B", unit: "liters / year", label: "Water consumed by data centers globally in 2023, equivalent to 224,000 Olympic pools." },
  { num: "700K → 5.4M", unit: "liters per training", label: "Freshwater consumed to train GPT-3 in Microsoft's U.S. data centers: 700,000 liters evaporated on-site (Scope 1, direct cooling), rising to 5.4 million liters when electricity generation is included (Scope 1+2)." },
  { num: "4.2–6.6B", unit: "m³ by 2027", label: "Projected global AI water withdrawal, more than the annual total of 4–6 Denmarks, or half the United Kingdom." },
  { num: "1–3B", unit: "liters / campus", label: "A single hyperscale campus can draw this much per year. One-third of the city of The Dalles, Oregon goes to Google alone." },
];

const operators = [
  { co: "Google", val: 23.1, note: "95% used by data centers" },
  { co: "Microsoft", val: 7.8, note: "+34% (FY21→FY22), +22% (FY22→FY23)" },
  { co: "Meta", val: 3.1, note: "95% used by data centers" },
];

export default function ScaleSection() {
  return (
    <SectionShell
      id="scale"
      chapter="Chapter 01"
      kicker="Anatomy of the Footprint"
      title={
        <>
          A thirst measured in <em className="italic text-gradient">trillions</em>.
        </>
      }
      lede={
        <>
          <p>
            On paper, AI&rsquo;s direct water use is negligible: less than{" "}
            <span className="text-foreground">0.004%</span> of worldwide freshwater withdrawals, roughly equivalent to
            2% of the water consumed by the world&rsquo;s golf courses. The problem is that this number is also{" "}
            <span className="text-foreground">largely unverified</span>. Most data centers do not disclose their water
            consumption at the facility level. No international body collects it. And the methodologies used to
            estimate it vary enough to make meaningful comparison difficult.
          </p>
          <p className="mt-5">
            This matters because water scarcity is not a global phenomenon. It is a{" "}
            <span className="text-foreground">local crisis</span>, concentrated in specific watersheds where data
            centers and communities compete for the same resource, and where the absence of reliable data makes it
            harder to know who is bearing the cost, and how much.
          </p>
          <p className="mt-5">
            This website does not attempt to resolve that uncertainty. It asks instead what the absence of reliable
            data makes harder: for regulators trying to set policy, for communities living next to infrastructure
            they cannot audit, and for companies attempting to manage resources they are not required to measure.
          </p>
        </>
      }
    >
      {/* withdrawal vs consumption explainer */}
      <div className="grid md:grid-cols-2 gap-5 mb-12">
        <div className="p-7 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">Withdrawal</div>
          <h3 className="font-display text-2xl font-light mb-3">What companies report</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Total water drawn from a source. Some returns to the watershed downstream, eventually, somewhere, in
            different quality. This is the figure most sustainability reports headline.
          </p>
        </div>
        <div className="p-7 rounded-2xl bg-gradient-to-br from-accent/10 to-card/50 border border-accent/30 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">Consumption</div>
          <h3 className="font-display text-2xl font-light mb-3">What is actually lost</h3>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Water that <em>evaporates</em> through cooling towers and never returns. A net loss to the basin.
            Conflating the two is not a footnote, it produces a structural underestimation of impact.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-7 rounded-2xl bg-card/60 border border-border backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative">
              <div className="font-display text-5xl md:text-6xl font-light text-gradient leading-none">{s.num}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary/80 mt-3">{s.unit}</div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hyperscaler disclosed */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mb-12">
        <div className="rounded-2xl bg-card/40 border border-border p-6 md:p-8 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Disclosed self-owned DC consumption · 2023</div>
          <h3 className="font-display text-xl md:text-2xl font-light mb-6">In billions of liters per year, Scope 1 (direct cooling) only, self-owned facilities</h3>
          <div className="space-y-5">
            {operators.map((o) => (
              <div key={o.co}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-display text-lg">{o.co}</span>
                  <span className="font-mono text-sm text-primary">{o.val}B L</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(o.val / 25) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-water"
                  />
                </div>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">{o.note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 italic">
            These figures exclude leased colocation facilities and indirect water use from electricity generation, which are estimated at 12× the direct cooling figure for U.S. data centers alone. What is disclosed is already growing at above 20% year-on-year. What remains undisclosed is larger still.
          </p>
        </div>

        <div className="rounded-2xl bg-card/40 border border-border p-6 md:p-8 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Three scopes of AI water use</div>
          <h3 className="font-display text-xl md:text-2xl font-light mb-6">Where the water actually goes</h3>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <span className="font-display text-3xl text-primary leading-none w-12 shrink-0">01</span>
              <div>
                <div className="font-display text-base">On-site cooling</div>
                <p className="text-sm text-muted-foreground leading-relaxed">Server-level + facility-level cooling. Almost all server energy becomes heat that must be rejected.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-3xl text-primary leading-none w-12 shrink-0">02</span>
              <div>
                <div className="font-display text-base">Off-site electricity</div>
                <p className="text-sm text-muted-foreground leading-relaxed">Thermoelectric generation withdraws and consumes water. In many countries it tops national withdrawal rankings.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-3xl text-accent leading-none w-12 shrink-0">03</span>
              <div>
                <div className="font-display text-base">Embodied (supply chain)</div>
                <p className="text-sm text-muted-foreground leading-relaxed">Server &amp; chip manufacturing. Wafer fabs are some of the most water-intensive facilities on earth.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-card/40 border border-border p-6 md:p-10 backdrop-blur-sm">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">Figure 1.1</div>
            <h3 className="font-display text-2xl md:text-3xl font-light">From today to 2027 · billions of liters / year</h3>
          </div>
          <div className="font-mono text-xs text-muted-foreground max-w-xs text-right">Sources: Li et al. 2023; LBNL 2024 (Shehabi et al.); Uptime Institute 2021</div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="2 6" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-15} textAnchor="end" height={70} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(v: number) => [`${v.toLocaleString()}B liters`, "Annual"]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          U.S. data center on-site water consumption alone could reach 150–280 billion liters by 2028, double or quadruple 2023.
        </p>
      </div>

      {/* GPT-3 case study */}
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 border border-primary/30 p-8 md:p-10 backdrop-blur-sm">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">Case · GPT-3</div>
            <h3 className="font-display text-3xl md:text-4xl font-light leading-tight mb-3">
              500 mL <em className="italic text-gradient">per conversation</em>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Li, Yang, Islam &amp; Ren (2023) estimate that a medium GPT-3 exchange, a few hundred words in, a few
              hundred out, consumes roughly the contents of a small water bottle, scope-1 + scope-2 combined.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-5 rounded-xl bg-background/50 border border-border">
              <div className="font-display text-3xl text-gradient">700K L</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Per training run</div>
            </div>
            <div className="text-center p-5 rounded-xl bg-background/50 border border-border">
              <div className="font-display text-3xl text-gradient">~500 mL</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Per ~25 prompts</div>
            </div>
            <div className="text-center p-5 rounded-xl bg-background/50 border border-border">
              <div className="font-display text-3xl text-gradient">×10K</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Variability across DCs</div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
