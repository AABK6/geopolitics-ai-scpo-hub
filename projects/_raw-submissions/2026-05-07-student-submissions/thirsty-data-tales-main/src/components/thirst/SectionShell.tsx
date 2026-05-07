import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  chapter: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionShell({ id, chapter, kicker, title, lede, children, className }: Props) {
  return (
    <section id={id} className={cn("relative py-32 md:py-40 px-6", className)}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-4xl"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {chapter} · {kicker}
          </div>
          <h2 className="font-display font-light text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            {title}
          </h2>
          {lede && (
            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {lede}
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
