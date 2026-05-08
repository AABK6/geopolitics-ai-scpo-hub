(function () {
  const SITE_URL = 'https://geopoliticsofai.org';
  const SITE_NAME = 'Geopolitics of AI';
  const DEFAULT_IMAGE = `${SITE_URL}/images/MareNostrum1.jpg`;
  const DEFAULT_IMAGE_ALT = 'MareNostrum supercomputer at the Barcelona Supercomputing Center, housed inside a former chapel.';

  const adrien = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#adrien-abecassis`,
    name: 'Adrien Abecassis',
    givenName: 'Adrien',
    familyName: 'Abecassis',
    url: `${SITE_URL}/#adrien-abecassis`,
    jobTitle: 'Director of Policy Initiatives',
    worksFor: {
      '@type': 'Organization',
      name: 'Paris Peace Forum',
      url: 'https://parispeaceforum.org/'
    },
    affiliation: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Sciences Po',
        url: 'https://www.sciencespo.fr/'
      },
      {
        '@type': 'Organization',
        name: 'Paris Peace Forum',
        url: 'https://parispeaceforum.org/'
      }
    ],
    knowsAbout: [
      'Artificial intelligence governance',
      'Geopolitics of artificial intelligence',
      'Digital sovereignty',
      'Technology and international affairs',
      'Global governance',
      'Digital infrastructure'
    ],
    subjectOf: [
      {
        '@type': 'CreativeWork',
        name: 'Global Governance of Digital Economy: Artificial Intelligence',
        url: 'https://cerre.eu/publications/global-governance-of-artificial-intelligence/'
      },
      {
        '@type': 'CreativeWork',
        name: 'A Blueprint for Multinational Advanced AI Development',
        url: 'https://parispeaceforum.org/press-releases/a-multinational-effort-needed-to-preserve-technological-sovereignty-on-advanced-ai/'
      }
    ]
  };

  const alexandre = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#alexandre-mirlesse`,
    name: 'Alexandre Mirlesse',
    givenName: 'Alexandre',
    familyName: 'Mirlesse',
    url: `${SITE_URL}/#alexandre-mirlesse`,
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Sciences Po',
      url: 'https://www.sciencespo.fr/'
    },
    knowsAbout: [
      'Geopolitics of artificial intelligence',
      'International relations',
      'Technology and world order'
    ]
  };

  const course = {
    '@type': 'Course',
    '@id': `${SITE_URL}/#course`,
    name: 'The Geopolitics of Artificial Intelligence',
    alternateName: 'Geopolitics of AI',
    description: 'A Sciences Po course on artificial intelligence, sovereignty, digital infrastructure, compute, chips, data centers, surveillance, industrial policy, and the future of world order.',
    url: `${SITE_URL}/`,
    provider: {
      '@type': 'CollegeOrUniversity',
      name: 'Sciences Po',
      url: 'https://www.sciencespo.fr/'
    },
    creator: [
      { '@id': `${SITE_URL}/#adrien-abecassis` },
      { '@id': `${SITE_URL}/#alexandre-mirlesse` }
    ],
    instructor: [
      { '@id': `${SITE_URL}/#adrien-abecassis` },
      { '@id': `${SITE_URL}/#alexandre-mirlesse` }
    ],
    educationalLevel: 'Graduate',
    about: [
      'Geopolitics of artificial intelligence',
      'AI sovereignty',
      'Digital infrastructure',
      'Compute governance',
      'AI industrial policy',
      'Technology and international relations'
    ]
  };

  const pages = {
    '/primer/module-01.html': {
      title: 'The Utopian Dawn | Cyber-Utopianism and the Geopolitics of AI',
      description: 'Module 1 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: cyber-utopianism, the Clintonian wager, internet freedom, and the early belief that digital openness would dissolve borders.',
      position: 1,
      keywords: ['cyber-utopianism', 'internet freedom', 'digital sovereignty', 'Clinton', 'geopolitics of AI']
    },
    '/primer/module-02.html': {
      title: 'The Rebuttal | China, Digital Sovereignty and the Geopolitics of AI',
      description: 'Module 2 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: China’s rebuttal to liberal internet universalism and the construction of a porous but policed digital sovereignty model.',
      position: 2,
      keywords: ['China', 'digital sovereignty', 'Great Firewall', 'internet governance', 'geopolitics of AI']
    },
    '/primer/module-03.html': {
      title: 'The Rupture | Snowden, Trust and Digital Infrastructure Sovereignty',
      description: 'Module 3 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: the Snowden revelations, the collapse of trust in global infrastructure, and the rise of defensive digital sovereignty.',
      position: 3,
      keywords: ['Snowden', 'digital infrastructure', 'surveillance', 'trust', 'sovereignty']
    },
    '/primer/module-04.html': {
      title: 'The Splinternet Accelerates | Fragmentation, Platforms and Digital Sovereignty',
      description: 'Module 4 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: the splinternet, technological fragmentation, sovereign stacks, and the end of seamless digital globalization.',
      position: 4,
      keywords: ['splinternet', 'technology fragmentation', 'platforms', 'digital sovereignty', 'internet governance']
    },
    '/primer/module-05.html': {
      title: 'Industrial Sovereignty | Compute, Energy and AI Infrastructure',
      description: 'Module 5 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: compute, energy, hardware, data centers, talent, and the physical production function behind frontier artificial intelligence.',
      position: 5,
      keywords: ['compute', 'energy', 'AI infrastructure', 'data centers', 'industrial sovereignty']
    },
    '/primer/module-06.html': {
      title: 'National Revival Through Tech | AI Industrial Policy and Techno-Nationalism',
      description: 'Module 6 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: techno-nationalism, industrial policy, chokepoints, and the return of state strategy in advanced technology.',
      position: 6,
      keywords: ['techno-nationalism', 'industrial policy', 'chokepoints', 'AI policy', 'state power']
    },
    '/primer/module-07.html': {
      title: 'New Ideological Map of AI | Realism, Accelerationism and AI Governance',
      description: 'Module 7 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: the ideological frames shaping AI policy, from state realism and democratic control to techno-accelerationism.',
      position: 7,
      keywords: ['AI governance', 'ideology', 'realism', 'accelerationism', 'AI policy']
    },
    '/primer/module-08.html': {
      title: 'The Collision of Frames | AI, Sovereignty and the Future of World Order',
      description: 'Module 8 of the Geopolitics of AI course by Adrien Abecassis and Alexandre Mirlesse: the collision between openness and enclosure, growth and legitimacy, state control and corporate power.',
      position: 8,
      keywords: ['AI geopolitics', 'world order', 'sovereignty', 'AI governance', 'corporate power']
    }
  };

  function currentPath() {
    let path = window.location.pathname || '/';
    path = path.replace(/\/index\.html$/, '/');
    return path;
  }

  function absoluteUrl(path) {
    if (path === '/') return `${SITE_URL}/`;
    return `${SITE_URL}${path}`;
  }

  function upsertMeta(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }

  function upsertLink(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('link');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }

  function appendJsonLd(id, payload) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(payload, null, 2);
    document.head.appendChild(script);
  }

  function applySEO(pagePath, config) {
    const url = absoluteUrl(pagePath);
    document.title = config.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: config.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' });
    upsertMeta('meta[name="author"]', { name: 'author', content: 'Adrien Abecassis, Alexandre Mirlesse' });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: config.keywords.join(', ') });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url });
    upsertLink('link[rel="manifest"]', { rel: 'manifest', href: `${SITE_URL}/site.webmanifest` });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: config.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: config.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: DEFAULT_IMAGE_ALT });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: config.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: config.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: DEFAULT_IMAGE_ALT });

    appendJsonLd('seo-runtime-graph', {
      '@context': 'https://schema.org',
      '@graph': [
        adrien,
        alexandre,
        course,
        {
          '@type': ['LearningResource', 'Article'],
          '@id': `${url}#learning-resource`,
          name: config.title,
          headline: config.title,
          description: config.description,
          url,
          position: config.position,
          image: {
            '@type': 'ImageObject',
            url: DEFAULT_IMAGE,
            caption: DEFAULT_IMAGE_ALT
          },
          isPartOf: { '@id': `${SITE_URL}/#course` },
          mainEntityOfPage: url,
          creator: [
            { '@id': `${SITE_URL}/#adrien-abecassis` },
            { '@id': `${SITE_URL}/#alexandre-mirlesse` }
          ],
          author: [
            { '@id': `${SITE_URL}/#adrien-abecassis` },
            { '@id': `${SITE_URL}/#alexandre-mirlesse` }
          ],
          educationalLevel: 'Graduate',
          about: config.keywords,
          keywords: config.keywords.join(', ')
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumbs`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: SITE_NAME,
              item: `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Modules and Projects',
              item: `${SITE_URL}/magazine.html`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: config.title,
              item: url
            }
          ]
        }
      ]
    });
  }

  const pagePath = currentPath();
  const config = pages[pagePath];
  if (config) applySEO(pagePath, config);
})();
