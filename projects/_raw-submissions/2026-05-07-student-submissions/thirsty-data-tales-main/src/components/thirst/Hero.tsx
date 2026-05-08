import { motion } from "framer-motion";
import heroImg from "@/assets/hero-thirst.jpg";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden grain">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="A single drop of water falling between glowing server racks onto cracked, parched earth"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[12, 34, 58, 72, 88].map((left, i) => (
          <span
            key={i}
            className="absolute top-0 w-[2px] h-6 bg-gradient-to-b from-transparent via-primary to-primary/0 animate-drip"
            style={{ left: `${left}%`, animationDelay: `${i * 0.9}s`, animationDuration: `${4 + i * 0.4}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-8 space-y-3">
            <div className="font-mono text-sm md:text-base uppercase tracking-[0.25em] text-primary flex items-center gap-3 flex-wrap">
              <span className="h-px w-10 bg-primary/60" />
              The Geopolitics of Artificial Intelligence: Sovereignty, Power, and the Future of World Order
            </div>
            <div className="font-display text-xl md:text-2xl text-foreground/95 leading-snug">
              Amelie Kenney · Dienaba Annie Sagna · Angelina Trefilova · Anais Servais
            </div>
            <div className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">
              May 2026
            </div>
          </div>
          <h1 className="font-display font-light text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-tight">
            The <em className="italic text-gradient font-normal">Invisible</em>
            <br />
            Thirst
          </h1>
          <p className="mt-8 font-display italic text-2xl md:text-3xl text-foreground/90 leading-snug max-w-3xl">
            The crisis of data scarcity in AI water usage.
          </p>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            While AI&rsquo;s carbon footprint captures headlines, its <span className="text-foreground">water footprint</span> remains
            structurally hidden. Modern data centers drink billions of liters, and almost no one is counting.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 p-6 md:p-8 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-md max-w-3xl ring-water"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Research question</div>
            <p className="font-display text-xl md:text-2xl leading-snug text-foreground">
              What problems does the <em className="italic text-gradient">absence of reliable data</em> on AI water
              consumption create for governance, environmental sustainability, and the communities living next door to
              the machines?
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
