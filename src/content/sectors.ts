export interface Sector {
  slug: string;
  name: string;
  title: string;
  headline: string;
  description: string;
  color: string;
  accentBg: string;
}

export const sectors: Sector[] = [
  {
    slug: 'built-environment',
    name: 'Built Environment',
    title: 'Architecture, engineering and education',
    headline: 'Structural precision across real estate, facades and technical education',
    description:
      'Developing residential and commercial properties in Gujarat while engineering advanced building envelopes across western and southern India.',
    color: '#15852C',
    accentBg: '#EBF7EE',
  },
  {
    slug: 'retail',
    name: 'Retail',
    title: 'Connected modern retail',
    headline: 'Physical retail formats, specialised lifestyle brands and smart infrastructure',
    description:
      'BOGO unites multi-format retail destinations, eleven dedicated consumer brands, and coordinated distribution under one operating framework.',
    color: '#F58A33',
    accentBg: '#FFF4EB',
  },
  {
    slug: 'food-and-consumer',
    name: 'Food & Consumer',
    title: 'Spices, milling and packaged goods',
    headline: 'Clean processing, certified sourcing and household brands',
    description:
      'Operating clean spice processing in Bavla alongside a growing portfolio of consumer packaged goods for daily household routines.',
    color: '#EB7C20',
    accentBg: '#FFF2E8',
  },
  {
    slug: 'hospitality-and-leasing',
    name: 'Hospitality & Leasing',
    title: 'Commercial assets and dining',
    headline: 'Property leasing, serviced apartments and regional culinary establishments',
    description:
      'Holding commercial assets, warehousing facilities, business stays and regional dining destinations in Ahmedabad and Bengaluru.',
    color: '#13477A',
    accentBg: '#EFF5FB',
  },
  {
    slug: 'services',
    name: 'Services',
    title: 'Brand communications and digital marketing',
    headline: 'Brand strategy, design systems and digital distribution',
    description:
      'Indian Brand House delivers strategy, identity design, production, and digital growth systems for group entities and external partners.',
    color: '#EA5735',
    accentBg: '#FDF0EC',
  },
];

export default sectors;
