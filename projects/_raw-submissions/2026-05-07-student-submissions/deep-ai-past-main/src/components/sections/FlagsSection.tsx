import { useState, useRef, useEffect } from "react";
import { Section } from "./Section";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type FlagCode = "CN" | "US" | "IL" | "EU";

interface Dossier {
  code: FlagCode;
  dossierNum: string;
  country: string;
  kicker: string;
  tensionLabel: string;
  ecosystem: React.ReactNode;
  tension: React.ReactNode;
  global: React.ReactNode;
}

/* ---------- Flags (inline SVG, accurate geometry) ---------- */

/** China — official 30×20 grid. Big star centered at (5,5) radius 3.
 *  Small stars (radius 1) placed at canonical positions, each rotated so
 *  one point aims at the big star's center. */
function FlagCN({ className }: { className?: string }) {
  const big = { cx: 5, cy: 5 };
  const smalls = [
    { cx: 10, cy: 2 },
    { cx: 12, cy: 4 },
    { cx: 12, cy: 7 },
    { cx: 10, cy: 9 },
  ];
  return (
    <svg viewBox="0 0 30 20" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="30" height="20" fill="#EE1C25" />
      <g fill="#FFFF00">
        {/* Big star — one point straight up */}
        <Star cx={big.cx} cy={big.cy} r={3} />
        {/* Small stars — orient one point toward the big star */}
        {smalls.map((s, i) => {
          const angle = Math.atan2(big.cy - s.cy, big.cx - s.cx) * (180 / Math.PI) + 90;
          return <Star key={i} cx={s.cx} cy={s.cy} r={1} rotation={angle} />;
        })}
      </g>
    </svg>
  );
}

/** Israel — 220×160 official ratio 8:11. White field, two blue stripes,
 *  Star of David from two overlapping triangles (hexagram). */
function FlagIL({ className }: { className?: string }) {
  // Star of David — two equilateral triangles forming a hexagram.
  const cx = 110;
  const cy = 80;
  const R = 27; // outer triangle radius
  const tri = (rotation: number) => {
    const pts = [0, 120, 240].map((deg) => {
      const a = ((deg + rotation) - 90) * (Math.PI / 180);
      return `${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`;
    });
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 220 160" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="220" height="160" fill="#FFFFFF" />
      <rect x="0" y="22" width="220" height="22" fill="#0038B8" />
      <rect x="0" y="116" width="220" height="22" fill="#0038B8" />
      <g fill="none" stroke="#0038B8" strokeWidth="4.5" strokeLinejoin="miter">
        <polygon points={tri(0)} />
        <polygon points={tri(180)} />
      </g>
    </svg>
  );
}

/** United States — 1235×650 (10:19) official spec. 13 stripes, union of
 *  7 stripes height & 0.76 of stripe length. 50 stars in 9 staggered rows
 *  (6/5/6/5/6/5/6/5/6 = 50). */
function FlagUS({ className }: { className?: string }) {
  const W = 1235;
  const H = 650;
  const stripeH = H / 13;
  const stripes: React.ReactElement[] = [];
  for (let i = 0; i < 13; i++) {
    stripes.push(
      <rect
        key={i}
        x="0"
        y={i * stripeH}
        width={W}
        height={stripeH}
        fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
      />,
    );
  }
  const cantonW = 0.76 * W * (7 / 13) * (W / W); // canton width per spec ≈ 0.76 * length of short side relation
  // Per official spec canton width = 0.76 * (7 stripes) ratio doesn't apply directly; use canonical 247/494 ≈ 0.4 of width
  const canton = { w: W * 0.4, h: stripeH * 7 };
  // Star spacing: horizontal pitch H/30 in official; here use 6 cols / 5 cols staggered
  const stars: React.ReactElement[] = [];
  const colPitch = canton.w / 12;
  const rowPitch = canton.h / 10;
  const starR = colPitch * 0.62;
  for (let row = 0; row < 9; row++) {
    const isLong = row % 2 === 0; // rows 0,2,4,6,8 → 6 stars; rows 1,3,5,7 → 5 stars
    const cols = isLong ? 6 : 5;
    const xOffset = isLong ? colPitch : colPitch * 2;
    for (let c = 0; c < cols; c++) {
      const cx = xOffset + c * (colPitch * 2);
      const cy = rowPitch + row * rowPitch;
      stars.push(<Star key={`${row}-${c}`} cx={cx} cy={cy} r={starR} fill="#FFFFFF" />);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {stripes}
      <rect x="0" y="0" width={canton.w} height={canton.h} fill="#3C3B6E" />
      {stars}
    </svg>
  );
}

/** European Union — 3:2 ratio. 12 yellow stars, ring radius = 1/3 of flag
 *  height, centered. Each star has one point straight up (vertical axis). */
function FlagEU({ className }: { className?: string }) {
  const W = 150;
  const H = 100;
  const cx = W / 2;
  const cy = H / 2;
  const r = H / 3;
  const starR = H / 18; // outer radius of each star
  const stars: React.ReactElement[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    stars.push(<Star key={i} cx={x} cy={y} r={starR} fill="#FFCC00" />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width={W} height={H} fill="#003399" />
      {stars}
    </svg>
  );
}

/** 5-pointed star, one point up by default. `rotation` in degrees. */
function Star({
  cx,
  cy,
  r,
  fill = "currentColor",
  rotation = 0,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  rotation?: number;
}) {
  const points: string[] = [];
  const rot = (rotation * Math.PI) / 180;
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2 + rot;
    const radius = i % 2 === 0 ? r : r * 0.382;
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return <polygon points={points.join(" ")} fill={fill} />;
}

const FLAG_COMPONENTS: Record<FlagCode, (p: { className?: string }) => React.ReactElement> = {
  CN: FlagCN,
  US: FlagUS,
  IL: FlagIL,
  EU: FlagEU,
};

/* ---------- Emphasis helper ---------- */

function E({ children }: { children: React.ReactNode }) {
  return <mark>{children}</mark>;
}

/* ---------- Content ---------- */

const DOSSIERS: Dossier[] = [
  {
    code: "CN",
    dossierNum: "01",
    country: "China",
    kicker: "The state inside the supply chain.",
    tensionLabel: "Security tensions",
    ecosystem: (
      <>
        <p className="prose-body">
          China governs its technological sector by balancing regulation, self-regulation, and
          state intervention. Firms such as <E>Baidu</E>, <E>Alibaba</E>, <E>Tencent</E>,{" "}
          <E>Huawei</E>, or <E>Xiaomi</E> operate as private actors but are closely aligned with
          national strategy. AI is framed within a broader national security logic, with
          technological leadership essential to state power. Private firms are structurally
          embedded into security objectives rather than selectively contracted. The state is an
          organizing force that aligns innovation with strategic priorities, like the ones set in
          China's <E>15th Five-Year-Plan</E>, especially as the regime is enforced by the digital
          power often described as digital authoritarianism. Political economy is described as
          Frankenstein, working at the intersection of command-and-control and market forces.
        </p>
        <p className="prose-body mt-5">
          According to <E>A. Zhang</E>, the Chinese regulatory system features a mix of hierarchy
          (ultimate state control), volatility (adapting to rapid regulatory shifts), and
          fragility (dependence on feedback). It is embedded in all the parts of the supply chain,
          not only directing regulatory orientation, but also directing the investments.
        </p>
      </>
    ),
    tension: (
      <p className="prose-body">
        CCP blurred the distinction between state and private enterprises, with a share of private
        firms receiving investment from state-owned enterprises at the level 35%. In 2021, China
        achieved organizational coverage across all 500 major firms, which is linked with
        expanding state capital participation. Control is often indirect, exercised through
        incentives, subsidies, and political signaling rather than intervention. The 2020
        suspension of <E>Ant Group</E>'s IPO illustrates that the state can abruptly discipline
        even the most powerful firms. More broadly, the <E>Chinese Communist Party</E> has
        deepened its presence within the private sector. Cases like <E>Jack Ma</E>'s
        disappearance from public life demonstrate the limits of autonomy. The refusal of LLM{" "}
        <E>DeepSeek</E>, published in 2025, to respond to the prompts regarding Taiwan's autonomy
        or the Tiananmen Square events, further presents limitations in the autonomy of the tech
        companies and their alignment with Chinese guidelines on the ethics review and service of
        artificial intelligence (AI) technology.
      </p>
    ),
    global: (
      <p className="prose-body">
        China's technological development is strictly connected to its foreign policy goals, as it
        exports its innovations and products through the <E>Belt and Road Initiative</E> and, more
        specifically, the <E>Digital Silk Road</E>. That not only means exporting infrastructure,
        but also a surveillance model. In 2017, during the speech at the 19th Party Congress, CCP
        head <E>Xi Jinping</E> outlined the plan for China to emerge as a cyber superpower
        (网络强国, wǎngluò qiángguó). However, China still relies on foreign innovation, with
        American and European components used in its surveillance systems.
      </p>
    ),
  },
  {
    code: "US",
    dossierNum: "02",
    country: "United States",
    kicker: "The negotiated nation-company hybrid.",
    tensionLabel: "Private–public tensions",
    ecosystem: (
      <p className="prose-body">
        The ecosystem is privately owned and highly geographically concentrated in Silicon Valley,
        which reinforces the leading role of private clusters. Frontier capabilities are developed
        by firms such as <E>OpenAI</E>, <E>Anthropic</E>, <E>Google</E>, and <E>Meta</E>, with
        infrastructure dominated by cloud providers like <E>Microsoft</E> and <E>Amazon</E>.
        Alignment with the state is negotiated rather than imposed with procurement power,
        subsidies, and regulatory incentives. However, this balance is fragile, as the tech
        companies accept some state interventionism in exchange for contracts, regulatory
        protection or geopolitical backing (like <E>Palantir</E> or <E>SpaceX</E>), creating a
        "nation-company hybrid", where private companies are instruments of the state, while
        having formal independence.
      </p>
    ),
    tension: (
      <p className="prose-body">
        America's <E>AI Action Plan</E> frames harnessing American innovation and maintaining
        global technological dominance as a national security imperative. The US Department of
        War's strategy to become an "AI-first" warfighting force is accelerated by introducing
        privately developed AI to military and intelligence contracting companies as OpenAI. That
        dependence is threatening security as they are primarily developed outside classified
        environments. Programs such as <E>Project Maven</E> and the <E>Defense Innovation Unit</E>{" "}
        formalize collaboration. Increasingly, the boundary between Silicon Valley and the
        Pentagon is blurring, with personnel circulating between both spheres and private firms
        directly shaping military capabilities. Companies retain the ability to refuse certain
        uses of their technologies, as illustrated by <E>Anthropic</E> resisting Department of
        Defense demands regarding surveillance and autonomous weapons applications.
      </p>
    ),
    global: (
      <p className="prose-body">
        The export of American technologies by private actors to <E>Ukraine</E> highlights how
        state control and a state-centered model of war are transformed. US firms supply a large
        share of intelligence, surveillance, and reconnaissance capabilities worldwide. The data
        of global users is trapped by US-based companies, shaping data flows and digital
        behaviour, and US cloud infrastructure providers account for two-thirds of the global
        cloud market.
      </p>
    ),
  },
  {
    code: "IL",
    dossierNum: "03",
    country: "Israel",
    kicker: "Start-up nation, live-fire lab.",
    tensionLabel: "Private–public tensions",
    ecosystem: (
      <p className="prose-body">
        Israel is often referred to as "Start up Nation", with high tech making up 17% of Israel's
        GDP, which legitimises, finances, and maintains its regime. The defense technology sector
        directly employs over 100,000 individuals. Military, academia, and industry are integrated
        and allow translation of research into operating systems. Israel is constantly exercising
        its military capabilities in the Gaza Strip and the West Bank, allowing it to test the
        efficiency of the technological tools. Institutions such as the{" "}
        <E>Israel Defense Forces</E> (notably <E>Unit 8200</E> and <E>C4I Directorate</E>) act as
        training grounds and innovation hubs. Its goals are set in Israel's National Cybersecurity
        and Cyberdefense Posture, focusing on developing cyber robustness, cyber resilience, and
        capacity.
      </p>
    ),
    tension: (
      <>
        <p className="prose-body">
          Private companies are seen as extensions of the technological power of the state
          apparatus, intersecting intelligence and the market.
        </p>
        <p className="prose-body mt-5">
          The security culture is embedded in the functioning of Israel, with all citizens
          required to execute at least 2 years of military service and <E>Ben Gurion</E>'s
          principles: deterrence, decisive victory, early warning, and alliances. The universities
          are strongly tied to academic knowledge and defense applications. The technologies
          developed by private companies such as <E>Lavender</E> (rating individuals for targeting
          purposes), <E>The Gospel</E> (generating targeting lists), or <E>Where's Daddy</E>{" "}
          (tracking individuals' locations) are integrated in the military and align with security
          goals. Even though the <E>Israel Innovation Authority</E> sets programs for start-ups,
          the IDF disadvantages them while contracting with well-established companies.
          Entrepreneurs report bureaucratic delays, limited access to data and restrictive, opaque
          regulations.
        </p>
      </>
    ),
    global: (
      <>
        <p className="prose-body">
          Israel is highly dependent on foreign, particularly American, software and adding to its
          military value, even though military repurposing often violates the terms of service.
          Israel and the United States launched in January 2025 a{" "}
          <E>Strategic Partnership on Artificial Intelligence, Research, and Critical Technologies</E>,
          which further introduced external actors into its security architecture.
        </p>
        <p className="prose-body mt-5">
          Israel is not a signatory on <E>Wassenaar Arrangements</E>, regulating exports of arms
          and dual use goods. In 2024, exported defense equipment valued at $14.7 bln worldwide,
          as seen in cases like <E>NSO Group</E> (Pegasus), contributing to the proliferation of
          capabilities once limited to states.
        </p>
      </>
    ),
  },
  {
    code: "EU",
    dossierNum: "04",
    country: "European Union",
    kicker: "Regulatory power, commercial weakness.",
    tensionLabel: "Private–state tensions",
    ecosystem: (
      <p className="prose-body">
        The EU's AI ecosystem is fragmented, research-strong, but weaker commercially. Innovation
        is driven by a mix of SMEs, research institutions, and a limited number of firms such as{" "}
        <E>Mistral AI</E> and <E>SAP</E>, but the scale of private investment remains limited.
        Public initiatives, such as <E>AI factories</E>, gigafactories, and the <E>InvestAI</E>{" "}
        facilities, aim to close the gap of lack of "patient capital" by shared infrastructure and
        direct investment. <E>European AI Strategy</E> aimed at both creating leading AI hubs,
        while ensuring their human centrism and trustworthiness. The AI capabilities are spread
        unevenly across member countries.
      </p>
    ),
    tension: (
      <>
        <p className="prose-body">
          As a reaction to the criticism of overregulating AI, the EU introduces deregulation in
          order to boost its innovation capacity, strengthen industry, and attract investment and
          talent. <E>Europol</E>, as European countries' armies, is expanding ties with foreign
          industries by initiatives such as establishing Microsoft desks at agency's headquarters.
          What's more, market-based industrial policies prioritize "patriotic billionaires" acting
          as intermediaries. AI factories are functioning as research institutions more than
          commercial actors, which may hinder AI applications in the private sector. The countries
          with AI strategies reflect higher readiness.
        </p>
        <p className="prose-body mt-5">
          The <E>AI Act</E> leaves a space for dual-use technologies, which are not subject to the
          regulations, exclusively for military, defense or national security services.
        </p>
      </>
    ),
    global: (
      <p className="prose-body">
        The EU remains structurally dependent on non-European infrastructure providers. It uses
        its regulatory stance as normative power, allowing it to set international standards for
        AI governance known as the <E>"Brussels Effect"</E>. However, European components are
        embedded in surveillance, industrial, and defense technologies. European firms such as{" "}
        <E>SAP</E>, <E>Siemens</E>, and <E>ASML</E> hold crucial positions in AI supply chains.
      </p>
    ),
  },
];

/* ---------- Section ---------- */

export function FlagsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastOpenedRef = useRef<number | null>(null);
  const active = openIdx === null ? null : DOSSIERS[openIdx];

  // Return focus to triggering card on close
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
    <Section
      label="§ 04 / Four flags"
      heading="Four flags, four bets."
      standfirst="China, the United States, Israel, and the European Union are each making a different wager on how to govern AI under security pressure. The historical pattern from § 03 repeats — only the failure modes have moved."
      fullBleed
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {DOSSIERS.map((d, i) => {
          const Flag = FLAG_COMPONENTS[d.code];
          return (
            <button
              key={d.code}
              ref={(el) => { triggerRefs.current[i] = el; }}
              type="button"
              aria-label={`Open dossier on ${d.country}`}
              onClick={() => setOpenIdx(i)}
              className="group relative flex flex-col overflow-hidden border border-[color:var(--rule)] bg-[color:var(--paper-2)] text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[color:var(--accent)]/80 focus:outline-none focus:border-[color:var(--accent)]"
            >
              {/* Flag — top ~55% */}
              <div
                className="relative w-full"
                style={{ aspectRatio: "3 / 2", filter: "saturate(0.85)" }}
              >
                <Flag className="absolute inset-0 h-full w-full" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                />
              </div>

              {/* Lower content */}
              <div className="flex flex-col gap-4 p-8 md:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    Dossier {d.dossierNum} · {d.country.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    open dossier →
                  </span>
                </div>
                <h3 className="text-2xl leading-[1.1] tracking-[-0.02em] text-[color:var(--ink)] md:text-3xl font-medium">
                  {d.country}
                </h3>
                <p className="font-serif text-base italic leading-snug text-[color:var(--ink-2)]">
                  {d.kicker}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent
          className="max-h-[85vh] w-[85vw] max-w-[1100px] overflow-y-auto rounded-none border border-[color:var(--rule)] bg-[color:var(--paper-2)] p-0"
        >
          {active && <DossierBody dossier={active} onClose={() => setOpenIdx(null)} />}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

function DossierBody({ dossier, onClose }: { dossier: Dossier; onClose: () => void }) {
  const Flag = FLAG_COMPONENTS[dossier.code];
  return (
    <div className="p-8 md:p-12">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          Dossier {dossier.dossierNum} · {dossier.country.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)] hover:text-[color:var(--ink)]"
        >
          Close ✕
        </button>
      </div>

      {/* Hero */}
      <div className="mb-10 grid grid-cols-12 gap-6 border-b border-[color:var(--rule)] pb-8">
        <div className="col-span-12 md:col-span-3">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "3 / 2", maxHeight: "120px", filter: "saturate(0.85)" }}
          >
            <Flag className="absolute inset-0 h-full w-full" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <DialogTitle className="text-4xl leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)] md:text-5xl font-medium">
            {dossier.country}
          </DialogTitle>
          <DialogDescription className="mt-3 font-serif text-lg italic leading-snug text-[color:var(--ink-2)] md:text-xl">
            {dossier.kicker}
          </DialogDescription>
        </div>
      </div>

      {/* Body — three subsections */}
      <div className="mx-auto max-w-[640px]">
        <DossierSubsection label="AI ecosystem">{dossier.ecosystem}</DossierSubsection>
        <DossierSubsection label={dossier.tensionLabel}>{dossier.tension}</DossierSubsection>
        <DossierSubsection label="Global influences" last>
          {dossier.global}
        </DossierSubsection>
      </div>
    </div>
  );
}

function DossierSubsection({
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
