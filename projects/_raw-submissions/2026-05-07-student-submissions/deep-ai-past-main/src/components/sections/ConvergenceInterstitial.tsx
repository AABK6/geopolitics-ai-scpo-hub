import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ConvergenceInterstitial() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full px-6 py-28 md:py-40"
      style={{
        backgroundColor: "var(--inverse)",
        color: "var(--inverse-fg)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          <span>Interstitial / Convergence</span>
          <span className="h-px flex-1 bg-[color:var(--inverse-fg)] opacity-20" />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-12">
          {/* Left track */}
          <div
            className="flex flex-col items-end gap-3"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--inverse-fg)]/70">
              GPTs transform societies
            </div>
            <Track direction="right" />
          </div>

          {/* Center crosshair */}
          <div
            className="relative h-6 w-6"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.5)",
              transition: "all 400ms 500ms ease-out",
            }}
          >
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color:var(--accent)]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--accent)]" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[color:var(--accent)]" />
          </div>

          {/* Right track */}
          <div
            className="flex flex-col items-start gap-3"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--inverse-fg)]/70">
              States and private power contest security
            </div>
            <Track direction="left" />
          </div>
        </div>

        <div
          className="mx-auto mt-20 max-w-[860px]"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 500ms 800ms ease-out, transform 500ms 800ms ease-out",
          }}
        >
          <h2 className="text-3xl font-medium leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl">
            For the first time, these are the same question.
          </h2>
          <p
            className="mt-6 max-w-[640px] font-serif text-lg italic leading-snug text-[color:var(--inverse-fg)]/70 md:text-xl"
            style={{
              opacity: active ? 1 : 0,
              transition: "opacity 500ms 1100ms ease-out",
            }}
          >
            AI is the first general purpose technology whose frontier is also
            a security asset. Industrial policy and grand strategy collapse
            into a single decision.
            <Dialog>
              <DialogTrigger asChild>
                <button className="ml-3 inline-flex items-center gap-1 align-baseline font-mono text-[10px] not-italic uppercase tracking-[0.18em] text-[color:var(--accent)] hover:underline">
                  Read more →
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-[color:var(--rule)] bg-[color:var(--paper)] text-[color:var(--ink)]">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl leading-tight tracking-[-0.01em]">
                    The AI Power Paradox
                  </DialogTitle>
                </DialogHeader>
                <div className="prose-body text-[0.95rem] leading-[1.6] text-[color:var(--ink-2)]">
                  <p>
                    AI is the first strategically decisive GPT whose frontier
                    sits outside the state. Its early foundations were DARPA
                    funded, but transformers, scaling laws and Reinforcement
                    Learning from Human Feedback (RLHF) were built in
                    commercial labs with private capital.
                  </p>
                  <p className="mt-4">
                    The 2025 US contracts with top AI companies, the launch
                    of GenAI.mil, and project Thunderforge all show how the
                    Pentagon is procuring from commercial frontier AI rather
                    than building it. China's military-civil fusion doctrine
                    institutionalizes spin-on as a strategy.
                  </p>
                  <p className="mt-4">
                    These examples show how the state is now structurally
                    downstream of a GPT, it neither produced it nor can
                    quickly replicate it, therefore investing in Ruttan's
                    20th century pipeline. Bremmer and Suleyman (2023) call
                    this the AI Power Paradox.
                  </p>
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
                  Source · Bremmer & Suleyman (2023)
                </div>
              </DialogContent>
            </Dialog>
          </p>
        </div>
      </div>
    </section>
  );
}

function Track({ direction }: { direction: "left" | "right" }) {
  const dots = [0, 1, 2, 3];
  return (
    <div
      className="relative flex w-full max-w-[460px] items-center"
      style={{ flexDirection: direction === "right" ? "row" : "row-reverse" }}
    >
      <div className="h-px flex-1 bg-[color:var(--inverse-fg)]/40" />
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {dots.map((d) => (
          <span
            key={d}
            className="h-1.5 w-1.5 bg-[color:var(--inverse-fg)]/70"
          />
        ))}
      </div>
      <div
        className="h-0 w-0 border-y-[6px] border-y-transparent"
        style={{
          [direction === "right" ? "borderLeft" : "borderRight"]:
            "8px solid var(--accent)",
        }}
      />
    </div>
  );
}
