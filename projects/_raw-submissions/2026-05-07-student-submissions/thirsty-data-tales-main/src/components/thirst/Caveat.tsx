import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Caveat() {
  return (
    <section className="relative px-6 py-24 md:py-32 bg-gradient-to-b from-background via-card/10 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.a
          href="#data"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group block p-8 md:p-12 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-md ring-water hover:border-primary/60 transition-colors"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/60" />
            A caveat before continuing
          </div>
          <p className="font-display text-xl md:text-2xl leading-snug text-foreground/90 mb-6">
            The figures cited above, and throughout this essay, are the best we have, but they are not what we
            need. Corporate sustainability reports are voluntary, inconsistently scoped, and almost always
            aggregated to the national or fleet level. Peer-reviewed estimates rely on triangulation from utility
            records, leaked permits, and modelled assumptions. Outside the United States and a handful of EU
            jurisdictions, facility-level water data is functionally absent: most of Latin America, Sub-Saharan
            Africa, South and Southeast Asia, and the Gulf operate in a near-total reporting void, even as
            hyperscale build-out accelerates in precisely those regions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            What follows, then, should be read less as a definitive accounting than as a map of what we glimpse
            through the gaps. The deeper story is the gap itself.
          </p>
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/60">
            <span className="font-display italic text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
              What you cannot measure, you cannot govern →
            </span>
            <ArrowDown className="w-5 h-5 text-primary shrink-0 group-hover:translate-y-1 transition-transform" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
