import { JobOpening } from './types';

export interface EmployeeQuote {
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface ValueInAction {
  value: string;
  description: string;
}

export const employeeQuotes: EmployeeQuote[] = [
  {
    quote:
      'We test structural silicone joints at 1.5 times wind load because building facades in coastal and high-rise zones cannot fail. There is zero tolerance for cutting corners in engineering.',
    author: 'Rajesh Trivedi',
    role: 'Lead Facade Engineer, HRS Aluglaze',
    location: 'Sanand Works',
  },
  {
    quote:
      'Every spice batch from Bavla undergoes moisture and volatile oil assays before packing. Quality is not a marketing statement here; it is measured in analytical lab records.',
    author: 'Dr. Meera Patel',
    role: 'Chief Chemist, Hrishikesh Food Products',
    location: 'Bavla Plant',
  },
  {
    quote:
      'At Amuktamalyada in Bengaluru, authentic tiffin preparation starts at 04:30 each morning with freshly ground batter. Respect for the craft and consistency define our service standard.',
    author: 'Venkatesh Rao',
    role: 'Operations Supervisor, FirstGen Hotels',
    location: 'Bengaluru',
  },
];

export const valuesInAction: ValueInAction[] = [
  {
    value: 'Faith',
    description:
      'We build long-standing relationships with vendors, tradespeople, and clients anchored in mutual confidence and institutional reliability.',
  },
  {
    value: 'Trust',
    description:
      'Transparent contract documentation, clear architectural guarantees, and rigorous statutory compliance on every site and manufacturing unit.',
  },
  {
    value: 'Foundation',
    description:
      'Robust structural calculations, certified raw materials, and disciplined capital reinvestment in manufacturing infrastructure.',
  },
  {
    value: 'People',
    description:
      'Direct vocational trade skilling through the School of Facade Technologies and safe industrial workshop practices across all facilities.',
  },
  {
    value: 'Process',
    description:
      'Documented quality control checkpoints across facade fabrication bays, spice cryogenic lines, and construction site deliveries.',
  },
  {
    value: 'Service',
    description:
      'Proactive post-handover support for residential developments and rapid response maintenance for commercial glazing contracts.',
  },
];

export const groupBenefits: string[] = [
  'Comprehensive group medical insurance covering employees and immediate dependants',
  'Annual health screenings and on-site occupational safety care across plants',
  'Provident Fund, statutory gratuity, and performance-linked retention incentives',
  'Skill upgrading sponsorships and technical certifications via School of Facade Technologies',
  'Subsidised canteen facilities with wholesome meals at Sanand and Bavla works',
  'Structured 6-day work weeks with regulated shifts and overtime compensation',
  'Relocation and transit allowances for regional site deployments in Karnataka and Gujarat',
];

export const jobOpenings: JobOpening[] = [
  {
    id: 'job-alu-01',
    slug: 'senior-structural-facade-engineer',
    title: 'Senior Structural Facade Engineer',
    entitySlug: 'hrs-aluglaze',
    department: 'Design Engineering',
    location: 'Sanand Industrial Estate, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '6+ years',
    postedDate: '01 October 2026',
    description:
      'Responsible for wind-load calculation, bracket engineering, and structural silicone joint sizing for unitised curtain wall systems.',
    responsibilities: [
      'Perform structural finite element calculations for aluminium transoms, mullions, and steel anchor brackets',
      'Generate structural design reports for consultant and peer review submissions',
      'Validate thermal movement and building seismic drift allowances in envelope detailing',
      'Oversee factory production mock-up testing and on-site hose test verifications',
    ],
    requirements: [
      'Degree in Civil or Mechanical Engineering with 6 or more years in facade design',
      'Proficiency in structural calculation tools and AutoCAD/Revit detailing',
      'Knowledge of CWCT and relevant Indian building codes',
    ],
  },
  {
    id: 'job-alu-02',
    slug: 'facade-estimator-cost-engineer',
    title: 'Facade Estimator & Cost Engineer',
    entitySlug: 'hrs-aluglaze',
    department: 'Commercial & Tendering',
    location: 'Bodakdev, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '4+ years',
    postedDate: '28 September 2026',
    description:
      'Prepares detailed bill of quantities, profile weight take-offs, glass optimization schedules, and tender rate analyses for large commercial projects.',
    responsibilities: [
      'Extract aluminium and glass quantities from architectural tender packages',
      'Solicit raw material pricing from extrusion presses and float glass manufacturers',
      'Formulate labour erection cost schedules and crane usage budgets',
      'Coordinate with senior management on tender submissions and pre-bid clarifications',
    ],
    requirements: [
      'Degree or Diploma in Civil / Mechanical Engineering or Quantity Surveying',
      'Minimum 4 years estimating commercial curtain wall and fenestration tenders',
      'Proficiency with MS Excel and estimating software',
    ],
  },
  {
    id: 'job-geo-01',
    slug: 'site-installation-manager',
    title: 'Site Installation Manager',
    entitySlug: 'geotrix',
    department: 'Site Operations',
    location: 'Bengaluru, Karnataka',
    employmentType: 'Full-time',
    experienceLevel: '5+ years',
    postedDate: '15 September 2026',
    description:
      'Directs on-site installation teams, crawler crane lifting schedules, and safety inspections for commercial facade envelopes in Bengaluru.',
    responsibilities: [
      'Supervise installation of unitised facade panels, brackets, and flashings on high-rise commercial structures',
      'Manage crane logistics, floor unloading schedules, and vertical distribution of glass units',
      'Conduct daily toolbox safety talks and verify fall-arrest harness rigging',
      'Liaise with main contractors and structural project consultants on interface alignment',
    ],
    requirements: [
      'Diploma or degree in civil engineering',
      'Minimum 5 years on multi-storey facade erection sites',
      'Fluency in Kannada and English',
    ],
  },
  {
    id: 'job-ven-01',
    slug: 'sales-manager-residential-developments',
    title: 'Sales Manager (Residential Developments)',
    entitySlug: 'hrishikesh-ventures',
    department: 'Sales & Marketing',
    location: 'Bodakdev, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '5+ years',
    postedDate: '22 September 2026',
    description:
      'Leads residential apartment and villa sales for Hrishikesh developments across Shela, South Bopal, and western Ahmedabad micro-markets.',
    responsibilities: [
      'Conduct project presentations and site walkthroughs for high-net-worth homebuyers and investors',
      'Manage lead pipelines, CRM logging, and conversion tracking across active schemes',
      'Coordinate home loan documentation with banking partners and assist buyers with title paperwork',
      'Organise broker channel meets and channel partner incentive rollouts',
    ],
    requirements: [
      'Bachelors or Masters in Business, Marketing, or Commerce',
      '5+ years real estate sales experience in Ahmedabad residential sector',
      'Proven track record in premium apartment or villa transactions',
    ],
  },
  {
    id: 'job-food-01',
    slug: 'quality-assurance-chemist-spices',
    title: 'Quality Assurance Chemist (Spices)',
    entitySlug: 'hrishikesh-food-products',
    department: 'Quality & Regulatory',
    location: 'Bavla, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '3+ years',
    postedDate: '10 September 2026',
    description:
      'Performs moisture, volatile oil, and microbial testing on incoming whole spices and finished powdered batches in accordance with FSSAI regulations.',
    responsibilities: [
      'Sample incoming raw spices (chilli, coriander, cumin, turmeric) for foreign matter and moisture content',
      'Conduct volatile oil distillations and spectrophotometric colour value assays',
      'Maintain batch laboratory test registers and issue release certificates for packaging lines',
      'Audit processing machinery cleaning protocols and pest management controls',
    ],
    requirements: [
      'MSc or BSc in Chemistry, Food Science, or Microbiology',
      'Practical familiarity with HPLC and laboratory analytical equipment',
      'Experience in HACCP and ISO 22000 audits',
    ],
  },
  {
    id: 'job-food-02',
    slug: 'food-processing-line-supervisor',
    title: 'Food Processing Line Supervisor',
    entitySlug: 'hrishikesh-food-products',
    department: 'Plant Operations',
    location: 'Bavla, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '4+ years',
    postedDate: '05 October 2026',
    description:
      'Oversees daily operation of cleaning, aspirating, cryogenic milling, and automatic form-fill-seal packaging machinery at the Bavla plant.',
    responsibilities: [
      'Manage shift production schedules to fulfill bulk contract packaging orders',
      'Monitor liquid nitrogen injection flow rates on cryogenic grinding mills',
      'Ensure machine calibration, metal detector checks, and zero package leakage',
      'Lead shift operators and enforce hygiene protocols (headwear, aprons, sanitation)',
    ],
    requirements: [
      'Diploma in Mechanical / Food Engineering or BSc in Food Technology',
      '4+ years working in FMCG or dry food processing plants',
      'Working knowledge of PLC-controlled packaging machinery',
    ],
  },
  {
    id: 'job-hot-01',
    slug: 'restaurant-operations-supervisor-bengaluru',
    title: 'Restaurant Operations Supervisor (Bengaluru)',
    entitySlug: 'firstgen-hotels',
    department: 'Food & Beverage',
    location: 'Kadubeesanahalli, Outer Ring Road, Bengaluru',
    employmentType: 'Full-time',
    experienceLevel: '3+ years',
    postedDate: '18 September 2026',
    description:
      'Supervises morning tiffin prep, dining room seating flow, inventory procurement, and food safety standards at Amuktamalyada.',
    responsibilities: [
      'Coordinate morning service for fresh South Indian tiffin items (gare, upma, dosa, pesarattu)',
      'Manage inventory procurement for dairy, grains, fresh produce, and single-origin filter coffee beans',
      'Enforce FSSAI kitchen cleanliness, food temperature logs, and cutlery sanitisation',
      'Train floor staff in courteous customer service and efficient billing workflows',
    ],
    requirements: [
      'Diploma in Hotel Management or equivalent experience',
      'Previous experience in high-volume South Indian vegetarian dining',
      'Customer service focus and staff roster management skills',
    ],
  },
  {
    id: 'job-ibh-01',
    slug: 'visual-identity-designer',
    title: 'Visual Identity Designer',
    entitySlug: 'indian-brand-house',
    department: 'Creative Studio',
    location: 'Bodakdev, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '3+ years',
    postedDate: '25 September 2026',
    description:
      'Develops brand guidelines, editorial typographic layouts, and FMCG packaging die-lines for clients across retail and industry.',
    responsibilities: [
      'Create typographic systems, colour palettes, and corporate identity guidelines',
      'Produce print-ready FMCG packaging artwork with accurate colour separations and die-lines',
      'Collaborate with copywriters and marketing strategists on editorial publications',
      'Review printer proof sheets and oversee print production quality control',
    ],
    requirements: [
      'Formal qualification in Graphic Design or Visual Communication',
      'Advanced knowledge of typography, prepress standards, and vector drafting',
      'Demonstrated portfolio of corporate and retail packaging systems',
    ],
  },
  {
    id: 'job-ast-01',
    slug: 'commercial-leasing-manager',
    title: 'Commercial Leasing Manager',
    entitySlug: 'firstgen-assets',
    department: 'Asset Management',
    location: 'Bodakdev, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '5+ years',
    postedDate: '12 September 2026',
    description:
      'Oversees lease marketing, tenant negotiations, and agreement renewals across commercial office buildings and warehouse assets.',
    responsibilities: [
      'Market vacant office suites, retail frontages, and logistics sheds to corporate occupiers',
      'Draft term sheets, letter of intents, and coordinate registered lease agreements',
      'Liaise with international property consultants (IPCs) on commercial tenant pipelines',
      'Track monthly common area maintenance (CAM) billing and tenant satisfaction',
    ],
    requirements: [
      'Degree in Business Administration, Real Estate, or Commerce',
      '5+ years experience in commercial real estate leasing in Gujarat',
      'Strong contract negotiation and lease structuring skills',
    ],
  },
  {
    id: 'job-sft-01',
    slug: 'facade-technical-instructor',
    title: 'Facade Technical Instructor',
    entitySlug: 'school-of-facade-technologies',
    department: 'Vocational Training',
    location: 'Sanand Training Centre, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '6+ years',
    postedDate: '08 October 2026',
    description:
      'Delivers hands-on curriculum modules in curtain wall bracket installation, silicone pump operation, and water penetration testing for technician trainees.',
    responsibilities: [
      'Instruct vocational trainees in safe workshop tool operation and scaffolding safety',
      'Conduct practical demonstrations on two-part structural silicone pump metering and peel tests',
      'Grade trade competency examinations and maintain student attendance logs',
      'Collaborate with industry partners on updated curriculum modules and syllabus revisions',
    ],
    requirements: [
      'Diploma in Civil or Mechanical Engineering or certified master trade installer',
      '6+ years hands-on experience in facade fabrication or erection',
      'Patience and aptitude for vocational instructional training',
    ],
  },
  {
    id: 'job-ibh-02',
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    entitySlug: 'indian-brand-house',
    department: 'Performance Marketing',
    location: 'Bodakdev, Ahmedabad',
    employmentType: 'Full-time',
    experienceLevel: '3+ years',
    postedDate: '29 September 2026',
    description:
      'Plans, executes, and optimizes performance marketing campaigns, search rankings, and programmatic media for institutional and retail clients.',
    responsibilities: [
      'Manage search and paid social campaigns for B2B engineering and real estate developments',
      'Implement conversion tracking, Google Analytics 4 schemas, and attribution dashboards',
      'Optimize landing page conversion rates through structured headline and layout testing',
      'Compile monthly performance reports detailing cost per qualified commercial lead',
    ],
    requirements: [
      'Bachelors degree in Marketing, Communications, or quantitative discipline',
      '3+ years hands-on experience running performance media campaigns in India',
      'Proficiency with Google Ads, Meta Ads Manager, and web analytics tools',
    ],
  },
];
