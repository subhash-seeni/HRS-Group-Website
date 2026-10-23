export interface FactItem {
  metric: string;
  label: string;
  detail: string;
}

export interface OperatingHub {
  city: string;
  role: string;
  address: string;
  coordinates?: string;
  facilities: string[];
}

export const keyFacts: FactItem[] = [
  {
    metric: '13',
    label: 'Real estate developments',
    detail: 'Residential communities, plotted layouts, and commercial hubs developed by Hrishikesh Ventures in Ahmedabad.',
  },
  {
    metric: '11',
    label: 'BOGO category brands',
    detail: 'Specialised consumer brands covering essentials, organics, healthcare, pet nutrition, and educational tools.',
  },
  {
    metric: '13',
    label: 'Consumer packaged brands',
    detail: 'Active and reserved brands managed by Hrishikesh Consumer Products across grocery, beverages, and daily home goods.',
  },
  {
    metric: '18k',
    label: 'Sq m monthly facade output',
    detail: 'High-precision aluminium and unitised curtain wall fabrication capacity at the HRS Aluglaze Sanand plant.',
  },
  {
    metric: '3',
    label: 'Technical education tracks',
    detail: 'Formal curricula for students, site fabricators, and architects at the School of Facade Technologies.',
  },
  {
    metric: '2',
    label: 'Industrial processing hubs',
    detail: 'Dedicated manufacturing campuses in Sanand (engineered facades) and Bavla (spice milling and clean packaging).',
  },
];

export const operatingHubs: OperatingHub[] = [
  {
    city: 'Ahmedabad',
    role: 'Corporate Headquarters & Western Hub',
    address: 'Bodakdev, Near SG Highway, Ahmedabad, Gujarat 380054',
    facilities: [
      'Corporate Executive Offices',
      'HRS Aluglaze Manufacturing Plant (Sanand)',
      'Hrishikesh Food Products Processing Mill (Bavla)',
      'Hrishikesh Ventures Project Development Offices',
      'School of Facade Technologies Practical Workshop',
    ],
  },
  {
    city: 'Bengaluru',
    role: 'Southern Regional Hub & Hospitality Division',
    address: 'Kadubeesanahalli, Outer Ring Road, Bengaluru, Karnataka 560103',
    facilities: [
      'Geotrix Facade Engineering Operations',
      'Flight Stays Serviced Corporate Apartments',
      'Amuktamalyada Telugu Dining Establishment',
      'Southern Commercial Leasing Management Desk',
    ],
  },
];

export const groupValues = [
  {
    name: 'Faith',
    description: 'Holding conviction in long-term goals and respecting enduring community traditions.',
  },
  {
    name: 'Trust',
    description: 'Maintaining transparent contracts, engineering integrity, and dependable trade relationships.',
  },
  {
    name: 'Foundation',
    description: 'Investing in physical capital, owned land parcels, and precision manufacturing facilities.',
  },
  {
    name: 'People',
    description: 'Providing steady technical training, fair workplace safety, and professional dignity.',
  },
  {
    name: 'Process',
    description: 'Standardising precision tolerances, audited food hygiene, and disciplined operating frameworks.',
  },
  {
    name: 'Service',
    description: 'Delivering punctual civil completions, dependable retail availability, and sincere hospitality.',
  },
];

export const calmFacts: FactItem[] = [
  {
    metric: '22',
    label: 'Years in operation',
    detail: 'Founded in Ahmedabad, building foundational businesses across western India.',
  },
  {
    metric: '13',
    label: 'Developments delivered',
    detail: 'Residential communities, plotted layouts, and commercial hubs across Gujarat.',
  },
  {
    metric: '850+',
    label: 'People employed',
    detail: 'Engineers, fabricators, operational managers, and retail specialists.',
  },
  {
    metric: '4',
    label: 'Cities served',
    detail: 'Active operating footprints in Ahmedabad, Sanand, Bavla, and Bengaluru.',
  },
];

export const aboutStory = [
  'Founded in Ahmedabad, HRS Group began as a regional real estate development firm focused on planned residential communities across western Gujarat. Over two decades, disciplined capital allocation and direct operating control enabled expansion from land development into architectural building envelopes, advanced manufacturing, and consumer distribution.',
  'Today, our manufacturing facilities in Sanand fabricate advanced unitised curtain walls for commercial towers across western and southern India, while our food processing mill in Bavla blends and packages spices to international food safety standards. Each venture operates with dedicated sector leadership while drawing on shared group systems.',
  'We remain an owner-led enterprise committed to long-term physical assets, dependable commercial contracts, and community trust. From neighbourhood retail destinations to technical education, our businesses are built to serve enduring everyday needs.',
];

export default {
  keyFacts,
  operatingHubs,
  groupValues,
  calmFacts,
  aboutStory,
};
