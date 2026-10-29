import { Leader, Milestone, ValueItem } from './types';

export interface AboutContent {
  headline: string;
  subhead: string;
  story: string[];
}

export const aboutContent: AboutContent = {
  headline: 'Built in Ahmedabad, engineered for durability',
  subhead: 'How foundational operating businesses grew from a single discipline in western Gujarat.',
  story: [
    'HRS Group began operations in Ahmedabad in 2008 with the establishment of Hrishikesh Ventures. Grounded in the commercial discipline of western Gujarat, the business concentrated on residential and commercial developments along expanding transport corridors including SG Highway, Ambli Road, and Science City.',
    'As regional commercial construction demanded higher specifications for building envelopes, the group established HRS Aluglaze Ltd in 2012. Production was centered at a dedicated 120,000 sq ft manufacturing facility in the Sanand Industrial Estate, introducing multi-axis CNC milling, precision double-miter cutting, and automated silicone glazing to regional contractors.',
    'In 2016, the group diversified into food processing with Hrishikesh Food Products, commissioning low-temperature spice milling and contract packaging facilities in Bavla. This was followed by Hrishikesh Consumer Products, managing 13 packaged consumer trade marks and regional retail distribution.',
    'Regional expansion into South India began in 2019 with the acquisition of Geotrix Pvt. Ltd. in Bengaluru, establishing an engineering and installation hub for major commercial facade contracts across Karnataka and Tamil Nadu. In 2021, FirstGen Pvt. Ltd. was incorporated to coordinate commercial asset leasing, serviced residences, and trade retail.',
    'In 2024, the group unveiled BOGO, a modern multi-format retail ecosystem uniting destination department spaces, neighbourhood convenience formats, and eleven category brands across Gujarat.',
    'Today, HRS Group operates as a parent enterprise providing central governance, capital allocation, and operational standards. Each operating company retains autonomous technical leadership, maintaining direct accountability to customers, project partners, and regulatory authorities.',
  ],
};

export const milestones: Milestone[] = [
  {
    year: '2012',
    title: 'Founding of HRS Group in Ahmedabad',
    detail: 'Inception of HRS Aluglaze in Ahmedabad by Rupesh Shah and Hrishikesh Shah, pioneering engineered architectural aluminium fenestration.',
  },
  {
    year: '2015',
    title: 'Real Estate Expansion under Hrishikesh Ventures',
    detail: 'Launched planned residential developments and integrated commercial centres across key growth corridors in western Ahmedabad.',
  },
  {
    year: '2018',
    title: 'Bavla Botanical & Spice Milling Campus',
    detail: 'Commissioned a dedicated low-temperature stone milling facility in Bavla to process single-origin clean spices and seasonal blends.',
  },
  {
    year: '2020',
    title: 'Acquisition of Geotrix in Bengaluru',
    detail: 'Established direct Southern India facade engineering and site installation capabilities across Karnataka, Tamil Nadu, and Telangana.',
  },
  {
    year: '2022',
    title: 'School of Facade Technologies Academy',
    detail: 'Founded dedicated technical institute to bridge structural engineering theory and hands-on site installation mastery.',
  },
  {
    year: '2024',
    title: 'Launch of FirstGen & BOGO Retail Ecosystem',
    detail: 'Unified commercial asset management under FirstGen and unveiled BOGO multi-format retail destinations across Gujarat.',
  },
];

export const leadership: Leader[] = [
  {
    name: 'Hrishikesh Sharma',
    role: 'Managing Director',
    focus: 'Group Strategy & Capital Allocation',
    bio: 'Oversees group-wide capital governance, strategic growth corridors, and cross-sector asset development across Gujarat and southern India.',
    image: '/images/leadership/hrishikesh-sharma.jpg',
  },
  {
    name: 'Pravin Patel',
    role: 'Executive Director',
    focus: 'Sanand Manufacturing & Plant Operations',
    bio: 'Leads industrial operations at the Sanand automated CNC manufacturing plant, overseeing ISO quality standards, plant capacity, and CNC machining lines.',
    image: '/images/leadership/pravin-patel.jpg',
  },
  {
    name: 'Rajesh Varma',
    role: 'Director, Built Environment',
    focus: 'Facade Engineering & Unitised Systems',
    bio: 'Directs facade design engineering, unitised curtain wall erection protocols, and structural technical delivery on high-rise envelopes up to 38 storeys.',
    image: '/images/leadership/rajesh-varma.jpg',
  },
  {
    name: 'Meera Nambiar',
    role: 'Head of Retail',
    focus: 'BOGO Ecosystem & Multi-Format Growth',
    bio: 'Leads commercial architecture, omnichannel customer experience, and destination format expansion for BOGO Square, Bazaar, and Mini footprints.',
    image: '/images/leadership/meera-nambiar.jpg',
  },
  {
    name: 'Siddharth Rao',
    role: 'Chief Operating Officer',
    focus: 'FirstGen Hospitality & Commercial Assets',
    bio: 'Responsible for commercial office leasing, industrial logistics properties, Flight Stays corporate apartments, and Amuktamalyada dining operations.',
    image: '/images/leadership/siddharth-rao.jpg',
  },
  {
    name: 'Ananya Sharma',
    role: 'Director, Consumer Brands',
    focus: 'FMCG Portfolio & Supply Chain',
    bio: 'Directs brand positioning, modern trade retail distribution, packaging systems, and product development across 13 dedicated consumer lines.',
    image: '/images/leadership/ananya-sharma.jpg',
  },
  {
    name: 'Mihir Dave',
    role: 'Principal Academic Director',
    focus: 'School of Facade Technologies',
    bio: 'Oversees technical curriculum development, site fabricator vocational benchmarks, and architectural fenestration workshops for engineering institutions.',
    image: '/images/leadership/mihir-dave.jpg',
  },
];

export const values: ValueItem[] = [
  {
    number: '01',
    name: 'Faith',
    description:
      'We build long-standing relationships with vendors, tradespeople, and clients anchored in mutual confidence and institutional reliability.',
  },
  {
    number: '02',
    name: 'Trust',
    description:
      'Transparent contract documentation, clear architectural guarantees, and rigorous statutory compliance on every site and manufacturing unit.',
  },
  {
    number: '03',
    name: 'Foundation',
    description:
      'Rigorous structural calculations, certified raw materials, and disciplined capital reinvestment in manufacturing infrastructure.',
  },
  {
    number: '04',
    name: 'People',
    description:
      'Direct vocational trade skilling through the School of Facade Technologies and safe industrial workshop practices across all facilities.',
  },
  {
    number: '05',
    name: 'Process',
    description:
      'Documented quality control checkpoints across facade fabrication bays, spice cryogenic lines, and construction site deliveries.',
  },
  {
    number: '06',
    name: 'Service',
    description:
      'Proactive post-handover support for residential developments and rapid response maintenance for commercial glazing contracts.',
  },
];
