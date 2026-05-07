import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const cases = [
  {
    n: "01",
    title: "Coca-Cola in Monterrey",
    subtitle: "Scarcity is not only hydrological. It is institutional.",
    color: "hsl(var(--drought))",
    body: [
      "The 2022 Monterrey drought is useful precisely because it cannot be reduced to corporate overconsumption. It shows how water scarcity becomes political when different users depend on the same basin under unequal conditions.",
      "As taps ran dry, residents queued for water trucks. Poorer districts received brackish or unreliable supply while wealthier ones did not. Meanwhile, beverage companies, including Coca-Cola-linked bottlers and Heineken, kept producing. The Guardian estimated that brewers and soft-drink makers in the region used nearly 90 billion liters per year, more than half drawn from public reservoirs, with private wells filling the gap.",
      "The deeper failure was not consumption but governance: permits, reservoirs, private wells, municipal supply, and bottled-water markets were not coordinated through a single public logic of priority.",
      "The beverage industry has responded to these conflicts through water stewardship: efficiency targets, replenishment pledges, watershed restoration projects, emergency water donations, and negotiated reductions during periods of stress. These measures can improve water management at the margins, especially when they reduce losses, fund local infrastructure, or restore parts of a watershed. In Monterrey, for instance, when the president eventually asked firms to halt production and redirect water, Heineken offered 20% of its supply for public use, while Coca-Cola invited residents to collect water at one of its facilities.",
      "Yet these responses also reveal the limits of the model. They came after scarcity had already turned into social conflict, and they remained dependent on corporate discretion rather than pre-established allocation rules. More broadly, water stewardship is often voluntary and measured at the corporate or aggregate level. A company may claim progress globally while pressure remains concentrated in the specific basin where extraction takes place.",
      "This is why the case matters for AI. During drought, the key issue is not only whether a firm has a sustainability strategy. It is whether public authorities can determine, transparently and in advance, which uses of water take precedence.",
    ],
    lesson:
      "For data centers, governance cannot stop at company-wide claims like “water positive” or aggregate annual reporting. What matters is the facility's relationship to a specific basin: the source of the water, the permit regime, the seasonal stress level, the competing users, and the rules that apply when scarcity worsens.",
    takeaway:
      "Water conflict emerges when legal access, economic usefulness, and social priority are allowed to diverge.",
  },
  {
    n: "02",
    title: "The chemical industry in the EU",
    subtitle: "Making water impacts administratively visible.",
    color: "hsl(var(--water))",
    body: [
      "The chemical sector is no model of environmental innocence, but it is a precedent in which water-related risks have been progressively translated into regulatory categories. Under the Industrial Emissions Directive and the Best Available Techniques (BREF) reference documents, EU chemical installations must address environmental management systems, water saving, wastewater collection and treatment, sludge handling, and emissions monitoring.",
      "What matters is not the moral standing of the industry but the existence of a shared technical language. Regulators can evaluate facilities, attach conditions to permits, and demand monitoring. Voluntary disclosure is not enough; standards make impacts contestable.",
      "Data centers, by contrast, are still narrated as part of an abstract “cloud.” In practice they are industrial installations requiring land, energy, cooling infrastructure, water access, and wastewater management. The chemical precedent suggests that strategic value is not a reason to exempt an industry from regulation, if anything, the more essential the infrastructure becomes, the more important enforceable standards on its material inputs become.",
    ],
    lesson:
      "Data centers should be governed less as “cloud” infrastructure and more as water-using industrial installations. Cooling technology, withdrawals, consumption, wastewater, local water stress, and contingency rules should be folded into permitting and reporting obligations.",
    takeaway:
      "Making water impacts governable requires more than disclosure. It requires standards, permits, monitoring, and enforceable operating conditions.",
  },
];

export default function Comparisons() {
  return (
    <SectionShell
      id="comparisons"
      chapter="Chapter 07"
      kicker="Comparative Governance"
      title={
        <>
          What AI can <em className="italic text-gradient">learn</em> from water-intensive industries.
        </>
      }
      lede={
        <>
          AI's water footprint is often presented as a new problem, but the governance dilemma is familiar. Other
          industries have already produced the same tension: socially or economically useful production combined with
          local water pressures that remain difficult to measure, contest, or regulate. The question is not whether
          Coca-Cola, the chemical sector, or AI are &ldquo;good&rdquo; or &ldquo;bad&rdquo;, but how each sector makes
          water use governable, or fails to.
        </>
      }
    >
      <div className="space-y-10 mb-14">
        {cases.map((c, i) => (
          <motion.article
            key={c.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative p-7 md:p-10 rounded-2xl bg-card/50 border border-border backdrop-blur-sm overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }}
            />
            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10">
              <div className="font-display text-6xl md:text-7xl font-light leading-none" style={{ color: c.color }}>
                {c.n}
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: c.color }}>
                  Precedent
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-light leading-tight mb-3">{c.title}</h3>
                <p className="font-display italic text-lg md:text-xl text-muted-foreground mb-6">{c.subtitle}</p>

                <div className="space-y-4 text-base md:text-lg leading-relaxed text-foreground/85 max-w-3xl">
                  {c.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>

                <div className="mt-7 grid md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-background/40 border border-border">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                      AI lesson
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{c.lesson}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-background/40 border border-border">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                      Core takeaway
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">{c.takeaway}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Synthesis */}
      <div className="rounded-2xl bg-card/40 border border-border p-7 md:p-10 backdrop-blur-sm mb-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
          What these precedents reveal
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-light mb-6 max-w-3xl">
          Two governance paths, and AI is on the weaker one.
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-6 rounded-xl bg-background/40 border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--drought))] to-transparent" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--drought))] mb-2">
              Path 01 · Voluntary stewardship
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Companies publish water targets, fund local projects, negotiate reductions, and respond to crises through
              selective concessions. Practices may improve, but Monterrey shows the weakness: when scarcity becomes
              acute, voluntary measures arrive too late and never resolve the question of priority.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-background/40 border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--water))] to-transparent" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--water))] mb-2">
              Path 02 · Industrial regulation
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Public authorities define what must be measured, which technologies are acceptable, how wastewater is
              treated, and how permits are conditioned. Imperfect, but it makes water impacts administratively visible
              and legally contestable.
            </p>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground/85 max-w-3xl">
          AI today is closer to the first path than the second. Its water use remains fragmented across firms,
          facilities, and jurisdictions, while public access to facility-level data remains limited. The governance gap
          is therefore not only that AI consumes water, it is that AI consumes water through infrastructures still
          insufficiently visible to the public systems supposed to regulate them.
        </p>
      </div>

      {/* Punchline */}
      <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 via-card/40 to-accent/10 border border-border backdrop-blur-sm">

        <p className="font-display italic text-2xl md:text-3xl text-foreground/90 leading-snug">
          The choice for AI is not innovation versus water protection. It is{" "}
          <span className="text-gradient not-italic font-normal">voluntary opacity</span> versus{" "}
          <span className="text-gradient not-italic font-normal">enforceable legibility</span>.
        </p>
      </div>
    </SectionShell>
  );
}
