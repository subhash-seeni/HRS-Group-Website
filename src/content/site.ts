export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  nav: NavItem[];
  footerNav: {
    title: string;
    items: NavItem[];
  }[];
  contact: {
    hqAddress: string;
    bengaluruAddress: string;
    email: string;
    phone: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'HRS Group',
  shortName: 'HRS',
  tagline: 'Diversified Business Group • Ahmedabad',
  description:
    'Parent website for HRS Group: Built Environment, Retail, Food & Consumer, Hospitality & Leasing, and Brand Services headquartered in Ahmedabad, Gujarat.',
  url: 'https://hrsgroup.in',
  nav: [
    { label: 'About', href: '/about', description: 'Group history, values and leadership' },
    { label: 'Businesses', href: '/businesses', description: 'Our entities across five sectors' },
    { label: 'BOGO', href: '/bogo', description: 'Featured retail ecosystem and brands' },
    { label: 'News', href: '/news', description: 'Corporate announcements and milestones' },
    { label: 'Careers', href: '/careers', description: 'Working across manufacturing and retail' },
    { label: 'Contact', href: '/contact', description: 'Offices in Ahmedabad and Bengaluru' },
  ],
  footerNav: [
    {
      title: 'Sectors',
      items: [
        { label: 'Built Environment', href: '/businesses#built-environment' },
        { label: 'Retail & BOGO', href: '/bogo' },
        { label: 'Food & Consumer', href: '/businesses#food-and-consumer' },
        { label: 'Hospitality & Leasing', href: '/businesses#hospitality-and-leasing' },
        { label: 'Brand Services', href: '/businesses#services' },
      ],
    },
    {
      title: 'Group',
      items: [
        { label: 'About HRS Group', href: '/about' },
        { label: 'Values & Foundations', href: '/about#values' },
        { label: 'Operational Hubs', href: '/about#locations' },
        { label: 'News & Announcements', href: '/news' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Locations',
      items: [
        { label: 'Ahmedabad (Headquarters)', href: '/contact#ahmedabad' },
        { label: 'Bengaluru (Regional Hub)', href: '/contact#bengaluru' },
        { label: 'Sanand Industrial Campus', href: '/contact#sanand' },
        { label: 'Bavla Processing Facility', href: '/contact#bavla' },
      ],
    },
  ],
  contact: {
    hqAddress: 'Bodakdev, Near SG Highway, Ahmedabad, Gujarat 380054, India',
    bengaluruAddress: 'Kadubeesanahalli, Outer Ring Road, Bengaluru, Karnataka 560103, India',
    email: 'contact@hrsgroup.in',
    phone: '+91 79 2685 0000',
  },
};

export default siteConfig;
