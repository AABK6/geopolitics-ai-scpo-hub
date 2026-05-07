import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { id: "scale", label: "01 Scale" },
  { id: "data", label: "02 Vacuum" },
  { id: "geography", label: "03 Hotspots" },
  { id: "technology", label: "04 Trilemma" },
  { id: "nuclear", label: "05 Nuclear" },
  { id: "regulation", label: "06 Governance" },
  { id: "comparisons", label: "07 Comparisons" },
  { id: "solutions", label: "08 Pathways" },
  { id: "conclusion", label: "09 Conclusion" },
];

export default function Navigation({ active }: { active: string }) {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="#hero" className="font-display text-base tracking-tight flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-gradient font-semibold">The Invisible Thirst</span>
        </a>
        <div className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={cn(
                "px-3 py-1.5 rounded-full transition-colors border border-transparent",
                active === it.id
                  ? "text-primary border-primary/30 bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
