export interface OfficeLocation {
  city: string;
  label: string;
  name: string;
  address: string;
  coordinates?: string;
  phone?: string;
  email?: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const contactDetails = {
  headline: 'Contact HRS Group',
  curiosityHook:
    'Direct enquiry channel to HRS Group businesses across facade engineering, property developments, food processing, hospitality, and brand services.',
  headquarters: {
    name: 'HRS House',
    label: 'Corporate headquarters (Ahmedabad)',
    address: 'Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat, India',
    phone: '+91 79 4000 1200',
    email: 'info@hrsgroup.in',
    officeHours: 'Monday to Saturday, 09:30 to 18:30 IST',
    notes: 'Closed on Sundays and national public holidays',
  },
  facilities: [
    {
      city: 'Ahmedabad',
      label: 'Corporate headquarters',
      name: 'HRS House',
      address: 'Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat',
      phone: '+91 79 4000 1200',
      email: 'info@hrsgroup.in',
      image: '/images/group/corporate-lobby.webp',
    },
    {
      city: 'Bengaluru',
      label: 'Southern regional engineering hub',
      name: 'Geotrix Facade Hub',
      address: 'Kadubeesanahalli, Outer Ring Road, Bengaluru 560103, Karnataka',
      phone: '+91 80 4120 4800',
      email: 'south@hrsgroup.in',
      image: '/images/geotrix/window-frames-section.webp',
    },
    {
      city: 'Sanand',
      label: 'Facade fabrication & CNC plant',
      name: 'HRS Aluglaze Works',
      address: 'GIDC Phase II, Sanand Industrial Area, Gujarat 382110',
      phone: '+91 2717 298 100',
      email: 'sanand@hrsaluglaze.com',
      image: '/images/hrs-aluglaze/sanand-campus.webp',
    },
    {
      city: 'Bavla',
      label: 'Botanical & spice milling campus',
      name: 'Hrishikesh Food Works',
      address: 'National Highway 8A, Bavla Industrial Belt, Gujarat 382220',
      phone: '+91 2714 262 500',
      email: 'bavla@hrishikeshfoods.com',
      image: '/images/hrishikesh-food-products/whole-spices-stone.webp',
    },
  ],
  departments: [
    { label: 'Facade Engineering & Glazing', entitySlug: 'hrs-aluglaze', email: 'facades@hrsgroup.in' },
    { label: 'Real Estate & Commercial Leasing', entitySlug: 'hrishikesh-ventures', email: 'leasing@hrsgroup.in' },
    { label: 'Retail & Distribution Partnerships', entitySlug: 'bogo', email: 'retail@hrsgroup.in' },
    { label: 'Spice Milling & Contract Processing', entitySlug: 'hrishikesh-food-products', email: 'foods@hrsgroup.in' },
    { label: 'Brand Strategy & Design Studio', entitySlug: 'indian-brand-house', email: 'brandhouse@hrsgroup.in' },
    { label: 'General Corporate Governance', entitySlug: 'hrs-group', email: 'info@hrsgroup.in' },
  ],
  faqs: [
    {
      question: 'Where is HRS Group headquartered?',
      answer:
        'HRS Group is headquartered at HRS House, Near Pakwan Cross Roads, SG Highway, Bodakdev, Ahmedabad 380054, Gujarat, India.',
    },
    {
      question: 'How does Geotrix coordinate with HRS Aluglaze?',
      answer:
        'Geotrix is the southern regional operating arm of HRS Aluglaze, providing on-site installation, crane logistics, and regional project management in Bengaluru and Chennai using facade units precision-manufactured at the Sanand plant.',
    },
    {
      question: 'What services does Hrishikesh Food Products provide at Bavla?',
      answer:
        'The Bavla facility provides low-temperature stone milling, contract cleaning, automated pouch packaging, and private label manufacturing for single-origin whole and powdered spices.',
    },
    {
      question: 'How are commercial enquiries handled?',
      answer:
        'Enquiries submitted via the corporate portal are routed directly to the designated business unit desk, with confirmed response within one working day.',
    },
  ],
};
