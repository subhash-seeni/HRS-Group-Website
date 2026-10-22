export interface SectorStructure {
  name: string;
  description: string;
  entities: {
    name: string;
    slug: string;
    role: string;
    indent?: boolean;
  }[];
}

export interface AboutContent {
  statement: string;
  curiosityHook?: string;
  story: string[];
  structure: {
    groupName: string;
    registeredOffice: string;
    sectors: SectorStructure[];
  };
}

export const aboutContent: AboutContent = {
  statement: 'Sixteen years of <em>patient</em> building.',
  curiosityHook: 'How eight independent companies grew from a single discipline in Ahmedabad.',
  story: [
    'HRS Group began operations in Ahmedabad in 2008 with the establishment of Hrishikesh Ventures. Grounded in the commercial discipline of western Gujarat, the business concentrated on residential and commercial developments along expanding transport corridors including SG Highway, Ambli Road, and Science City.',
    'As regional commercial construction demanded higher specifications for building envelopes, the group established HRS Aluglaze Ltd in 2012. Production was centered at a dedicated 120,000 sq ft manufacturing facility in the Sanand Industrial Estate, introducing multi-axis CNC milling, precision double-miter cutting, and automated silicone glazing to regional contractors.',
    'In 2016, the group diversified into food processing with Hrishikesh Food Products, commissioning low-temperature spice milling and contract packaging facilities in Bavla. This was followed by the launch of Hrishikesh Consumer Products, managing neighbourhood grocery retail and 13 packaged consumer trade marks.',
    'Regional expansion into South India began in 2019 with the acquisition of Geotrix Pvt. Ltd. in Bengaluru, establishing an engineering and installation hub for major commercial facade contracts across Karnataka and Tamil Nadu. In 2021, FirstGen Pvt. Ltd. was incorporated to coordinate commercial asset leasing, serviced residences, and trade retail.',
    'Today, HRS Group operates as a parent enterprise providing central governance, capital allocation, and operational standards. Each operating company retains autonomous technical leadership, maintaining direct accountability to customers, project partners, and regulatory authorities.',
  ],
  structure: {
    groupName: 'HRS Group',
    registeredOffice: 'Bodakdev, Ahmedabad, Gujarat',
    sectors: [
      {
        name: 'Built Environment',
        description: 'Architectural envelopes, property development, and vocational education',
        entities: [
          {
            name: 'Hrishikesh Ventures',
            slug: 'hrishikesh-ventures',
            role: 'Residential and commercial real estate development in western Ahmedabad',
          },
          {
            name: 'HRS Aluglaze Ltd',
            slug: 'hrs-aluglaze',
            role: 'Aluminium facade and curtain wall manufacturing at Sanand Industrial Estate',
          },
          {
            name: 'Geotrix Pvt. Ltd.',
            slug: 'geotrix',
            role: 'South India facade installation and site engineering division in Bengaluru',
            indent: true,
          },
          {
            name: 'School of Facade Technologies (SoFT)',
            slug: 'school-of-facade-technologies',
            role: 'Technical facade trade training and installer certification institute',
          },
        ],
      },
      {
        name: 'Food and Consumer',
        description: 'Contract food processing, spice milling, and consumer goods distribution',
        entities: [
          {
            name: 'Hrishikesh Food Products',
            slug: 'hrishikesh-food-products',
            role: 'Automated spice milling, blending, and contract pouch packaging in Bavla',
          },
          {
            name: 'Hrishikesh Consumer Products',
            slug: 'hrishikesh-consumer-products',
            role: 'Neighbourhood grocery retail and stewardship of 13 consumer product trade marks',
          },
        ],
      },
      {
        name: 'Hospitality, Leasing and Retail',
        description: 'Commercial real estate leasing, corporate residences, and trade venues',
        entities: [
          {
            name: 'FirstGen Pvt. Ltd.',
            slug: 'firstgen',
            role: 'Holding company overseeing operating divisions in Gujarat and Karnataka',
          },
          {
            name: 'FirstGen Assets',
            slug: 'firstgen-assets',
            role: 'Commercial office, warehouse, and contractor equipment leasing in Ahmedabad',
            indent: true,
          },
          {
            name: 'FirstGen Hotels',
            slug: 'firstgen-hotels',
            role: 'Flight Stays serviced residences and Amuktamalyada vegetarian dining in Bengaluru',
            indent: true,
          },
          {
            name: 'FirstGen Enterprises',
            slug: 'firstgen-enterprises',
            role: 'The Bluprint trade cafe and ShubhVista architectural retail in Ahmedabad',
            indent: true,
          },
        ],
      },
      {
        name: 'Services',
        description: 'Independent brand communications, packaging design, and performance media',
        entities: [
          {
            name: 'Indian Brand House',
            slug: 'indian-brand-house',
            role: 'Brand identity systems, packaging engineering, and corporate publishing studio',
          },
        ],
      },
    ],
  },
};
