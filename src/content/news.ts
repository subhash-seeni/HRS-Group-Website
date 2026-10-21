import { NewsItem } from './types';

export const news: NewsItem[] = [
  {
    slug: 'soft-curriculum-framework',
    title: 'School of Facade Technologies announces vocational certification curriculum',
    date: '14 September 2026',
    entitySlug: 'school-of-facade-technologies',
    category: 'Built Environment',
    featured: true,
    readTime: '4 min read',
    summary:
      'The curriculum outlines modules covering structural silicone application, wind-load resistance calculations, and double-glazed unit testing for installers and engineering trainees.',
    content: [
      'The School of Facade Technologies (SoFT), established adjacent to HRS Aluglaze’s Sanand manufacturing facility, has formally launched its three-tier vocational syllabus for the 2026–2027 academic session.',
      'Designed to bridge the acute technical skills deficit across the Indian fenestration and building envelope sector, the curriculum is divided into three distinct tracks: students and fresh diploma holders, site installers and fabricators, and practicing architects and facade structural consultants.',
      'Trainees spend equal time in theoretical classrooms and on calibrated test bays equipped with dynamic pressure water test chambers, structural adhesive metering pumps, and crane lifting simulators.',
      'Every course incorporates mandatory occupational health and safety protocols, including working at height safety rigging, glass handling techniques, and precision laser alignment.',
    ],
    pullQuote: {
      text: 'Practical trade education on the factory floor creates measurable structural integrity on high-rise construction sites.',
      author: 'Technical Director, School of Facade Technologies',
    },
    relatedSlugs: ['hrs-aluglaze-bengaluru-delivery', 'facade-centre-bengaluru-expansion'],
  },
  {
    slug: 'hrs-aluglaze-bengaluru-delivery',
    title: 'Geotrix completes facade installation for Outer Ring Road commercial campus',
    date: '02 August 2026',
    entitySlug: 'geotrix',
    category: 'Built Environment',
    readTime: '3 min read',
    summary:
      'The 24,000 square metre installation includes solar-control double glazing and thermal-break aluminium extrusions engineered in Sanand and erected by the Bengaluru team.',
    content: [
      'Geotrix Pvt. Ltd., the southern India operating division of HRS Aluglaze, has achieved practical completion on the external envelope for an institutional office campus situated along the Outer Ring Road in Bengaluru.',
      'The scope comprised 24,000 square metres of unitised curtain wall panels fabricated at the Sanand manufacturing plant in Gujarat and transported in custom timber stillages directly to site.',
      'The system incorporates thermally broken aluminium profiles with double-glazed low-emissivity glass units designed to attenuate solar radiation while preserving high visible light transmission.',
    ],
    pullQuote: {
      text: 'Executing unitised envelopes in dense tech corridors requires tight logistics sequencing between Ahmedabad fabrication lines and Bengaluru crawler cranes.',
      author: 'Regional Project Lead, Geotrix',
    },
    relatedSlugs: ['soft-curriculum-framework', 'facade-centre-bengaluru-expansion'],
  },
  {
    slug: 'hrishikesh-ventures-h2-handover',
    title: 'Hrishikesh Ventures completes handover of H2 residential development in Shela',
    date: '18 June 2026',
    entitySlug: 'hrishikesh-ventures',
    category: 'Built Environment',
    readTime: '3 min read',
    summary:
      'All 72 apartments have received municipal occupancy certificates following completion of civil work, stormwater connections, and internal garden landscaping.',
    content: [
      'Hrishikesh Ventures has completed official possession formalities for all 72 apartments at H2, its residential mid-rise development in the Shela extension of western Ahmedabad.',
      'The scheme features 3-BHK residences with cross-ventilated layouts, rainwater harvesting pits connected to underground percolation wells, and dedicated basement car parking.',
      'With final completion certificates issued by the municipal planning authority, over 60 homeowner families have commenced interior fit-outs.',
    ],
    relatedSlugs: ['hrishikesh-commercial-3-groundbreaking', 'kishor-park-infrastructure-upgrade'],
  },
  {
    slug: 'bavla-cryogenic-milling-line',
    title: 'Hrishikesh Food Products commissions second milling line at Bavla plant',
    date: '10 May 2026',
    entitySlug: 'hrishikesh-food-products',
    category: 'Food and Consumer',
    readTime: '3 min read',
    summary:
      'The new closed-circuit cryogenic grinding unit doubles production capacity for single-origin turmeric and coriander powders packaged for private labels.',
    content: [
      'Hrishikesh Food Products has placed into continuous production its second cryogenic spice grinding line at the Bavla processing complex on National Highway 8A.',
      'The installation maintains grinding temperatures below -30 degrees Celsius through regulated liquid nitrogen injection, preventing the vaporization of volatile essential oils that give spices their culinary aroma and potency.',
      'The line effectively doubles contract packing capacity for private label supermarket partners across western and northern India.',
    ],
    pullQuote: {
      text: 'Low-temperature processing preserves volatile oil fractions that standard hammer mills destroy through frictional heating.',
      author: 'Plant Operations Head, Bavla Processing Facility',
    },
    relatedSlugs: ['manpras-retail-network-ahmedabad', 'antrah-snack-range-launch'],
  },
  {
    slug: 'manpras-retail-network-ahmedabad',
    title: 'Manpras expands neighbourhood grocery store network across western Ahmedabad',
    date: '12 April 2026',
    entitySlug: 'hrishikesh-consumer-products',
    category: 'Food and Consumer',
    readTime: '2 min read',
    summary:
      'Two new neighbourhood convenience outlets open in South Bopal and Gota, stocking daily essentials, dairy, fresh vegetables, and packaged Manpras spices.',
    content: [
      'Manpras, the consumer goods and retail arm of Hrishikesh Consumer Products, has expanded its neighbourhood footprint with two stores situated in South Bopal and Gota.',
      'Designed as community retail hubs, each store provides fresh daily vegetables sourced directly from regional farming clusters, dairy products, household staples, and the complete range of cold-ground Manpras whole and powdered spices.',
    ],
    relatedSlugs: ['bavla-cryogenic-milling-line', 'antrah-snack-range-launch'],
  },
  {
    slug: 'flight-stays-bengaluru-milestone',
    title: 'Flight Stays reports sustained 88% occupancy in Bengaluru tech corridor',
    date: '28 March 2026',
    entitySlug: 'firstgen-hotels',
    category: 'Hospitality and Retail',
    readTime: '2 min read',
    summary:
      'FirstGen Hotels reports continued demand for premium serviced corporate apartments along the Outer Ring Road from technology and consulting teams.',
    content: [
      'Flight Stays, the extended-stay hospitality brand managed by FirstGen Hotels, recorded an average monthly occupancy rate of 88% during the fourth quarter of the financial year.',
      'Located in Kadubeesanahalli adjacent to prime software technology parks, the property provides fully furnished serviced suites with high-speed leased line connectivity and kitchenettes for long-term project teams.',
    ],
    relatedSlugs: ['amuktamalyada-traditional-tiffin-menu', 'the-bluprint-coworking-milestone'],
  },
  {
    slug: 'amuktamalyada-traditional-tiffin-menu',
    title: 'Amuktamalyada introduces regional Andhra & Rayalaseema breakfast specialties',
    date: '15 February 2026',
    entitySlug: 'firstgen-hotels',
    category: 'Hospitality and Retail',
    readTime: '3 min read',
    summary:
      'The Outer Ring Road dining destination refines its morning breakfast service with authentic wood-fired pesarattu, upma, and Guntur chilli chutneys.',
    content: [
      'Amuktamalyada, the South Indian vegetarian dining establishment operated by FirstGen Hotels on Bengaluru’s Outer Ring Road, has refreshed its morning breakfast service.',
      'The menu emphasizes authentic Telugu culinary practices, serving freshly made Andhra gare with ginger chutney, MLA pesarattu layered with upma, and traditional filter coffee roasted from single-estate Chikmagalur beans.',
    ],
    relatedSlugs: ['flight-stays-bengaluru-milestone', 'the-bluprint-coworking-milestone'],
  },
  {
    slug: 'hrs-group-cwct-certification',
    title: 'HRS Aluglaze receives renewed CWCT international laboratory accreditation',
    date: '18 January 2026',
    entitySlug: 'hrs-aluglaze',
    category: 'Events and Awards',
    readTime: '3 min read',
    summary:
      'Independent laboratory audit verifies compliance of Sanand unitised curtain wall profiles with Centre for Window and Cladding Technology standards.',
    content: [
      'HRS Aluglaze Ltd has received renewed third-party accreditation from the Centre for Window and Cladding Technology (CWCT) for its flagship unitised and semi-unitised facade assemblies.',
      'Testing conducted at certified test facilities verified zero water leakage at pressure differentials exceeding 600 Pascals and dynamic wind load resistance up to 3.0 kilo-Newtons per square metre.',
    ],
    relatedSlugs: ['soft-curriculum-framework', 'hrs-aluglaze-bengaluru-delivery'],
  },
  {
    slug: 'the-bluprint-coworking-milestone',
    title: 'The Bluprint by Builders Cafe expands material experience centre in Ahmedabad',
    date: '05 January 2026',
    entitySlug: 'firstgen-enterprises',
    category: 'Hospitality and Retail',
    readTime: '2 min read',
    summary:
      'New wing showcases architectural hardware, aluminium extrusion profiles, and acoustic panels alongside collaborative workspaces for designers.',
    content: [
      'FirstGen Enterprises has completed an architectural expansion of The Bluprint by Builders Cafe on SG Highway.',
      'The hybrid space integrates specialty coffee hospitality, dedicated private desk suites, and a tactile library of architectural materials and fenestration mock-ups for visiting architects and interior consultants.',
    ],
    relatedSlugs: ['flight-stays-bengaluru-milestone', 'amuktamalyada-traditional-tiffin-menu'],
  },
  {
    slug: 'hrishikesh-commercial-3-groundbreaking',
    title: 'Hrishikesh Ventures initiates foundation works for Hrishikesh 3 commercial hub',
    date: '12 December 2025',
    entitySlug: 'hrishikesh-ventures',
    category: 'Built Environment',
    readTime: '3 min read',
    summary:
      'Ground engineering commences on 12-storey commercial office project on SG Highway, featuring energy-efficient glazing by HRS Aluglaze.',
    content: [
      'Civil contractors have initiated diaphragm wall and piling operations for Hrishikesh 3, a 12-storey Grade-A commercial office tower located in western Ahmedabad.',
      'The tower design integrates structural envelope engineering from HRS Aluglaze, high-speed passenger elevators, and multi-tier basement vehicle parking.',
    ],
    relatedSlugs: ['hrishikesh-ventures-h2-handover', 'kishor-park-infrastructure-upgrade'],
  },
  {
    slug: 'indian-brand-house-design-award',
    title: 'Indian Brand House recognized at National Packaging Design Forum',
    date: '20 November 2025',
    entitySlug: 'indian-brand-house',
    category: 'Events and Awards',
    readTime: '2 min read',
    summary:
      'Identity and sustainable packaging work for regional agro-commodity brands receives distinction for typographic discipline and shelf impact.',
    content: [
      'Indian Brand House was recognized with a citation of excellence at the National Packaging Design Forum for its visual identity and packaging system for regional agro-commodity labels.',
      'The judging panel commended the agency for its functional clarity, elimination of visual clutter, and strict compliance with statutory font legibility standards.',
    ],
    relatedSlugs: ['soft-curriculum-framework', 'hrs-group-cwct-certification'],
  },
  {
    slug: 'hrs-group-annual-governance-review',
    title: 'HRS Group publishes 2025–2026 Annual Operational Governance Statement',
    date: '10 November 2025',
    entitySlug: 'firstgen',
    category: 'Group',
    readTime: '4 min read',
    summary:
      'Group board reviews operational consolidation across eight entities, statutory compliance reports, and capital allocations for manufacturing.',
    content: [
      'The board of directors of HRS Group convened in Bodakdev, Ahmedabad, for the annual operational review encompassing all eight operating businesses.',
      'Key review points included the operational commissioning of cryogenic milling infrastructure at Bavla, expanded fabrication capacity at Sanand, and institutional growth of the School of Facade Technologies.',
      'The board reaffirmed its strict non-speculative growth philosophy, emphasizing technical capital depth and client satisfaction over leveraged expansion.',
    ],
    relatedSlugs: ['hrs-group-cwct-certification', 'soft-curriculum-framework'],
  },
];
