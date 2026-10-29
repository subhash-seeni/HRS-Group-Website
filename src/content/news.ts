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

export const newsArticles: NewsArticle[] = [
  {
    slug: 'hrs-aluglaze-expands-sanand-production-line',
    title: 'HRS Aluglaze adds second automated fabrication line at Sanand facility',
    date: '2026-09-14',
    sector: 'Built Environment',
    business: 'HRS Aluglaze Ltd',
    location: 'Sanand, Gujarat',
    image: '/images/hrs-aluglaze/sanand-campus.webp',
    summary:
      'The expansion increases monthly output of unitised facade panels to 18,000 square metres to support commercial high-rise projects in western India.',
    content: [
      'HRS Aluglaze Ltd has completed installation of a second computer-controlled machining and assembly line at its Sanand manufacturing plant in Ahmedabad district.',
      'The expanded facility increases production capacity for unitised curtain walls, thermally broken structural windows, and architectural louvres. The new equipment reduces fabrication tolerances to within 0.5 millimetres across panel dimensions.',
      'Civil delivery timelines for three commercial projects in Ahmedabad and Surat will benefit from the increased output starting in the third quarter.',
    ],
  },
  {
    slug: 'hrishikesh-ventures-tops-out-h10-commercial-centre',
    title: 'Hrishikesh Ventures completes structural topping out of H10 in Bodakdev',
    date: '2026-08-02',
    sector: 'Built Environment',
    business: 'Hrishikesh Ventures',
    location: 'Ahmedabad, Gujarat',
    image: '/images/hrishikesh-ventures/residential-tower.webp',
    summary:
      'The 14-storey office and retail development on SG Highway reaches its planned structural height ahead of facade installation.',
    content: [
      'Hrishikesh Ventures has achieved structural completion on H10, a 14-storey commercial building located adjacent to SG Highway in Bodakdev, Ahmedabad.',
      'The building incorporates 180,000 square feet of office floor space above two levels of retail frontage and three levels of basement parking. Facade engineering will be completed by HRS Aluglaze using high-performance solar control double glazing.',
      'Handover for internal tenant fit-outs is scheduled for mid-2027.',
    ],
  },
  {
    slug: 'bogo-square-flagship-announced-ahmedabad',
    title: 'BOGO details flagship retail destination planned for western Ahmedabad',
    date: '2026-06-20',
    sector: 'Retail',
    business: 'BOGO',
    location: 'Ahmedabad, Gujarat',
    image: '/bogo/stores/bogo-square-concept.webp',
    summary:
      'The multi-format retail destination will house all eleven category brands, dining venues, and automated inventory systems under one roof.',
    content: [
      'BOGO has unveiled plans for its inaugural flagship destination, BOGO Square, planned for development in western Ahmedabad.',
      'The multi-level centre will present the complete BOGO collection of eleven lifestyle brands, ranging from daily groceries to organic produce and children’s educational supplies. The location will also house community meeting spaces and customer fulfillment infrastructure.',
      'The flagship format serves as the physical anchor for the BOGO retail network before rollout into medium-format BOGO Bazaar neighbourhood stores.',
    ],
  },
  {
    slug: 'school-of-facade-technologies-graduates-sixth-cohort',
    title: 'School of Facade Technologies certifies 42 structural facade specialists',
    date: '2026-05-18',
    sector: 'Built Environment',
    business: 'School of Facade Technologies',
    location: 'Ahmedabad, Gujarat',
    image: '/images/school-of-facade-technologies/workshop-benches.webp',
    summary:
      'Graduates completed five months of practical training in sealant chemistry, structural wind loading, and curtain wall installation.',
    content: [
      'The School of Facade Technologies held its annual certification ceremony in Ahmedabad, graduating 42 engineers, site supervisors, and fabricators.',
      'The curriculum covered structural glass engineering, acoustic isolation, seismic displacement, and water penetration testing under simulated wind pressure conditions.',
      'All certified graduates have been placed with facade engineering firms and main contractors across Gujarat, Maharashtra, and Karnataka.',
    ],
  },
  {
    slug: 'firstgen-hotels-opens-flight-stays-annex-bengaluru',
    title: 'FirstGen Hotels opens 36-key serviced apartment annex in Kadubeesanahalli',
    date: '2026-03-11',
    sector: 'Hospitality & Leasing',
    business: 'FirstGen Hotels',
    location: 'Bengaluru, Karnataka',
    image: '/images/firstgen/service-apartment.webp',
    summary:
      'The property expands Flight Stays capacity near Outer Ring Road technology parks to accommodate long-term project consultants and relocating executives.',
    content: [
      'FirstGen Hotels has opened a 36-unit residential annex at Flight Stays in Kadubeesanahalli, Bengaluru.',
      'Located within two kilometres of major technology campuses along the Outer Ring Road corridor, the property provides fully furnished apartments, working desks, high-speed fibre connectivity, and housekeeping services.',
      'The expansion addresses strong demand from engineering firms requiring extended residential accommodation for visiting technical teams.',
    ],
  },
  {
    slug: 'hrishikesh-food-products-attains-brcgs-certification',
    title: 'Hrishikesh Food Products Bavla processing mill receives global food safety certification',
    date: '2026-01-29',
    sector: 'Food & Consumer',
    business: 'Hrishikesh Food Products',
    location: 'Bavla, Gujarat',
    image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    summary:
      'Audit confirms compliance with international food hygiene, automated metal detection, and botanical traceability standards across spice milling lines.',
    content: [
      'Hrishikesh Food Products has obtained BRCGS Global Standard for Food Safety certification for its processing and milling facility in Bavla, Ahmedabad district.',
      'The certification follows a comprehensive audit of procurement traceability, microbiological testing laboratories, dust collection systems, and magnetic separation protocols.',
      'The standard enables the company to expand institutional white-label packaging contracts for domestic supermarket chains and international export distributors.',
    ],
  },
];

export default newsArticles;
