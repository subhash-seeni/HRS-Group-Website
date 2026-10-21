import { Brand } from './types';

export const brands: Brand[] = [
  // Hrishikesh Consumer Products: Active / Market stage
  {
    slug: 'manpras',
    name: 'Manpras',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Grocery Store & Packaged Goods',
    status: 'active',
    description:
      'Neighbourhood grocery stores carrying fresh daily produce, dairy, and pantry staples alongside a proprietary packaged goods line.',
    location: 'Ahmedabad (Prahlad Nagar, Science City Road, Bopal)',
    offerings: [
      'Pantry staples: pulses, flours, cold-pressed oils',
      'Daily dairy and farm-sourced produce',
      'Proprietary packaged grains and spices',
    ],
  },
  {
    slug: 'snackshot',
    name: 'Snackshot',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Snacks & Namkeen',
    status: 'active',
    description:
      'Packaged namkeen and roasted savoury snacks prepared with regional Gujarati seasonings and non-hydrogenated groundnut oil.',
    offerings: ['Ratlami sev', 'Bhavnagari gathiya', 'Roasted spiced chana', 'Diet murmura mix'],
  },
  {
    slug: 'antrah',
    name: 'Antrah',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Mouth Freshener & Mukhwas',
    status: 'active',
    description:
      'Traditional digestive seed blends, roasted fennel, dried dates, and herbal mouth fresheners packed in moisture-sealed tins.',
    offerings: ['Roasted dhanadal', 'Calcutta meetha paan mix', 'Flaxseed and sesame mukhwas', 'Silver-coated cardamom seeds'],
  },
  {
    slug: 'basic-essentials',
    name: 'Basic Essentials',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Paper & Hygiene Products',
    status: 'active',
    description:
      'Daily household and commercial paper products including two-ply table napkins, kitchen towels, and boxed facial tissues.',
    offerings: ['Tabletop napkin packs', 'High-absorbency kitchen rolls', 'Facial tissue boxes (100 pulls)', 'Pocket tissue packs'],
  },
  {
    slug: 'gush',
    name: 'Gush',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Packaged Drinking Water',
    status: 'active',
    description:
      'Multi-stage ozonised and mineral-balanced drinking water packaged in food-grade recyclable bottles and 20-litre institutional jars.',
    offerings: ['250ml conference bottles', '500ml and 1-litre travel bottles', '20-litre bubble-top office dispenser jars'],
  },
  {
    slug: 'daily-pump',
    name: 'Daily Pump',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Functional Beverage & Energy Drink',
    status: 'active',
    description:
      'Low-sugar caffeinated energy drink and electrolyte replenishment beverage formulated with B-complex vitamins for daytime alertness.',
    offerings: ['250ml slim aluminium cans in Citrus and Berry flavour', 'Electrolyte hydration powders in single-serve sachets'],
  },

  // Hrishikesh Consumer Products: Upcoming / Reserved Portfolios
  {
    slug: 'biscbite',
    name: 'Biscbite',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Packaged Food (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for packaged baked items and tea biscuits currently in recipe formulation stage.',
  },
  {
    slug: 'mood-beans',
    name: 'Mood Beans',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Beverages (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for artisanal coffee beans and ready-to-brew cold brew blends.',
  },
  {
    slug: 'the-frozen-palette',
    name: 'The Frozen Palette',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Frozen Foods (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for frozen regional appetizers, vegetables, and fruit purees.',
  },
  {
    slug: 'the-nut-tribe',
    name: 'The Nut Tribe',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Dry Fruits & Nuts (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for vacuum-packed almonds, cashews, pistachios, and trail mixes.',
  },
  {
    slug: 'purple-cow',
    name: 'Purple Cow',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Dairy Specialties (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for specialized dairy products and flavored milk drinks.',
  },
  {
    slug: 'defumes',
    name: 'Defumes',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Home Care (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for air neutralisers, natural odor absorbers, and kitchen fresheners.',
  },
  {
    slug: 'raspberry-rhinoceros',
    name: 'Raspberry Rhinoceros',
    parentEntitySlug: 'hrishikesh-consumer-products',
    category: 'Confectionery & Treats (Reserved)',
    status: 'reserved',
    description:
      'Reserved trade mark for fruit jellies, hard candies, and sweet snack treats.',
  },

  // FirstGen Operating Brands
  {
    slug: 'flight-stays',
    name: 'Flight Stays',
    parentEntitySlug: 'firstgen-hotels',
    category: 'Corporate Serviced Apartments',
    status: 'active',
    description:
      'Furnished residential apartments catering to IT and infrastructure consultants on mid-to-long term assignments.',
    location: 'Outer Ring Road and Whitefield, Bengaluru',
    offerings: ['High-speed leased-line internet', 'Housekeeping and linen service', 'Kitchenettes with induction cooktops'],
  },
  {
    slug: 'amuktamalyada',
    name: 'Amuktamalyada',
    parentEntitySlug: 'firstgen-hotels',
    category: 'Regional Telugu Restaurant',
    status: 'active',
    description:
      'Vegetarian Telugu tiffin and meal dining room serving traditional Andhra and Rayalaseema recipes on Bengaluru Outer Ring Road.',
    location: 'Outer Ring Road, Kadubeesanahalli, Bengaluru',
    offerings: [
      'Gare (crispy medu vada with spicy ginger chutney)',
      'Upma with podi and pure ghee',
      'Rava idli with potato saagu',
      'Pesarattu with allam pachadi',
      'Crisp ghee roast dosa',
      'Afternoon Telugu full thali meal served on banana leaf',
    ],
  },
  {
    slug: 'the-bluprint',
    name: 'The Bluprint by Builders Cafe',
    parentEntitySlug: 'firstgen-enterprises',
    category: 'Trade Cafe & Material Lounge',
    status: 'active',
    description:
      'A meeting space and cafe tailored for architects, contractors, and site owners, featuring tactile materials libraries and meeting rooms.',
    location: 'Prahlad Nagar, Ahmedabad',
    offerings: ['Specialty filter and espresso coffee', 'Physical stone and glass material catalog', 'Bookable client discussion booths'],
  },
  {
    slug: 'shubhvista',
    name: 'ShubhVista',
    parentEntitySlug: 'firstgen-enterprises',
    category: 'Building Materials Retail',
    status: 'active',
    description:
      'Boutique retail store carrying architectural window hardware, door fittings, sanitaryware, and metal trim profiles.',
    location: 'SG Highway, Ahmedabad',
    offerings: ['Aluminium profile hardware', 'Heavy-duty architectural hinges and handles', 'Commercial sealant and installation accessories'],
  },
];
