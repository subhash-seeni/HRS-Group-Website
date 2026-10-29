export type Sector =
  | 'Built Environment'
  | 'Retail'
  | 'Food and Consumer'
  | 'Hospitality, Leasing and Retail'
  | 'Hospitality and Leasing'
  | 'Services';

export type EntityStatus = 'Active operations' | 'Active development' | 'Operating arm' | 'Technical academy' | 'active' | 'in-development' | 'acquired-subsidiary';

export interface OfferingItem {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface PullQuote {
  quote: string;
  attribution?: string;
}

export interface EntityDetailAction {
  label: string;
  href: string;
}

export interface KeyDetail {
  label: string;
  value: string;
}

export interface Entity {
  slug: string;
  name: string;
  shortName?: string;
  sector: string;
  sectorName?: Sector;
  summary: string;
  descriptor?: string;
  heroHook?: string;
  heroCaption?: string;
  audience: string;
  offerings?: string[];
  detailedOfferings?: OfferingItem[];
  processSteps?: ProcessStep[];
  overview?: string[];
  pullQuote?: PullQuote;
  primaryAction?: EntityDetailAction;
  status: string;
  statusLabel?: string;
  whatTheyDo?: string;
  whoTheyServe?: string;
  contactPrompt?: string;
  url: string;
  logoPath?: string;
  imagePath?: string;
  accentColor: string;
  location?: string;
  keyDetails?: KeyDetail[];
  relatedEntities?: string[];
  details?: Record<string, any>;

  // Entity-specific deep dive data
  aluglazeData?: {
    systems: { name: string; description: string; specifications: string[] }[];
    capabilities: { title: string; description: string }[];
    certifications: string[];
    southIndiaNote: { headline: string; description: string; linkText: string; linkHref: string };
  };
  geotrixData?: {
    aluglazeArmNote: string;
    regionalNodes: { city: string; area: string; focus: string; activeProjects: string }[];
    linkedSystems: { name: string; description: string }[];
  };
  softData?: {
    poweredByNote: string;
    tracks: {
      id: string;
      title: string;
      subtitle: string;
      courses: { name: string; duration: string; format: string; outcome: string }[];
    }[];
  };
  foodData?: {
    models: { id: string; name: string; summary: string; points: string[] }[];
    spiceShowcase: { name: string; category: string; description: string }[];
    complianceItems: string[];
  };
  manprasData?: {
    storeDescription: string;
    storeFeatures: string[];
    packagedDescription: string;
    packagedCategories: string[];
  };
  firstgenData?: {
    umbrellaNote: string;
    divisions: { name: string; slug: string; role: string; description: string }[];
  };
  assetsData?: {
    categories: { title: string; locations: string; description: string; highlights: string[] }[];
  };
  hotelsData?: {
    flightStays: { title: string; location: string; description: string; features: string[] };
    amuktamalyada: {
      title: string;
      location: string;
      description: string;
      signatureDishes: { name: string; description: string }[];
    };
  };
  enterprisesData?: {
    bluprint: { title: string; location: string; description: string; highlights: string[] };
    shubhvista: { title: string; location: string; description: string; highlights: string[] };
  };
  brandHouseData?: {
    pillars: { title: string; description: string; capabilities: string[] }[];
    selectedWork: { client: string; title: string; year: string; description: string }[];
  };
}

export interface Brand {
  slug: string;
  name: string;
  parentEntitySlug: string;
  category: string;
  status: 'active' | 'in-development' | 'upcoming' | 'reserved';
  description: string;
  location?: string;
  offerings?: string[];
}

export interface Project {
  slug: string;
  name: string;
  entitySlug: string;
  sector: Sector;
  typology: 'residential' | 'commercial' | 'joint-venture' | 'facade-engineering';
  location: string;
  yearCompletedOrStatus: string;
  scale: string;
  description: string;
}

export interface GroupFact {
  metric: string;
  label: string;
  context: string;
}

export interface Leader {
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
}

export interface Milestone {
  year: string;
  title: string;
  detail: string;
}

export interface ValueItem {
  number: string;
  name: string;
  description: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  sector: string;
  business: string;
  location: string;
  summary: string;
  content: string[];
  image: string;
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  entitySlug: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract';
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate?: string;
  experienceLevel?: string;
}

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
