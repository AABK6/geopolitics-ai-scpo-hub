const refs: { year: string; citation: string; source: string }[] = [
  {
    year: "2023",
    citation:
      "Li, Pengfei, Jianyi Yang, Mohammad A. Islam, and Shaolei Ren. \u201cMaking AI Less \u2018Thirsty\u2019: Uncovering and Addressing the Secret Water Footprint of AI Models.\u201d Preprint, submitted April 6, 2023. arXiv:2304.03271.",
    source: "arXiv",
  },
  {
    year: "2024",
    citation:
      "Shehabi, Arman, Sarah J. Smith, Alex Hubbard, Alex Newkirk, Nuoa Lei, Md Abu Bakar Siddik, Billie Holecek, Jonathan Koomey, Eric Masanet, and Dale Sartor. 2024 United States Data Center Energy Usage Report. LBNL-2001637. Berkeley, CA: Lawrence Berkeley National Laboratory, 2024.",
    source: "LBNL",
  },
  {
    year: "2025",
    citation:
      "Lei, Nuoa, Hangxin Lu, Arman Shehabi, and Eric Masanet. \u201cThe Water Use of Data Center Workloads: A Review and Assessment of Key Determinants.\u201d Resources, Conservation & Recycling 213 (2025): 107498. Amsterdam: Elsevier.",
    source: "Elsevier",
  },
  {
    year: "2022",
    citation:
      "Lei, Nuoa, and Eric Masanet. \u201cClimate- and Technology-Specific PUE and WUE Estimations for U.S. Data Centers Using a Hybrid Statistical and Thermodynamics-Based Approach.\u201d Resources, Conservation & Recycling 182 (2022): 106323. Amsterdam: Elsevier.",
    source: "Elsevier",
  },
  {
    year: "2022",
    citation:
      "Karimi, Lida, Lauren Yarholar, Reed Miller, and David Allen. \u201cWater-Energy Tradeoffs in Data Centers: A Case Study in Hot-Arid Climates.\u201d Resources, Conservation & Recycling 181 (2022): 106194. Amsterdam: Elsevier.",
    source: "Elsevier",
  },
  {
    year: "2026",
    citation:
      "Privette, Christopher. \u201cData Centers\u2019 Water Footprint: The Need for More Transparency.\u201d Earth\u2019s Future 14, no. 1 (2026). Washington, DC: American Geophysical Union (AGU Publications).",
    source: "AGU",
  },
  {
    year: "2026",
    citation:
      "Barnett-Itzhaki, Zohar. \u201cThe Water Footprint of Artificial Intelligence: Emerging Solutions and Governance Imperatives.\u201d Water Research 268 (2026). Amsterdam: Elsevier.",
    source: "Water Research",
  },
  {
    year: "2021",
    citation:
      "Uptime Institute. 2021 Global Data Center Survey. New York: Uptime Institute, 2021.",
    source: "Industry survey",
  },
  {
    year: "2024",
    citation:
      "Google. Google 2024 Environmental Report. Mountain View, CA: Google LLC, 2024. https://sustainability.google/reports/.",
    source: "Corporate report",
  },
  {
    year: "2024",
    citation:
      "Microsoft Corporation. 2024 Environmental Sustainability Report. Redmond, WA: Microsoft, 2024. https://www.microsoft.com/corporate-responsibility/sustainability/report.",
    source: "Corporate report",
  },
  {
    year: "2024",
    citation:
      "Meta Platforms, Inc. 2024 Sustainability Report. Menlo Park, CA: Meta Platforms, 2024. https://sustainability.atmeta.com/.",
    source: "Corporate report",
  },
  {
    year: "2011",
    citation:
      "Patterson, Michael, Dan Azevedo, Christian Belady, and Jack Pouchet. Water Usage Effectiveness (WUE): A Green Grid Data Center Sustainability Metric. White Paper #35. Beaverton, OR: The Green Grid, 2011.",
    source: "Standards body",
  },
  {
    year: "2024",
    citation:
      "Li, Pengfei, Jianyi Yang, Adam Wierman, and Shaolei Ren. \u201cTowards Environmentally Equitable AI via Geographical Load Balancing.\u201d In Proceedings of the 15th ACM International Conference on Future and Sustainable Energy Systems (e-Energy \u201924), 291\u2013307. New York: Association for Computing Machinery, 2024.",
    source: "ACM",
  },
  {
    year: "2024",
    citation:
      "MSCI ESG Research. Data Centers and Water Stress: Exposure to 2050. New York: MSCI Inc., 2024.",
    source: "Investor research",
  },
  {
    year: "2026",
    citation:
      "World Economic Forum. \u201cAI and Water: Why the Tech Industry\u2019s Thirst Matters at Davos.\u201d In partnership with Xylem Inc. Geneva: World Economic Forum, January 2026. https://www.weforum.org/.",
    source: "WEF",
  },
  {
    year: "2025",
    citation:
      "Yale Center for Business and the Environment. Regulating the Digital Giants: Policy and Public Responses to the Data Center Boom. New Haven, CT: Yale University, November 2025.",
    source: "Yale",
  },
  {
    year: "2025",
    citation:
      "UK Government, Central Digital and Data Office. \u201cAI\u2019s Thirst for Water.\u201d Sustainable ICT Blog, GOV.UK, 2025. https://www.gov.uk/.",
    source: "Government",
  },
  {
    year: "2024",
    citation:
      "Crawford, Kate. \u201cAI\u2019s Excessive Water Consumption Threatens to Drown Out Its Environmental Contributions.\u201d The Conversation, March 2024. https://theconversation.com/.",
    source: "Press",
  },
  {
    year: "2024",
    citation:
      "Food & Water Watch. The Hidden Water Costs of Data Centers. Washington, DC: Food & Water Watch, 2024.",
    source: "NGO",
  },
  {
    year: "n.d.",
    citation:
      "AI Drinks Water Project. \u201cOpen Dataset and Visualization of Data Center Water Use.\u201d Accessed 2026. https://aidrinkswater.com/.",
    source: "Dataset",
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-card/40 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Bibliography</div>
            <h2 className="font-display font-light text-4xl md:text-5xl leading-tight mb-6">Works Cited</h2>
          </div>
          <ul className="divide-y divide-border">
            {refs.map((r, i) => (
              <li
                key={i}
                className="py-5 grid md:grid-cols-[70px_1fr_140px] gap-2 md:gap-6 items-baseline"
              >
                <span className="font-mono text-xs text-primary">{r.year}</span>
                <span className="text-sm text-foreground/90 leading-relaxed">{r.citation}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 md:text-right">
                  {r.source}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} · The Invisible Thirst</span>
          <span>An editorial essay on AI, water &amp; governance</span>
        </div>
      </div>
    </footer>
  );
}
