import { useEffect, useRef, useState, type ReactNode } from "react";

type ScenarioId = "baseline" | "shock1" | "shock2" | "shock3";
type CountryCode = "CN" | "US" | "IL" | "EU";

interface CountryMeta {
  code: CountryCode;
  name: string;
  ring: string;
}

const COUNTRIES: Record<CountryCode, CountryMeta> = {
  CN: { code: "CN", name: "China", ring: "#C8242C" },
  US: { code: "US", name: "United States", ring: "#3C3B6E" },
  IL: { code: "IL", name: "Israel", ring: "#0038B8" },
  EU: { code: "EU", name: "European Union", ring: "#FFCC00" },
};

const SCENARIOS: { id: ScenarioId; label: string }[] = [
  { id: "baseline", label: "TODAY ◼ HERE" },
  { id: "shock1", label: "Shock 01 · Terrorism" },
  { id: "shock2", label: "Shock 02 · Military" },
  { id: "shock3", label: "Shock 03 · Economic" },
];

const POSITIONS: Record<ScenarioId, Record<CountryCode, [number, number]>> = {
  baseline: { CN: [25, 40], US: [70, 60], IL: [60, 35], EU: [50, 75] },
  shock1: { CN: [30, 68], US: [40, 75], IL: [22, 22], EU: [35, 82] },
  shock2: { CN: [18, 28], US: [12, 55], IL: [45, 40], EU: [30, 55] },
  shock3: { CN: [55, 32], US: [90, 55], IL: [65, 35], EU: [72, 60] },
};

interface CountryBlock {
  code: CountryCode;
  label: string;
  body: ReactNode;
}

interface ScenarioContent {
  id: ScenarioId;
  topLabel: string;
  kicker: string;
  countries: CountryBlock[];
  globalLabel: string;
  globalBody: ReactNode;
}

const CONTENT: Record<ScenarioId, ScenarioContent> = {
  baseline: {
    id: "baseline",
    topLabel: "TODAY ◼ HERE",
    kicker:
      "The four current equilibria, before any shock arrives. Each state already sits at a different point on the map — China embedded in the supply chain, the United States negotiating a hybrid, Israel fused with its security apparatus, the EU exporting norms it cannot enforce.",
    countries: [
      {
        code: "US",
        label: "United States · The Negotiated Hybrid",
        body: "Frontier capability is privately owned; alignment with the state is bought, not commanded. NATO and bilateral commitments keep posture broadly multilateral.",
      },
      {
        code: "CN",
        label: "China · The State Inside the Supply Chain",
        body: "Private firms operate within a security mandate set by the 15th Five-Year Plan. The Belt and Road Initiative provides reach without binding multilateral structures.",
      },
      {
        code: "IL",
        label: "Israel · Start-up Nation, Live-fire Lab",
        body: "Private firms function as extensions of the security apparatus. Strategic dependence on the US shapes posture; otherwise insular.",
      },
      {
        code: "EU",
        label: "European Union · Regulatory Power, Commercial Weakness",
        body: "Multilateral by reflex; the Brussels Effect substitutes for capability. Member states diverge sharply in readiness.",
      },
    ],
    globalLabel: "Global Outcome",
    globalBody:
      "A fragmented status quo. No state is satisfied with its position; each is preparing for the shock it most fears.",
  },
  shock1: {
    id: "shock1",
    topLabel: "Shock 01 · Terrorism",
    kicker:
      "The democratization of mass-destruction capabilities through frontier AI forces an abrupt, defensive pivot in global governance.",
    countries: [
      {
        code: "US",
        label: "United States · The Bureau of AI Security",
        body: 'In what many observers would likely call a "9/11 moment" for the digital age, Washington could move toward a model of Soft Nationalization. One might assume the establishment of a permanent Bureau of AI Security (BAIS), potentially granted "search-and-seize" authority over private compute clusters. However, US leadership would likely realize that domestic containment is insufficient; as a result, they could invite China to join a "Global Redline" pact. This would be a high-stakes gamble, trading some competitive opacity for a shared multilateral initiative aimed at mitigating catastrophic biological or kinetic risks.',
      },
      {
        code: "CN",
        label: "China · Strategic Multilateralism",
        body: 'Rather than a drastic internal crackdown, Beijing would more likely leverage the "Terrorism" frame to subtly shift the global paradigm. By aligning with international anti-terror norms, the CCP could position itself as a stabilizing leader of a "Responsible AI" bloc. This strategy would allow them to present their domestic surveillance apparatus not as an instrument of autocracy, but as a proactive global public good. This could effectively neutralize Western critiques while ensuring that any emerging international governance framework is heavily influenced by Chinese standards of "social harmony."',
      },
      {
        code: "IL",
        label: "Israel · The Garrison Lab",
        body: "Driven by an existential anti-terror identity, Israel would be highly likely to pivot toward a Hardened National Champion model. One could expect the formal integration of private labs into the security apparatus, where they would be boosted with massive state resources. In this scenario, market autonomy would almost certainly be sacrificed for total integration with the IDF's defensive grid, turning the high-tech sector into a literal extension of the state's survival mechanism.",
      },
      {
        code: "EU",
        label: "European Union · The Strategic Awakening",
        body: 'The Paris massacre would likely end the era of "regulation as the primary tool." Instead, the EU would be expected to adopt a two-tiered governance framework. While non-frontier AI might remain private under strict rules, all "strategic" AI capabilities — those with defensive or offensive security implications — would likely undergo Soft Nationalization. These models would then be managed as a public utility under a new European Defense Command, marking a definitive shift toward integrated military readiness.',
      },
    ],
    globalLabel: "Global Outcome — A Multilateral Containment Era",
    globalBody:
      'States could find a rare, pragmatic alignment in restricting the democratization of "dangerous" models, creating a global "gated community" of AI powers determined to prevent non-state actor empowerment.',
  },
  shock2: {
    id: "shock2",
    topLabel: "Shock 02 · Military",
    kicker:
      "A demonstration of machine-speed battlefield dominance proves that being second in AI is equivalent to being defenseless.",
    countries: [
      {
        code: "US",
        label: "United States · The Aschenbrenner Pivot",
        body: 'Fear of the "End of the American Century" could trigger a move toward Hard Nationalization. To preserve hegemony, the US government might sequester frontier research "under the Eagle\'s wings," effectively turning Silicon Valley into a classified laboratory for the Department of Defense. To compensate for the crippling of the private AI industry, Washington could demand significant payments from allies in exchange for an "AI Umbrella." This would transform the US security guarantee into a literal subscription service for decisive military intelligence.',
      },
      {
        code: "CN",
        label: "China · Validated Integration",
        body: 'Beijing would likely view the Myanmar victory as the ultimate validation of its tech-governance strategy. In this scenario, the CCP would likely double down on its current path: a system where private innovation from firms like Tencent or DeepSeek is seamlessly harvested for state power through Soft Nationalization. Having proven that military-civilian fusion works, China would likely tone down its previous calls for global governance, instead committing fully to an uninhibited AI arms race. The priority would shift toward "model hardening" to ensure their own systems remain immune to the very machine-speed disruption they just deployed.',
      },
      {
        code: "IL",
        label: "Israel · The Specialized Partner",
        body: 'Israel would likely secure its survival by deepening its "Strategic Partnership" with the US, receiving access to classified American tech in exchange for real-world battlefield data.',
      },
      {
        code: "EU",
        label: "European Union · The Security Protectorate",
        body: 'Feeling a "Sino-US" pincer, Europe would likely classify all security-relevant AI as national assets. The EU would be expected to enter the US "cash-for-security" model, paying for access to American frontier systems while establishing a joint NATO AI Command. This move would likely finalize the EU\'s transition from a regulatory superpower to a strategic protectorate of the US.',
      },
    ],
    globalLabel: "Global Outcome — An Alliance-Based Bloc World",
    globalBody:
      'The world would likely split into hardened AI-military blocs (NATO AI vs. China-aligned Digital Silk Road), where access to "Decisive AI" becomes the primary currency of international diplomacy.',
  },
  shock3: {
    id: "shock3",
    topLabel: "Shock 03 · Economic",
    kicker:
      "The failure of state-led recovery leads to a 'Vindication of the Labs,' shifting the Mandate of Heaven to private actors.",
    countries: [
      {
        code: "US",
        label: "United States · The Lab Election",
        body: 'This scenario mirrors the 1970s, where the failure of the Keynesian state during the oil crisis allowed the "fringe" neoliberal movement to become the dominant global paradigm. Just as Thatcher and Reagan rewrote the social contract, a 2030s economic collapse could lead to "AI Thatcherism." With AI driving over 40% of GDP and state tools proving useless, the "Oracles" (Musk, Thiel, Andreessen) would likely be swept into power. One might assume a total rewriting of the US political model, where the labs don\'t just influence policy — they dictate the state\'s economic survival, winning the support of a populace that views them as the only actors capable of delivering growth.',
      },
      {
        code: "CN",
        label: "China · Soft State Capture",
        body: 'To keep the growth engine humming, the CCP would be forced to adapt. One could expect a "Reverse CCP-Model": instead of the Party placing an official in every boardroom, high-level tech executives from Alibaba or DeepSeek might be welcomed into the CCP Central Committees. This would represent a Soft State Capture, where the Party modifies its core ideology to center "AI-Led Productive Forces" as its new source of legitimacy. The state would not nationalize these labs because doing so would risk the very productivity that saved the regime; instead, the state would likely become a vessel for the labs\' economic logic.',
      },
      {
        code: "IL",
        label: "Israel · Strategic Consumer",
        body: 'Israel would likely remain largely unchanged domestically, focusing on its niche as a high-income "Strategic Consumer" of American breakthroughs.',
      },
      {
        code: "EU",
        label: "European Union · The Neo-Liberal Spillover",
        body: 'Europe, having experienced the same crushing depression, would likely follow the "Tech Bro" politics emerging from Washington. One could assume that the "Brussels Effect" would die as the EU adopts US-led AI economic models to ensure continued prosperity. This would likely result in a fragmented, high-growth landscape dominated by private-sector "Saviors," with the EU acting more as a facilitator than a regulator.',
      },
    ],
    globalLabel: "Global Outcome — A Corporate Sovereign Era",
    globalBody:
      'The political moment would belong to the builders. The state could recede into a "platform" role, while the real levers of societal direction move into the boardrooms of a few hyper-capable frontier labs.',
  },
};

const ZONES: { name: string; x: number; y: number }[] = [
  { name: "Nationalisation", x: 15, y: 50 },
  { name: "Soft Nationalisation", x: 38, y: 50 },
  { name: "National Champion", x: 30, y: 25 },
  { name: "State Capture", x: 82, y: 50 },
];

function FlagSvg({ code }: { code: CountryCode }) {
  const common = {
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none" as const,
    style: { display: "block", filter: "saturate(0.85)" },
  };
  if (code === "CN") {
    return (
      <svg viewBox="0 0 60 40" {...common}>
        <rect width="60" height="40" fill="#C8242C" />
        <g fill="#F0CE2C">
          <polygon points="10,6 11.2,9.2 14.5,9.2 11.9,11.2 12.9,14.4 10,12.5 7.1,14.4 8.1,11.2 5.5,9.2 8.8,9.2" />
          <circle r="1" cx="18" cy="4" />
          <circle r="1" cx="22" cy="7" />
          <circle r="1" cx="22" cy="12" />
          <circle r="1" cx="18" cy="15" />
        </g>
      </svg>
    );
  }
  if (code === "US") {
    return (
      <svg viewBox="0 0 60 40" {...common}>
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} x="0" y={i * (40 / 13)} width="60" height={40 / 13} fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
        ))}
        <rect width="24" height={40 * (7 / 13)} fill="#3C3B6E" />
        <g fill="#FFFFFF">
          {Array.from({ length: 4 }).flatMap((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={2.5 + c * 4.5} cy={2.5 + r * 4.5} r="0.7" />
            ))
          )}
        </g>
      </svg>
    );
  }
  if (code === "IL") {
    return (
      <svg viewBox="0 0 60 40" {...common}>
        <rect width="60" height="40" fill="#FFFFFF" />
        <rect x="0" y="5" width="60" height="5" fill="#0038B8" />
        <rect x="0" y="30" width="60" height="5" fill="#0038B8" />
        <g fill="none" stroke="#0038B8" strokeWidth="1.2">
          <polygon points="30,14 34,21 26,21" />
          <polygon points="30,26 34,19 26,19" />
        </g>
      </svg>
    );
  }
  // EU
  const stars = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const cx = 30 + Math.cos(angle) * 13;
    const cy = 20 + Math.sin(angle) * 13;
    return <circle key={i} cx={cx} cy={cy} r="1.4" fill="#FFCC00" />;
  });
  return (
    <svg viewBox="0 0 60 40" {...common}>
      <rect width="60" height="40" fill="#003399" />
      {stars}
    </svg>
  );
}

export function TrajectoriesBlock() {
  const [scenario, setScenario] = useState<ScenarioId>("baseline");
  const [highlight, setHighlight] = useState<CountryCode | null>(null);
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const liveRef = useRef<HTMLDivElement | null>(null);

  const content = CONTENT[scenario];
  const positions = POSITIONS[scenario];
  const baseline = POSITIONS.baseline;

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Scenario changed to ${content.topLabel}.`;
    }
  }, [scenario, content.topLabel]);

  const focusCountry = (code: CountryCode) => {
    const key = `${scenario}-${code}`;
    const el = blockRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlight(code);
      window.setTimeout(() => setHighlight((h) => (h === code ? null : h)), 1100);
    }
  };

  return (
    <div className="mt-24">
      {/* 5.3 sub-header */}
      <div className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
        <span>5.3 / Where each state lands</span>
        <span className="h-px flex-1 bg-[color:var(--rule)] opacity-40" />
      </div>
      <h3 className="mb-5 text-3xl leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)] md:text-4xl font-medium">
        Four Trajectories
      </h3>
      <div className="mb-12 max-w-[780px] space-y-4 font-serif text-base italic leading-snug text-[color:var(--ink-2)] md:text-lg">
        <p>
          Returning to the four states above, how might each respond to the three shocks? The
          matrix below maps country trajectories along two axes. The horizontal axis runs from
          nationalisation to state capture, reflecting the balance between private and state
          power.
        </p>
        <p>
          The vertical axis runs from isolationism to internationalisation, capturing how states
          would position themselves geopolitically. Here, isolationism refers to more
          inward-facing responses, while internationalisation includes not only bi- and
          multilateral cooperation, but also alliance-building and expanded cross-border public
          and private coordination within blocs.
        </p>
      </div>

      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* A. Scenario selector */}
      <div className="mb-10 grid grid-cols-2 gap-2 md:grid-cols-4">
        {SCENARIOS.map((s) => {
          const active = s.id === scenario;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenario(s.id)}
              aria-pressed={active}
              className={[
                "border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all",
                active
                  ? "border-[color:var(--accent)] text-[color:var(--accent)]"
                  : "border-[color:var(--accent)]/25 text-[color:var(--ink)]/50 hover:text-[color:var(--ink)]/80 hover:border-[color:var(--accent)]/50",
              ].join(" ")}
              style={
                active
                  ? { boxShadow: "inset 0 0 24px color-mix(in oklab, var(--accent) 5%, transparent)" }
                  : undefined
              }
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* B. Matrix with reserved 80px outer margin for axis labels */}
      <div className="mx-auto w-full" style={{ maxWidth: 720 + 160 }}>
        <div className="relative" style={{ padding: 80 }}>
          {/* Top axis label */}
          <div
            className="absolute left-0 right-0 text-center font-mono uppercase text-[color:var(--accent)]"
            style={{ top: 32, fontSize: 12, letterSpacing: "0.15em", opacity: 0.85 }}
          >
            INTERNATIONALISATION ↑
          </div>
          {/* Bottom axis label */}
          <div
            className="absolute left-0 right-0 text-center font-mono uppercase text-[color:var(--accent)]"
            style={{ bottom: 32, fontSize: 12, letterSpacing: "0.15em", opacity: 0.85 }}
          >
            ↓ ISOLATIONISM
          </div>
          {/* Left axis label */}
          <div
            className="absolute font-mono uppercase text-[color:var(--accent)] whitespace-nowrap"
            style={{
              left: 32,
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "center",
              fontSize: 12,
              letterSpacing: "0.15em",
              opacity: 0.85,
            }}
          >
            ← NATIONALISATION
          </div>
          {/* Right axis label */}
          <div
            className="absolute font-mono uppercase text-[color:var(--accent)] whitespace-nowrap"
            style={{
              right: 32,
              top: "50%",
              transform: "translateY(-50%) rotate(90deg)",
              transformOrigin: "center",
              fontSize: 12,
              letterSpacing: "0.15em",
              opacity: 0.85,
            }}
          >
            ← STATE CAPTURE
          </div>

          {/* Plot area */}
          <div className="relative" style={{ aspectRatio: "16 / 10" }}>
            {/* Border */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)" }}
            />

            {/* Archetype radial washes (atmosphere only) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {ZONES.map((z) => (
                <div
                  key={z.name}
                  className="absolute"
                  style={{
                    left: `${z.x}%`,
                    top: `${100 - z.y}%`,
                    width: "55%",
                    height: "55%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle at center, color-mix(in oklab, var(--accent) 12%, transparent) 0%, transparent 70%)",
                  }}
                />
              ))}
            </div>

            {/* 4x4 dotted grid */}
            <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.08 }}>
              {[25, 50, 75].map((p) => (
                <div
                  key={`v-${p}`}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${p}%`,
                    width: 1,
                    backgroundImage:
                      "linear-gradient(to bottom, var(--accent) 50%, transparent 50%)",
                    backgroundSize: "1px 4px",
                  }}
                />
              ))}
              {[25, 50, 75].map((p) => (
                <div
                  key={`h-${p}`}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${p}%`,
                    height: 1,
                    backgroundImage:
                      "linear-gradient(to right, var(--accent) 50%, transparent 50%)",
                    backgroundSize: "4px 1px",
                  }}
                />
              ))}
            </div>

            {/* Crosshair */}
            <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.15 }}>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-[color:var(--accent)]" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[color:var(--accent)]" />
            </div>

            {/* Tick marks at 25/50/75 */}
            <div className="pointer-events-none absolute inset-0">
              {[25, 50, 75].map((p) => (
                <div
                  key={`tx-${p}`}
                  className="absolute bg-[color:var(--accent)]"
                  style={{ left: `${p}%`, top: 0, width: 1, height: 3, opacity: 0.6 }}
                />
              ))}
              {[25, 50, 75].map((p) => (
                <div
                  key={`tx2-${p}`}
                  className="absolute bg-[color:var(--accent)]"
                  style={{ left: `${p}%`, bottom: 0, width: 1, height: 3, opacity: 0.6 }}
                />
              ))}
              {[25, 50, 75].map((p) => (
                <div
                  key={`ty-${p}`}
                  className="absolute bg-[color:var(--accent)]"
                  style={{ top: `${p}%`, left: 0, height: 1, width: 3, opacity: 0.6 }}
                />
              ))}
              {[25, 50, 75].map((p) => (
                <div
                  key={`ty2-${p}`}
                  className="absolute bg-[color:var(--accent)]"
                  style={{ top: `${p}%`, right: 0, height: 1, width: 3, opacity: 0.6 }}
                />
              ))}
            </div>

            {/* Trajectory lines (behind markers) */}
            {scenario !== "baseline" && (
              <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <marker
                    id="traj-arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" fillOpacity="0.6" />
                  </marker>
                </defs>
                {(Object.keys(COUNTRIES) as CountryCode[]).map((code) => {
                  const [bx, by] = baseline[code];
                  const [nx, ny] = positions[code];
                  return (
                    <line
                      key={code}
                      x1={`${bx}%`}
                      y1={`${100 - by}%`}
                      x2={`${nx}%`}
                      y2={`${100 - ny}%`}
                      stroke="var(--accent)"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      markerEnd="url(#traj-arrow)"
                    />
                  );
                })}
              </svg>
            )}

            {/* Flag markers */}
            {(Object.keys(COUNTRIES) as CountryCode[]).map((code) => {
              const meta = COUNTRIES[code];
              const [x, y] = positions[code];
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => focusCountry(code)}
                  aria-label={`Highlight ${meta.name} in ${content.topLabel}`}
                  className="group absolute flex flex-col items-center transition-[left,top] duration-[600ms] ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                  style={{
                    left: `${x}%`,
                    top: `${100 - y}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="overflow-hidden transition-transform duration-150 ease-out group-hover:scale-110"
                    style={{
                      width: 36,
                      height: 24,
                      borderRadius: 4,
                      border: "1.5px solid color-mix(in oklab, var(--accent) 60%, transparent)",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
                    }}
                  >
                    <FlagSvg code={code} />
                  </div>
                  <span
                    className="mt-[6px] font-mono text-[10px] uppercase text-[color:var(--accent)]"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    {code}
                  </span>
                  <style>{`
                    .group:hover > div:first-child {
                      border-color: var(--accent) !important;
                    }
                  `}</style>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* C. Description panel */}
      <div className="mx-auto mt-16 max-w-[720px]">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {content.topLabel}
        </div>
        <p className="mb-10 font-serif text-lg italic leading-snug text-[color:var(--ink-2)]">
          {content.kicker}
        </p>

        <div className="flex flex-col gap-8">
          {content.countries.map((c) => {
            const isActive = highlight === c.code;
            return (
              <div
                key={c.code}
                ref={(el) => {
                  blockRefs.current[`${scenario}-${c.code}`] = el;
                }}
                className={[
                  "border p-6 transition-colors duration-500",
                  isActive
                    ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5"
                    : "border-transparent",
                ].join(" ")}
              >
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  {c.label}
                </div>
                <p className="prose-body">{c.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-[color:var(--accent)]/40 pt-6">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {content.globalLabel}
          </div>
          <p className="prose-body">{content.globalBody}</p>
        </div>
      </div>
    </div>
  );
}
