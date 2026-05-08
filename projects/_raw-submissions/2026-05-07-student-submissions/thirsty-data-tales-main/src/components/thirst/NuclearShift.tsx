import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const deals = [
  { co: "Microsoft", deal: "Three Mile Island Unit 1 restart", power: "837 MW", partner: "Constellation · 2028", tag: "20-yr PPA" },
  { co: "Amazon", deal: "4 advanced SMRs (Energy Northwest)", power: "~320 MW (phase 1)", partner: "Option to 960 MW", tag: "Multi-phase" },
  { co: "Google", deal: "Kairos Power · 6–7 reactors", power: "500 MW total", partner: "Delivery by 2035", tag: "Corporate first" },
];

export default function NuclearShift() {
  return (
    <SectionShell
      id="nuclear"
      chapter="Chapter 05"
      kicker="The Nuclear Pivot"
      title={
        <>
          SMRs displace water demand. They <em className="italic text-gradient">do not eliminate it.</em>
        </>
      }
      lede={
        <>
          More than $10 billion in tech-company commitments. 22 GW of small modular reactor (SMR) projects in
          development worldwide. The first commercial SMR-powered data centers expected by 2030. The hyperscalers&rsquo;
          rush to nuclear is real, but it solves a carbon problem, not a water one.
        </>
      }
      className="bg-gradient-to-b from-background via-card/20 to-background"
    >
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {deals.map((d, i) => (
          <motion.div
            key={d.co}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-7 rounded-2xl bg-card/60 border border-border backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">{d.tag}</div>
              <div className="font-display text-2xl mb-2">{d.co}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{d.deal}</p>
              <div className="flex items-baseline gap-3 pt-3 border-t border-border">
                <span className="font-display text-2xl text-gradient">{d.power}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{d.partner}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/30 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">The promise</div>
          <h3 className="font-display text-2xl font-light mb-4">Carbon-free baseload, sited on demand.</h3>
          <p className="text-muted-foreground leading-relaxed">
            SMRs decouple compute growth from grid emissions. For hyperscalers facing scope-2 carbon scrutiny, the
            economics are increasingly compelling: long-duration PPAs, dedicated capacity, fewer permitting battles
            than transmission lines.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-destructive/15 to-transparent border border-destructive/30 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-widest text-destructive mb-3">The catch</div>
          <h3 className="font-display text-2xl font-light mb-4">Water demand is moved, not removed.</h3>
          <p className="text-muted-foreground leading-relaxed">
            Reactors require cooling. If the SMR and the data center sit in the same water-stressed basin, which the
            siting logic of co-location actively encourages, the basin is no better off. The footprint simply migrates
            from cooling tower to reactor heat sink.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
