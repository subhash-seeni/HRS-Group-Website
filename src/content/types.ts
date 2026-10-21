export type Sector =
  | 'Built Environment'
  | 'Food and Consumer'
  | 'Hospitality, Leasing and Retail'
  | 'Services';

export type EntityStatus = 'active' | 'in-development' | 'acquired-subsidiary';

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

export interface Entity {
  slug: string;
  name: string;
  sector: Sector;
  summary: string;
  descriptor?: string;
  heroHook?: string;
  audience: string[];
  offerings: string[];
  detailedOfferings?: OfferingItem[];
  processSteps?: ProcessStep[];
  overview?: string[];
  pullQuote?: PullQuote;
  primaryAction?: EntityDetailAction;
  heroCaption?: string;
  status: EntityStatus;
  statusLabel?: string;
  whatTheyDo?: string;
  whoTheyServe?: string;
  contactPrompt?: string;
  relatedEntities: string[];
  location: string;
  keyDetails: {
    label: string;
    value: string;
  }[];
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
  status: 'active' | 'in-development' | 'reserved';
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
  title: string;
  focusArea: string;
  biography: string;
}

export interface Milestone {
  year: string;
  event: string;
  entitySlug?: string;
  location: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  entitySlug: string;
  summary: string;
  readTime: string;
  category: 'Group' | 'Built Environment' | 'Food and Consumer' | 'Hospitality and Retail' | 'Events and Awards';
  featured?: boolean;
  content: string[];
  pullQuote?: {
    text: string;
    author: string;
  };
  relatedSlugs?: string[];
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

export interface SiteSettings {
  groupName: string;
  tagline: string;
  headquarters: {
    city: string;
    state: string;
    address: string;
    phone: string;
    email: string;
  };
  southernRegionalOffice: {
    city: string;
    state: string;
    address: string;
    phone: string;
  };
  values: string[];
  navigation: {
    label: string;
    href: string;
  }[];
}
