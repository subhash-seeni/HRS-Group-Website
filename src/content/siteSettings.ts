import { SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  groupName: 'HRS Group',
  tagline: 'Diversified Business Group Headquartered in Ahmedabad',
  headquarters: {
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat, India',
    phone: '+91 79 2685 4100',
    email: 'contact@hrsgroup.in',
  },
  southernRegionalOffice: {
    city: 'Bengaluru',
    state: 'Karnataka',
    address: 'FirstGen & Geotrix Facility, Outer Ring Road, Kadubeesanahalli, Bengaluru 560103, Karnataka, India',
    phone: '+91 80 4122 8900',
  },
  values: ['Faith', 'Trust', 'Foundation', 'People', 'Process', 'Service'],
  navigation: [
    { label: 'Overview', href: '/' },
    { label: 'Built environment', href: '/sectors/built-environment' },
    { label: 'Food and consumer', href: '/sectors/food-and-consumer' },
    { label: 'Hospitality and leasing', href: '/sectors/hospitality-leasing' },
    { label: 'Services', href: '/sectors/services' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};
