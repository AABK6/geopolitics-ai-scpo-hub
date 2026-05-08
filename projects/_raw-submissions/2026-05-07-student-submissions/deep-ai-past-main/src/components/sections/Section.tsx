import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  label?: string;
  heading?: ReactNode;
  standfirst?: ReactNode;
  lead?: ReactNode;
  marginalia?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
  fullBleed?: boolean;
  dropCap?: boolean;
}

export function Section({
  label,
  heading,
  standfirst,
  lead,
  marginalia,
  children,
  className,
  id,
  fullBleed = false,
  dropCap = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full border-t border-[color:var(--rule)] px-6 py-20 md:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Editorial header block */}
        {(label || heading || standfirst) && (
          <header className="mb-12 grid grid-cols-12 gap-6">
            {label && (
              <div className="col-span-12 mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                <span>{label}</span>
                <span className="h-px flex-1 bg-[color:var(--rule)] opacity-40" />
              </div>
            )}
            {heading && (
              <h2 className="col-span-12 text-4xl font-medium leading-[1.05] md:col-span-9 md:text-5xl">
                {heading}
              </h2>
            )}
            {standfirst && (
              <p className="col-span-12 font-serif text-lg italic leading-snug text-[color:var(--ink-2)] md:col-span-9 md:text-xl">
                {standfirst}
              </p>
            )}
          </header>
        )}

        {/* Body grid: prose + marginalia */}
        {fullBleed ? (
          <div>{children}</div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <div
              className={cn(
                "col-span-12 md:col-span-7",
                dropCap && "has-dropcap",
              )}
            >
              {lead && (
                <p className="prose-body mb-8 text-[1.0625rem] leading-[1.55]">
                  {lead}
                </p>
              )}
              {children}
            </div>
            {marginalia && (
              <aside className="col-span-12 mt-2 border-t border-[color:var(--rule)]/30 pt-4 font-sans text-xs leading-[1.4] text-[color:var(--ink-mute)] md:col-span-4 md:col-start-9 md:mt-1 md:border-t-0 md:border-l md:border-l-[color:var(--rule)]/20 md:pl-5 md:pt-0">
                {marginalia}
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
