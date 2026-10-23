export interface Entity {
  slug: string;
  name: string;
  shortName?: string;
  sector: string;
  summary: string;
  audience: string;
  status: string;
  url: string;
  logoPath?: string;
  imagePath?: string;
  accentColor: string;
  details?: Record<string, any>;
}

export const entities: Entity[] = [
  // BUILT ENVIRONMENT
  {
    slug: 'hrishikesh-ventures',
    name: 'Hrishikesh Ventures',
    shortName: 'Ventures',
    sector: 'built-environment',
    summary:
      'Real estate developer focused on planned residential communities and commercial centres in Ahmedabad. Portfolio encompasses 13 developments: H1, H2, H3, H4, H6, H7, H10, W1, Kishor Park, Hrishikesh Villa, commercial hubs Hrishikesh 1, Hrishikesh 2, Hrishikesh 3, and joint venture H9.',
    audience: 'Homebuyers, commercial occupiers, property investors',
    status: 'Active development',
    url: '/businesses#hrishikesh-ventures',
    logoPath: '/logos/hrishikesh-ventures.svg',
    accentColor: '#207543',
    details: {
      developments: [
        'H1',
        'H2',
        'H3',
        'H4',
        'H6',
        'H7',
        'H10',
        'W1',
        'Kishor Park',
        'Hrishikesh Villa',
        'Hrishikesh 1',
        'Hrishikesh 2',
        'Hrishikesh 3',
        'H9 (Joint Venture)',
      ],
      headquarters: 'Bodakdev, Ahmedabad',
    },
  },
  {
    slug: 'hrs-aluglaze',
    name: 'HRS Aluglaze Ltd',
    shortName: 'Aluglaze',
    sector: 'built-environment',
    summary:
      'Engineered facade and fenestration solutions for commercial towers, tech parks, and institutional developments. Operates high-precision aluminium fabrication, structural glazing, unitised curtain walls, and thermal window systems from its Sanand manufacturing facility.',
    audience: 'Developers, structural consultants, general contractors',
    status: 'Active operations',
    url: '/businesses#hrs-aluglaze',
    logoPath: '/logos/hrs-aluglaze.svg',
    accentColor: '#15852C',
    details: {
      facility: 'Sanand Industrial Estate, Gujarat',
      specialisms: ['Unitised Curtain Walls', 'Structural Glazing', 'Aluminium Windows & Doors'],
    },
  },
  {
    slug: 'geotrix',
    name: 'Geotrix Pvt. Ltd.',
    shortName: 'Geotrix',
    sector: 'built-environment',
    summary:
      'Southern India facade engineering and installation firm, acquired by HRS Aluglaze. Serves commercial construction, IT corridors, and architectural projects across Bengaluru, Hyderabad, and Chennai.',
    audience: 'South India developers, project management consultants, architects',
    status: 'Active operations',
    url: '/businesses#geotrix',
    logoPath: '/logos/geotrix.svg',
    accentColor: '#0E4EB8',
    details: {
      regionalOffice: 'Kadubeesanahalli, Outer Ring Road, Bengaluru',
      coverage: 'Karnataka, Telangana, Tamil Nadu',
    },
  },
  {
    slug: 'school-of-facade-technologies',
    name: 'School of Facade Technologies',
    shortName: 'SoFT',
    sector: 'built-environment',
    summary:
      'Dedicated facade and fenestration training institute offering structured technical education across three distinct streams: diploma programs for engineering students, field certification for site installers and fabricators, and advanced structural modules for practicing architects.',
    audience: 'Engineering students, site fabricators, practicing architects and consultants',
    status: 'Active admissions',
    url: '/businesses#school-of-facade-technologies',
    logoPath: '/logos/school-of-facade-technologies.svg',
    accentColor: '#149395',
    details: {
      tracks: [
        'Students & Fresh Graduates (Diploma & Certificate)',
        'Site Installers & Fabricators (Field Certification)',
        'Architects & Structural Engineers (Advanced Practice)',
      ],
    },
  },

  // RETAIL
  {
    slug: 'bogo',
    name: 'BOGO',
    shortName: 'BOGO',
    sector: 'retail',
    summary:
      'Modern connected retail ecosystem bringing together three scalable store formats, eleven specialised category brands, direct stockist distribution through BOGO Go, and integrated customer membership programmes.',
    audience: 'Everyday consumers, urban families, retail partners, corporate employers',
    status: 'Flagship launch & expansion',
    url: '/bogo',
    logoPath: '/bogo/logos/bogo-master.png',
    imagePath: '/bogo/stores/bogo-square-concept.webp',
    accentColor: '#F58A33',
    details: {
      formats: ['BOGO Square (Flagship)', 'BOGO Bazaar (4,000–6,000 sq ft)', 'BOGO Mini (~2,000 sq ft)'],
      brandsCount: 11,
      mindset: 'Bonds Over Generations, Often',
    },
  },

  // FOOD AND CONSUMER
  {
    slug: 'hrishikesh-food-products',
    name: 'Hrishikesh Food Products',
    shortName: 'Food Products',
    sector: 'food-and-consumer',
    summary:
      'Processing, milling, and spice blending company with facilities in Bavla, Gujarat. Delivers whole spices, ground masalas, and custom seasoning mixes across three operational models: contract job work, institutional white labelling, and proprietary consumer packaged goods.',
    audience: 'FMCG brand owners, retail distributors, institutional food buyers',
    status: 'Active manufacturing',
    url: '/businesses#hrishikesh-food-products',
    logoPath: '/logos/hrishikesh-food-products.svg',
    accentColor: '#EB7C20',
    details: {
      facility: 'Bavla, Ahmedabad District, Gujarat',
      models: ['Contract Job Work', 'White Label Packaging', 'Proprietary Retail Blends'],
    },
  },
  {
    slug: 'hrishikesh-consumer-products',
    name: 'Hrishikesh Consumer Products',
    shortName: 'Consumer Products',
    sector: 'food-and-consumer',
    summary:
      'Fast-moving consumer goods company managing a portfolio of 13 dedicated brands. Active lines comprise Manpras (neighbourhood grocery and packaged staples), Snackshot (namkeen and savory snacks), Antrah (mouth fresheners), Basic Essentials (household paper products), Gush (packaged drinking water), and Daily Pump (functional beverages). Upcoming reserved brands include Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Purple Cow, Defumes, and Raspberry Rhinoceros.',
    audience: 'Grocery retailers, modern trade partners, everyday households',
    status: 'Active distribution',
    url: '/businesses#hrishikesh-consumer-products',
    logoPath: '/logos/hrishikesh-consumer-products.svg',
    accentColor: '#DF2B6B',
    details: {
      activeBrands: [
        'Manpras',
        'Snackshot',
        'Antrah',
        'Basic Essentials',
        'Gush',
        'Daily Pump',
      ],
      upcomingBrands: [
        'Biscbite',
        'Mood Beans',
        'The Frozen Palette',
        'The Nut Tribe',
        'Purple Cow',
        'Defumes',
        'Raspberry Rhinoceros',
      ],
    },
  },

  // HOSPITALITY AND LEASING
  {
    slug: 'firstgen',
    name: 'FirstGen Pvt. Ltd.',
    shortName: 'FirstGen',
    sector: 'hospitality-and-leasing',
    summary:
      'Corporate parent entity overseeing asset leasing, hospitality operations, and building trade retail. Operates as an administrative and capital umbrella; public operations trade under their respective division names.',
    audience: 'Commercial lessees, corporate partners, hospitality guests',
    status: 'Active holding',
    url: '/businesses#firstgen',
    logoPath: '/logos/firstgen.svg',
    accentColor: '#13477A',
    details: {
      divisions: ['FirstGen Assets', 'FirstGen Hotels', 'FirstGen Enterprises'],
    },
  },
  {
    slug: 'firstgen-assets',
    name: 'FirstGen Assets',
    shortName: 'Assets',
    sector: 'hospitality-and-leasing',
    summary:
      'Property leasing and equipment management division holding prime commercial office spaces, ground-floor retail units, industrial logistics warehousing, and heavy civil construction machinery across Ahmedabad and Bengaluru.',
    audience: 'Corporate occupiers, retail tenants, logistics operators, civil contractors',
    status: 'Active leasing',
    url: '/businesses#firstgen-assets',
    logoPath: '/logos/firstgen-assets.svg',
    accentColor: '#1B2754',
    details: {
      assetClasses: [
        'Commercial & Office Suites',
        'High-Street Retail Footprints',
        'Industrial Warehousing & Storage',
        'Heavy Equipment & Machinery',
      ],
    },
  },
  {
    slug: 'firstgen-hotels',
    name: 'FirstGen Hotels',
    shortName: 'Hotels',
    sector: 'hospitality-and-leasing',
    summary:
      'Regional hospitality operator running Flight Stays serviced corporate apartments in Kadubeesanahalli, Bengaluru, and Amuktamalyada, an authentic Telugu vegetarian tiffin and meals restaurant situated on Outer Ring Road, Bengaluru.',
    audience: 'Corporate relocations, visiting executives, regional food enthusiasts',
    status: 'Active operations',
    url: '/businesses#firstgen-hotels',
    logoPath: '/logos/firstgen-hotels.svg',
    accentColor: '#BD5B21',
    details: {
      properties: [
        'Flight Stays (Serviced Apartments, Kadubeesanahalli, Bengaluru)',
        'Amuktamalyada (Telugu Tiffin & Dining, Outer Ring Road, Bengaluru)',
      ],
    },
  },
  {
    slug: 'firstgen-enterprises',
    name: 'FirstGen Enterprises',
    shortName: 'Enterprises',
    sector: 'hospitality-and-leasing',
    summary:
      'Building trade retail and collaboration venture operating The Bluprint by Builders Cafe (hybrid co-working space, cafe, and material experience centre for construction professionals) and ShubhVista (curated showroom for building materials, architectural hardware, and sanitary fittings).',
    audience: 'Architects, interior designers, civil contractors, structural engineers',
    status: 'Active operations',
    url: '/businesses#firstgen-enterprises',
    logoPath: '/logos/firstgen-enterprises.svg',
    accentColor: '#227B92',
    details: {
      ventures: [
        'The Bluprint by Builders Cafe (Co-working, Cafe & Material Experience Centre)',
        'ShubhVista (Architectural Materials & Fittings Showroom)',
      ],
    },
  },

  // SERVICES
  {
    slug: 'indian-brand-house',
    name: 'Indian Brand House',
    shortName: 'Brand House',
    sector: 'services',
    summary:
      'Independent brand communications and growth agency. Delivers brand strategy and identity design, creative content production, and digital performance marketing for HRS Group operating entities and external commercial enterprises.',
    audience: 'Enterprise leaders, emerging consumer brands, B2B corporations',
    status: 'Active client retainers',
    url: '/businesses#indian-brand-house',
    logoPath: '/logos/indian-brand-house.svg',
    accentColor: '#EA5735',
    details: {
      practices: [
        'Strategy & Visual Identity',
        'Creative & Content Production',
        'Digital & Performance Marketing',
      ],
    },
  },
];

export default entities;
