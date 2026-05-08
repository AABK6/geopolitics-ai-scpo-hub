import { useState } from "react";
import { Section } from "./Section";
import { ArchetypesBlock } from "./ArchetypesBlock";
import { TrajectoriesBlock } from "./TrajectoriesBlock";
import shock01 from "@/assets/shock-01-paris.jpg";
import shock02 from "@/assets/shock-02-myanmar.jpg";
import shock03 from "@/assets/shock-03-prosperity.jpg";

interface Shock {
  num: string;
  category: string;
  date: string;
  title: string;
  image: string;
  imageAlt: string;
  short: React.ReactNode;
  expanded: React.ReactNode;
}

const SHOCKS: Shock[] = [
  {
    num: "01",
    category: "Terrorism",
    date: "14 July 2031",
    title: "The Bastille Day Rupture",
    image: shock01,
    imageAlt:
      "Aftermath in central Paris at twilight: smoke over Haussmann rooftops, scattered tricolore flags, blurred figures running.",
    short: (
      <p className="prose-body">
        On 14 July 2031, a proud and celebratory Paris is torn apart by a coordinated jihadist
        attack enabled by frontier AI. Using AI-assisted planning, autonomous devices, cloned
        official voices, and real-time disinformation, the attackers turn Bastille Day into a
        scene of mass death, confusion, and national shock. In the weeks that follow, France comes
        to see the massacre not just as terrorism, but as proof that privately developed AI is a
        severe threat to sovereignty, public order, and national security.
      </p>
    ),
    expanded: (
      <>
        <p className="prose-body">
          It is the evening of 14 July 2031, and Paris is glowing with the confidence of a country
          that feels, at last, to be doing well again. France has enjoyed several years of solid
          growth, unemployment is down, public mood is up, and Bastille Day carries an unusually
          buoyant energy. Along the Seine and across central Paris, families crowd the
          embankments, children sit on their parents' shoulders with little tricolores in hand,
          and tourists press in for a better view of the fireworks. The city feels united,
          festive, and proud in its patriotism.
        </p>
        <p className="prose-body mt-5">
          Then, in the space of minutes, the atmosphere tears apart. The attack is not one
          explosion or one gunman, but a coordinated cascade. Small autonomous devices, assembled
          cheaply from commercially available components, strike at several dense gathering points
          almost simultaneously. False emergency alerts sent through spoofed systems redirect
          parts of the crowd into narrower, more vulnerable routes. Deepfake voice messages,
          mimicking officials and police, spread confusion just as communication networks begin to
          strain. The attackers appear to know where people are concentrated in real time; they
          have used open-source models, adapted targeting software, synthetic reconnaissance, and
          AI-assisted planning tools to identify bottlenecks, VIP movement patterns, police blind
          spots, and moments of peak symbolic impact. Even before the dead are counted, fake
          videos of new attacks begin circulating online, along with fabricated government
          statements and false reports of gunmen elsewhere in the city. Parents lose children in
          the crush. A boy in a paper cockade is shown on live television sitting alone behind a
          barrier, crying for his mother. By midnight, Paris is not just the site of a massacre,
          but the center of a national hallucination in which nobody knows which warnings are
          real, which clips are fake, or whether the worst is over.
        </p>
        <p className="prose-body mt-5">
          In the days that follow, the meaning of the event hardens faster than the facts. The
          perpetrators are quickly identified as jihadist extremists, but public attention moves
          beyond ideology to capability. The horror is not seen simply as another terror attack,
          but as something new: terrorism amplified by frontier AI, made more precise, more
          adaptive, and more psychologically overwhelming than the France of Charlie Hebdo or the
          Bataclan ever had to face. Television panels, emergency debates, and newspaper front
          pages all converge on the same point: this was not only a security failure, but a
          technological one. Tools built in the private sector for productivity, creativity, and
          scale have been repurposed into instruments of mass panic and mass death. The result is
          France's — and the world's — defining trauma of the AI age.
        </p>
      </>
    ),
  },
  {
    num: "02",
    category: "Military dominance",
    date: "Spring 2029",
    title: "Myanmar Down in 48h",
    image: shock02,
    imageAlt:
      "Aerial view of an AI-integrated assault: drone swarm with networked tracking lines over jungle and rice paddies, disabled vehicles below.",
    short: (
      <p className="prose-body">
        In spring 2029, China launches a sudden invasion of Myanmar, claiming that state collapse,
        terrorism, and border instability have become intolerable security threats. Within
        forty-eight hours, the PLA uses deeply integrated AI-enabled warfare — combining
        autonomous systems, cyber disruption, real-time intelligence fusion, and machine-speed
        battlefield adaptation — to render Myanmar's defenses effectively useless. The world is
        shocked not mainly by the invasion itself, but by the revelation that China has quietly
        achieved a level of AI-driven military capability far beyond what other states thought was
        possible.
      </p>
    ),
    expanded: (
      <>
        <p className="prose-body">
          It is the spring of 2029, and Myanmar is widely seen as a failed state: fractured,
          violent, and unstable, but no longer surprising anyone. Beijing has spent months warning
          that the disorder across its border now poses a direct threat to Chinese security,
          citing terrorism, trafficking, militia activity, and risks to critical infrastructure.
          Even so, almost nobody expects China to act so suddenly. There is no long visible
          mobilization, no prolonged diplomatic crisis, no final warning that the world can point
          to afterward. Then, on an otherwise unremarkable morning, China moves.
        </p>
        <p className="prose-body mt-5">
          Within forty-eight hours, Myanmar is effectively finished as a functioning military
          adversary. That is what stuns the world. The speed is so extreme that, at first, many
          assume the reports must be exaggerated. But the explanation soon becomes clear. This is
          not simply a larger or better equipped army crossing a border. It is a demonstration of
          AI-integrated warfare at a level few believed was operational. Communications networks
          are crippled almost immediately. Air defenses are blinded, spoofed, or destroyed.
          Command centers lose contact with one another; some are struck, others fed false
          information. Autonomous and semi-autonomous systems sweep ahead of conventional forces,
          identifying positions, jamming signals, mapping routes, and hitting exposed units before
          they can regroup. AI systems fuse satellite imagery, drone feeds, intercepted messages,
          logistics data, and battlefield telemetry in real time, allowing the PLA to detect
          patterns, predict movements, and retask assets at machine speed. Myanmar's forces are
          not slowly beaten back. They are overwhelmed, disoriented, and rendered useless almost
          before they understand the nature of the assault.
        </p>
        <p className="prose-body mt-5">
          The deeper shock comes after the battle is already over. The world has grown used to
          invasion, coercion, and raw power politics in the 2020s; that is not what makes capitals
          panic. What matters is what China has revealed. Governments had assumed AI would improve
          military performance at the margins — better targeting, better surveillance, faster
          decision-making. Instead, they have just watched a neighboring state collapse in two
          days under the weight of a military system that appears faster, tighter, and more
          integrated than anything they had prepared for. Myanmar becomes not just the site of an
          invasion, but the moment the world realizes that AI may have made battlefield dominance
          far more concentrated, and far more sudden, than anyone had been willing to believe.
        </p>
      </>
    ),
  },
  {
    num: "03",
    category: "Economic crisis",
    date: "Mid-2030s",
    title: "The Labs Save the Day",
    image: shock03,
    imageAlt:
      "Hyper-modern near-future city at golden hour: glass towers with vertical gardens, autonomous transit pods, sunlit plazas full of people.",
    short: (
      <p className="prose-body">
        In the mid 2030s, a devastating global financial crisis drives down incomes, destroys
        jobs, and sends living standards falling across rich and poor countries alike, while
        governments prove unable to reverse the slump. Then a small number of frontier AI labs
        unleash breakthroughs that dramatically raise productivity, accelerate scientific
        progress, lower costs, and restore growth and human welfare at a speed states cannot
        match. As prosperity returns, the public draws a stark conclusion: when governments
        failed, the labs delivered, and the case for tightly constraining private AI power
        suddenly begins to collapse.
      </p>
    ),
    expanded: (
      <>
        <p className="prose-body">
          It is the mid 2030s, and the world is in the grip of a brutal global economic crisis.
          What began as a financial rupture in one part of the system has cascaded through the
          global financial cycle and become something far larger: a synchronized collapse in
          credit, investment, and demand that no major economy can escape. Factories close.
          Consumption contracts. Pension funds wobble. Youth unemployment surges. Governments roll
          out emergency packages, central banks slash rates and reopen every liquidity facility
          they can devise, and parliaments pass stimulus after stimulus — yet little seems to
          work. Growth does not return. Incomes keep falling. In country after country, living
          standards deteriorate, joblessness rises, and the social mood darkens into a mix of
          exhaustion, anger, and humiliation. The crisis is no longer just economic. It is
          civilizational. For the first time in decades, people in rich and poor countries alike
          begin to feel that the future may simply be worse.
        </p>
        <p className="prose-body mt-5">
          Then the turn comes, and it comes not from governments but from the labs. Over the
          course of months, a handful of frontier AI firms unveil systems that do not merely
          automate isolated tasks, but unlock a broad new wave of productive capacity across the
          economy. They sharply reduce the cost of high-level cognitive work, accelerate
          scientific and engineering discovery, optimize energy grids and logistics networks,
          compress drug and materials development timelines, and allow firms to reorganize around
          radically more efficient production and service delivery. What had looked like
          stagnation begins, astonishingly, to reverse. New businesses appear at speed.
          Productivity climbs. Energy becomes cheaper and more reliable. Medical treatments
          arrive faster. Small firms gain access to capabilities once reserved for large
          bureaucracies. Real incomes begin to rise again. Within two years, the atmosphere in
          many countries has changed completely. The same societies that had been sliding into
          despair are suddenly growing, hiring, building, and imagining again.
        </p>
        <p className="prose-body mt-5">
          The political effect is profound. People do not merely notice that the crisis is ending;
          they notice who ended it. Governments had spent years promising recovery and delivered
          very little besides debt, emergency programs, and managerial language. The labs, by
          contrast, seem to have produced abundance. Their founders are no longer spoken of as
          entrepreneurs in the ordinary sense, but as a new class of civilization-builders: the
          oracles of San Francisco, Paris, Shenzhen. In public debate, the argument changes
          almost overnight. Why should states heavily constrain the very institutions that
          restored prosperity, raised living standards, and gave people back a sense of future?
          Calls for aggressive regulation, forced breakups, or nationalization begin to sound not
          prudent but self-defeating, even vindictive. The balance of legitimacy shifts. Power
          has not formally changed hands, but authority has. Governments still rule on paper. Yet
          in the eyes of millions, the most intelligent, effective, and forward-looking actors in
          society now sit not in ministries or parliaments, but inside a small number of private
          AI labs.
        </p>
      </>
    ),
  },
];

export function ScenariosSection() {
  return (
    <Section
      label="§ 05 / Scenarios"
      heading="When the equilibrium breaks."
      standfirst={
        <span className="text-base md:text-lg">
          § 04 described four current equilibria. This section forecasts how each could break.
          Three plausible shocks — a frontier-AI terrorist attack, a machine-speed military
          collapse, and an AI-driven economic rescue — are paired with four policy archetypes
          states could deploy in response. The matrix that follows is a reading of which path each
          state is most likely to take given its political economy, ideology, and history.
        </span>
      }
      fullBleed
    >
      {/* 5.1 sub-header */}
      <div className="mb-10 mt-2">
        <div className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
          <span>5.1 / Three shocks</span>
          <span className="h-px flex-1 bg-[color:var(--rule)] opacity-40" />
        </div>
        <p className="font-serif text-base italic leading-snug text-[color:var(--ink-2)] md:text-lg">
          Three plausible futures. Click any image to read its short version. Expand for the full
          narrative.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {SHOCKS.map((s) => (
          <ShockCard key={s.num} shock={s} />
        ))}
      </div>

      {/* 5.2 — Four policy archetypes */}
      <ArchetypesBlock />

      {/* 5.3 — Trajectories matrix */}
      <TrajectoriesBlock />
    </Section>
  );
}

function ShockCard({ shock }: { shock: Shock }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((v) => !v);
  const label = `${expanded ? "Collapse" : "Expand"} description for ${shock.title}`;

  return (
    <article className="border border-[color:var(--rule)] bg-[color:var(--paper-2)]">
      {/* Image */}
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-expanded={expanded}
        className="group relative block w-full overflow-hidden focus:outline-none"
      >
        <div className="relative w-full" style={{ aspectRatio: "16 / 9", filter: "saturate(0.9)" }}>
          <img
            src={shock.image}
            alt={shock.imageAlt}
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 0 1px rgba(120,200,220,0.15)" }}
          />
        </div>
      </button>

      {/* Lower content */}
      <div className="p-8 md:p-12">
        {/* Metadata bar */}
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[color:var(--rule)]/40 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Shock {shock.num} · {shock.category.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-mute)]">
            {shock.date.toUpperCase()}
          </span>
        </div>

        {/* Headline */}
        <h3 className="mb-6 text-3xl leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)] md:text-4xl font-medium">
          {shock.title}
        </h3>

        {/* Short body */}
        <div className="max-w-[640px]">{shock.short}</div>

        {/* Expand affordance */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-label={label}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)] transition-colors hover:text-[color:var(--ink)]"
        >
          {expanded ? "Collapse ↑" : "Expand description ↓"}
        </button>

        {/* Expanded body */}
        <div
          className="grid transition-[grid-template-rows] duration-[400ms] ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-6 max-w-[640px] border-t border-[color:var(--accent)]/30 pt-6">
              {shock.expanded}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
