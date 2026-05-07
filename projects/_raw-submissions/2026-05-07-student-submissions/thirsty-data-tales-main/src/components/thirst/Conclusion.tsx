import { motion } from "framer-motion";

export default function Conclusion() {
  return (
    <section id="conclusion" className="relative py-40 px-6 overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            Chapter 09 · Conclusion
          </div>
          <h2 className="font-display font-light text-5xl md:text-7xl leading-[1.02] tracking-tight mb-12">
            A technology that solves global problems while <em className="italic text-gradient">creating local ones</em>.
          </h2>

          <div className="space-y-7 text-lg md:text-xl text-muted-foreground leading-relaxed font-display font-light">
            <p>
              The central issue is not simply the <span className="text-foreground">scale</span> of AI&rsquo;s water
              consumption. At a planetary level it remains under one-twentieth of one percent of withdrawals, even on
              the high lifecycle estimates. The crisis is not arithmetic. It is{" "}
              <span className="text-foreground">epistemic</span> and it is{" "}
              <span className="text-foreground">geographic</span>.
            </p>
            <p>
              Epistemic, because we do not know what we are doing. Half of operators do not measure. One in ten measures
              comprehensively. Where the EU forces disclosure, it aggregates the result to national level, exactly
              the resolution at which hydrological harm becomes invisible.
            </p>
            <p>
              Geographic, because water is not fungible. A trillion liters distributed thinly across the planet is a
              statistical curiosity. The same trillion liters concentrated in Querétaro during a once-in-a-century
              drought, or in The Dalles, or in Loudoun County, becomes a story about who is permitted to drink and who
              is not. The data center growth curve and the global water-stress map have, by design, been laid on top
              of each other.
            </p>
            <p className="text-foreground">
              Technological innovation alone cannot resolve this. The trilemma between water, energy and geography
              guarantees that every solution buys one corner and pays in another. SMRs displace water demand without
              eliminating it. Immersion cooling shifts the load to the grid. Free-air cooling requires a climate that
              is rarely co-located with cheap, clean electricity.
            </p>
            <p>
              What remains is governance. The institutional question is whether transparency can be enforced at the
              facility level; whether prices can be made to signal scarcity; whether infrastructure development can be
              conditioned on ecological reality rather than the absence of opposition. The Netherlands has shown one
              answer is possible. Chile, Johor and a handful of U.S. states are improvising others. Most of the world
              has not yet begun.
            </p>
            <p className="pt-6 border-t border-border font-display italic text-2xl md:text-3xl text-foreground">
              The question is not whether AI can be made sustainable. It is whether the institutions required to govern
              it can be built before the externalities become irreversible, and whether the communities currently
              paying the cost will be granted a seat at the table where that institution-building happens.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
