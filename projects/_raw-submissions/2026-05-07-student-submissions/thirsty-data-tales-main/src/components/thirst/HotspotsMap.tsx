import { useEffect, useRef, useState } from "react";
import type { Map, Marker } from "leaflet";
import SectionShell from "./SectionShell";
import { cn } from "@/lib/utils";

const cases = [
  {
    id: "dalles",
    name: "The Dalles, Oregon · USA",
    coords: [45.6, -121.2] as [number, number],
    tag: "≈ 1/3 of city water · 13-month legal battle",
    body: "By 2024, Google's data centers consumed approximately one third of the city's total water supply. The figure became public only after a 13-month legal battle waged by The Oregonian against a non-disclosure agreement. It remains the canonical example of the disclosure deficit: the data existed, it was contractually withheld, and a news organization had to litigate to make it public.",
  },
  {
    id: "loudoun",
    name: "Loudoun County, Virginia · USA",
    coords: [39.05, -77.55] as [number, number],
    tag: "900M gallons in 2023 · +63% vs 2019",
    body: "The world's densest data center cluster. Loudoun County consumed approximately 900 million gallons of water in 2023 (a 63% increase from 2019 across Northern Virginia as a whole). A mandatory water disclosure bill was introduced in the Virginia legislature in 2025 but did not clear the Senate before the crossover deadline; it is expected to be reconsidered in 2027.",
  },
  {
    id: "queretaro",
    name: "Querétaro · Mexico",
    coords: [20.6, -100.4] as [number, number],
    tag: "Worst drought in a century · CONAGUA: no new concessions",
    body: "In 2024, 14.8% of the population lacked access to drinking water. CONAGUA recommended against granting new water-use permits in the region. Microsoft built a data center campus there, acquiring an existing water concession rather than receiving a new one, and made no investment in drought-related infrastructure in the seven surrounding municipalities visited by investigators. Amazon announced a separate data center region in the same state, using an air-cooled design that does not require cooling water. The case illustrates a structural mechanism: existing water concessions can be legally transferred to industrial users during drought conditions, regardless of current hydrological assessments.",
  },
  {
    id: "santiago",
    name: "Cerrillos, Santiago · Chile",
    coords: [-33.4, -70.6] as [number, number],
    tag: "Legal pressure · voluntary redesign · permit abandoned",
    body: "Following sustained citizen opposition and legal proceedings over the potential impact on Santiago's drought-stricken aquifer, Google voluntarily announced a switch to air cooling in February 2022, two years before any court ruling. A partial ruling by the Second Environmental Court in September 2024 then ordered a revision of the environmental assessment to incorporate climate change modeling of the water component. Google subsequently abandoned its 2020 environmental permit and announced it would restart the approval process from scratch with the revised air-cooled design. The case is notable less for the court ruling itself than for what preceded it: citizen and municipal pressure forced a design change before any legal compulsion existed.",
  },
  {
    id: "uruguay",
    name: "Canelones · Uruguay",
    coords: [-34.5, -56.28] as [number, number],
    tag: "Hyperscale proposal during historic drought",
    body: "A facility in Canelones (a department adjacent to Montevideo) was initially designed to consume approximately 7.6 million liters of potable water per day, equivalent to the daily domestic water use of around 55,000 people. The announcement coincided with Uruguay's worst drought in 70 years. Following widespread opposition, court action, and regulatory scrutiny, Google redesigned the project to use air cooling and the revised proposal was ultimately approved. The case is one of the few documented instances where public mobilization measurably altered a data center's cooling architecture before construction.",
  },
  {
    id: "johor",
    name: "Johor · Malaysia",
    coords: [1.49, 103.76] as [number, number],
    tag: "30% of applications rejected · Nov 2024",
    body: "In November 2024, the Johor state government rejected approximately 30% of data center applications citing insufficient sustainable practices to reduce water and power usage. It represents a rare case of proactive sub-national regulation in the Global South and an exception that makes the broader pattern more visible by contrast.",
  },
  {
    id: "phoenix",
    name: "Phoenix, Arizona · USA",
    coords: [33.45, -112.07] as [number, number],
    tag: "Municipal-level pressure · no statewide mandate",
    body: "No enacted statewide Arizona law specifically imposes AI water-use surcharges or closed-loop cooling mandates. Regulatory pressure has emerged at the municipal level: Chandler has capped data center water use at 115 gallons per day per 1,000 sq ft since 2015; Marana banned potable water supply to data center cooling systems in December 2024. State-level proposals remain in committee. On the physics: empirical research on Phoenix data centers found that in hot-arid conditions with cold aisle containment, air-side economizers are effective approximately 40% of the year, consistent with broader studies, while other cooling configurations face similarly narrow seasonal windows of efficiency. The underlying constraint is structural: in the climate zones where most new data centers are being built, no cooling system operates optimally year-round.",
  },
  {
    id: "zeewolde",
    name: "Netherlands · Regulatory timeline",
    coords: [52.33, 5.54] as [number, number],
    tag: "Moratorium 2022 · permanent ban 2024 · Meta Zeewolde cancelled",
    body: "In February 2022, the Dutch government imposed a 9-month preparatory moratorium on new hyperscale data centers, explicitly exempting Meta's planned facility in Zeewolde. Meta cancelled the Zeewolde project in July 2022, under citizen and parliamentary pressure that preceded and operated independently of the government moratorium. A permanent nationwide ban on new hyperscale data centers (>10 ha, >70 MW) entered into force in January 2024, following adoption of the amended environmental decree. Two locations remain exceptions: Eemshaven and Agriport A7/B1.",
  },
];

export default function HotspotsMap() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const [active, setActive] = useState(cases[0].id);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !mapEl.current || mapRef.current) return;

      const map = L.map(mapEl.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      }).setView([25, -30], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 8,
        minZoom: 2,
      }).addTo(map);

      cases.forEach((c) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="position:relative;width:20px;height:20px;">
            <span style="position:absolute;inset:-6px;border-radius:999px;background:hsl(var(--water) / 0.35);animation:ripple 3s ease-out infinite;"></span>
            <span style="position:absolute;inset:0;border-radius:999px;background:hsl(var(--water));box-shadow:0 0 12px hsl(var(--water)), 0 0 24px hsl(var(--water) / 0.6);"></span>
          </div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        const m = L.marker(c.coords, { icon })
          .addTo(map)
          .bindPopup(`<div style="font-family:Inter,sans-serif"><strong>${c.name}</strong><br/><span style="font-size:11px;color:hsl(var(--muted-foreground))">${c.tag}</span></div>`);
        m.on("click", () => setActive(c.id));
        markersRef.current[c.id] = m;
      });

      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const c = cases.find((x) => x.id === active);
    if (!c) return;
    map.flyTo(c.coords, 5, { duration: 1.4 });
    const marker = markersRef.current[c.id];
    if (marker) marker.openPopup();
  }, [active]);

  return (
    <SectionShell
      id="geography"
      chapter="Chapter 03"
      kicker="Geography of Concentration"
      title={
        <>
          Two-thirds of new data centers are built in <em className="italic text-gradient">water-stressed</em> places.
        </>
      }
      lede={
        <>
          MSCI projects that one in four existing data centers will face more frequent water scarcity days by 2050.
          Northern Virginia, Arizona, Texas, the Gulf: the geography of compute concentrates in semi-arid zones because
          land, power, and regulation are cheap there. Water rarely figures into the calculus.
        </>
      }
    >
      {/* Top-line stats strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {[
          { n: "2/3", l: "of new data centers built or in development in the U.S. since 2022 are located in water-stressed areas" },
          { n: "1/4", l: "existing data centers projected to face more frequent water scarcity days by 2050" },
          { n: "200+", l: "data center bills introduced across U.S. state legislatures in 2025" },
        ].map((s) => (
          <div key={s.n} className="p-5 rounded-xl bg-card/40 border border-border backdrop-blur-sm">
            <div className="font-display text-3xl md:text-4xl text-gradient leading-none">{s.n}</div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="relative rounded-2xl overflow-hidden border border-border ring-water">
          <div ref={mapEl} className="h-[560px] w-full" />
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-border">
            Interactive · 8 sites · click markers
          </div>
        </div>
        <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "text-left p-5 rounded-xl border transition-all group",
                active === c.id
                  ? "bg-card border-primary/50 ring-water"
                  : "bg-card/40 border-border hover:border-primary/30 hover:bg-card/70"
              )}
            >
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="font-display text-base md:text-lg leading-tight">{c.name}</span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors shrink-0",
                    active === c.id ? "bg-primary" : "bg-muted-foreground/40"
                  )}
                />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent/90 mb-2">{c.tag}</div>
              {active === c.id && <p className="text-sm text-muted-foreground leading-relaxed mt-2">{c.body}</p>}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 p-7 rounded-2xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 backdrop-blur-sm space-y-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">The pattern</div>
        <p className="text-base md:text-lg text-foreground/95 leading-relaxed">
          Across these cases, a shared structure emerges. Data centers acquire water rights under concession frameworks
          designed for historical demand patterns, frameworks that do not automatically adjust when hydrological
          conditions deteriorate. Once granted, those concessions carry legal standing that typically survives drought
          conditions, regulatory recommendations, and community opposition alike. The result is not accidental: it is
          a governance architecture in which industrial water use is insulated from the signals that would otherwise
          constrain it.
        </p>
        <p className="text-base md:text-lg text-foreground/95 leading-relaxed">
          What makes these cases geopolitically significant is not the volume of water involved (which remains, in
          aggregate, small relative to global withdrawals) but the concentration of that demand in specific watersheds,
          at specific moments, competing with agricultural and domestic users who lack equivalent legal protection. The
          water question in AI is, in this sense, a question about who holds the durable rights, who bears the residual
          risk, and whether the current framework for answering those questions was designed for the world that now
          exists.
        </p>
      </div>
    </SectionShell>
  );
}
