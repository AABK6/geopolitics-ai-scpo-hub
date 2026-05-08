import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Archetype {
  num: string;
  name: string;
  kicker: string;
  definition: React.ReactNode;
  analogy: React.ReactNode;
}

function E({ children }: { children: React.ReactNode }) {
  return <mark>{children}</mark>;
}

const ARCHETYPES: Archetype[] = [
  {
    num: "01",
    name: "Nationalisation",
    kicker: "The state absorbs the lab outright.",
    definition: (
      <p className="prose-body">
        The state assumes direct ownership and operational control of one or more leading labs.
        The lab ceases to be a company. Its research agenda is set by government ministers and
        security councils, and public access to its outputs is entirely determined by the state.
        The profit motive is replaced by a security mandate.
      </p>
    ),
    analogy: (
      <p className="prose-body">
        The <E>Manhattan Project</E> is the closest parallel: a national security emergency led
        the US to absorb private scientific talent into a classified state programme and orient an
        entire research effort around a US strategic objective. The cautionary counterpart is the
        nationalisation of <E>British aerospace</E> in the 1970s, which tended to freeze rather
        than accelerate innovation.
      </p>
    ),
  },
  {
    num: "02",
    name: "State Capture",
    kicker: "The lab becomes indispensable, and policy bends around it.",
    definition: (
      <p className="prose-body">
        Here, the relationship inverts. The lab becomes so indispensable that public policy bends
        around its interests. This requires no conspiracy; it happens when a private lab gains
        exclusive control over a capability governments cannot replicate, and when the cost of
        confronting that lab becomes prohibitive. Democratic accountability does not necessarily
        disappear, but it becomes increasingly opaque as private power rises.
      </p>
    ),
    analogy: (
      <p className="prose-body">
        The <E>East India Company</E> is the starkest historical case: a trading venture that
        ended up administering territory and commanding armies, with the British state following
        rather than leading.
      </p>
    ),
  },
  {
    num: "03",
    name: "Soft Nationalisation",
    kicker: "Private on paper, contractor in practice.",
    definition: (
      <p className="prose-body">
        The two outcomes above are poles. Most real responses will land between them, and soft
        nationalisation has been discussed as a plausible outcome. The state imposes security
        clearances, mandatory government briefings before major releases, procurement
        dependencies, emergency oversight powers, which notably includes a veto power over
        release, but without ever formally taking ownership. The lab remains private and nominally
        independent, but functions as a government contractor with unusual latitude.
      </p>
    ),
    analogy: (
      <p className="prose-body">
        Post-9/11 US telecommunications governance, where <E>FISA</E> requirements and informal{" "}
        <E>NSA</E> access made private companies into instruments of state surveillance without
        formal nationalisation, illustrates the emergency-to-permanence dynamic well.
      </p>
    ),
  },
  {
    num: "04",
    name: "National Champion",
    kicker: "One lab chosen, shielded, and resourced as a strategic asset.",
    definition: (
      <p className="prose-body">
        The state designates a single lab as its strategic AI actor — shielding it from domestic
        competition, channelling public resources toward it, and treating its success as a
        national interest. The lab remains private, but operates in an environment deliberately
        structured to favour it. What emerges is an artificial monopoly wrapped in a national
        security rationale.
      </p>
    ),
    analogy: (
      <p className="prose-body">
        France's backing of <E>Airbus</E> — protected market access, state investment, deliberate
        cultivation of a European competitor to <E>Boeing</E> — is the cleanest industrial
        parallel. The consistent risk across all versions of this outcome is lock-in: once a
        champion is entrenched, the political cost of holding it accountable becomes prohibitive.
      </p>
    ),
  },
];

export function ArchetypesBlock() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastOpenedRef = useRef<number | null>(null);
  const active = openIdx === null ? null : ARCHETYPES[openIdx];

  useEffect(() => {
    if (openIdx === null && lastOpenedRef.current !== null) {
      const btn = triggerRefs.current[lastOpenedRef.current];
      btn?.focus();
      lastOpenedRef.current = null;
    } else if (openIdx !== null) {
      lastOpenedRef.current = openIdx;
    }
  }, [openIdx]);

  return (
    <div className="mt-20">
      {/* 5.2 sub-header */}
      <div className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
        <span>5.2 / Four policy archetypes</span>
        <span className="h-px flex-1 bg-[color:var(--rule)] opacity-40" />
      </div>

      <h3 className="mb-4 text-3xl leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)] md:text-4xl font-medium">
        Outcomes.
      </h3>

      <p className="mb-10 max-w-[720px] font-serif text-base italic leading-snug text-[color:var(--ink-2)] md:text-lg">
        What would the consequences of the three shocks be? The archetypes below outline four
        plausible policy paths, representing a menu of responses that will be combined and adapted
        in practice.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {ARCHETYPES.map((a, i) => (
          <button
            key={a.num}
            ref={(el) => { triggerRefs.current[i] = el; }}
            type="button"
            aria-label={`Open archetype file: ${a.name}`}
            onClick={() => setOpenIdx(i)}
            className="group relative flex flex-col overflow-hidden border border-[color:var(--rule)] bg-[color:var(--paper-2)] text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[color:var(--accent)]/80 focus:outline-none focus:border-[color:var(--accent)]"
          >
            <div className="flex flex-col gap-4 p-8 md:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  Archetype {a.num}
                </span>
              </div>
              <h4 className="text-2xl leading-[1.1] tracking-[-0.02em] text-[color:var(--ink)] md:text-3xl font-medium">
                {a.name}
              </h4>
              <p className="font-serif text-base italic leading-snug text-[color:var(--ink-2)]">
                {a.kicker}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent
          className="max-h-[85vh] w-[85vw] max-w-[1100px] overflow-y-auto rounded-none border border-[color:var(--rule)] bg-[color:var(--paper-2)] p-0"
        >
          {active && <ArchetypeBody archetype={active} onClose={() => setOpenIdx(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArchetypeBody({ archetype, onClose }: { archetype: Archetype; onClose: () => void }) {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          Archetype {archetype.num} · {archetype.name.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)] hover:text-[color:var(--ink)]"
        >
          Close ✕
        </button>
      </div>

      <div className="mb-10 border-b border-[color:var(--rule)] pb-8">
        <DialogTitle className="text-4xl leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)] md:text-5xl font-medium">
          {archetype.name}
        </DialogTitle>
        <DialogDescription className="mt-3 font-serif text-lg italic leading-snug text-[color:var(--ink-2)] md:text-xl">
          {archetype.kicker}
        </DialogDescription>
      </div>

      <div className="mx-auto max-w-[640px]">
        <ArchetypeSubsection label="Definition">{archetype.definition}</ArchetypeSubsection>
        <ArchetypeSubsection label="Historical analogy" last>
          {archetype.analogy}
        </ArchetypeSubsection>
      </div>
    </div>
  );
}

function ArchetypeSubsection({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-8 border-b border-[color:var(--accent)]/30 pb-8"}>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
        {label}
      </div>
      <div className="prose-body">{children}</div>
    </div>
  );
}
