export interface BogoFormat {
  slug: string;
  name: string;
  headline: string;
  promise: string;
  size: string;
  idealFor: string[];
  experience: { title: string; desc: string }[];
  description: string;
  logoPath: string;
  imagePath: string;
  caption: string;
}

export interface BogoCategoryBrand {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  color: string;
  productLines: string[];
  promises: { title: string; desc: string }[];
  vision: string;
  logoPath: string;
  imagePath: string;
  caption: string;
}

export interface BogoProgram {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  pillars: { title: string; desc: string }[];
  journey?: { step: string; title: string; desc: string }[];
  benefits?: { title: string; desc: string }[];
  vision: string;
  logoPath: string;
}

export interface BogoTechPhase {
  phase: number;
  title: string;
  desc: string;
  status: string;
  caption?: string;
}

export interface BogoGrowthPhase {
  phase: string;
  title: string;
  milestones: string[];
}

export const bogoContent = {
  brand: {
    name: 'BOGO',
    tagline: 'Building India’s Next Retail Ecosystem',
    vision:
      'To build India’s most connected retail ecosystem by bringing together trusted brands, meaningful experiences, and intelligent technology into one unified platform.',
    mindset: {
      headline: 'Bonds Over Generations, Often',
      subhead: 'At BOGO, we believe the strongest businesses are built on strong bonds.',
      beliefs: [
        'Bonds between people and brands.',
        'Bonds between businesses and communities.',
        'Bonds between generations.',
      ],
      statement:
        'Retail is more than buying and selling. It is about the relationships we create along the way. A trusted store becomes part of a family’s everyday life. A local brand becomes a name passed from one generation to the next. A business grows when its customers, partners, and people grow with it.',
      closing: 'We don’t just build a retail ecosystem. We build bonds that last.',
    },
    colors: {
      navy: '#0F2A5C',
      orange: '#F58A33',
      green: '#3F8F3F',
    },
    pillars: [
      {
        title: 'Brands',
        subtitle: 'Specialised experiences',
        desc: 'Distinct brands built for everyday lifestyles and changing consumer preferences.',
        color: '#DF2B6B',
      },
      {
        title: 'Technology',
        subtitle: 'Intelligent infrastructure',
        desc: 'Making retail simpler, faster, and smarter across discovery and transaction.',
        color: '#06803C',
      },
      {
        title: 'Partnerships',
        subtitle: 'Collaborative growth',
        desc: 'Connecting businesses, entrepreneurs, and shared opportunities.',
        color: '#6F357C',
      },
      {
        title: 'Distribution',
        subtitle: 'Connected movement',
        desc: 'Moving products efficiently from production to store shelves and doorsteps.',
        color: '#0E4EB8',
      },
      {
        title: 'Retail',
        subtitle: 'Modern formats',
        desc: 'Customer-facing formats designed around convenience, discovery, and scale.',
        color: '#F58A33',
      },
    ],
  },

  // 3 Retail Formats
  formats: [
    {
      slug: 'bogo-square',
      name: 'BOGO Square',
      headline: 'The Flagship Destination',
      promise: 'Where the BOGO ecosystem comes to life.',
      size: 'Regional Destination (10,000+ sq. ft.)',
      idealFor: [
        'Destination weekend family shopping',
        'Multi-category brand discovery',
        'Dining, cafes, and community interactions',
        'Showcasing full BOGO brand collections',
      ],
      experience: [
        {
          title: 'Everything Under One Roof',
          desc: 'A carefully curated mix of specialised BOGO collections for everyday lifestyle needs.',
        },
        {
          title: 'Designed for Discovery',
          desc: 'Customers explore new products, experiences, and multiple categories within one destination.',
        },
        {
          title: 'Beyond Shopping',
          desc: 'Food, cafes, community spaces, and experiences create an enjoyable shopping destination.',
        },
        {
          title: 'Powered by Technology',
          desc: 'Smart digital solutions enhance convenience, connected experiences, and transparent shopping journeys.',
        },
        {
          title: 'A Platform for Growth',
          desc: 'New BOGO concepts are refined and strengthened before wider ecosystem expansion.',
        },
      ],
      description:
        'BOGO Square is the flagship destination of the BOGO ecosystem, bringing specialised brands, experiences, and smart technology together under one roof. A connected destination for shopping, dining, lifestyle, and discovery.',
      logoPath: '/bogo/logos/bogo-square.png',
      imagePath: '/bogo/stores/bogo-square-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-bazaar',
      name: 'BOGO Bazaar',
      headline: 'A destination closer to home.',
      promise: 'Complete family shopping in high-street residential neighbourhoods.',
      size: '4,000–6,000 sq. ft.',
      idealFor: [
        'Weekly family shopping',
        'Residential communities',
        'Growing urban neighbourhoods',
        'High-street retail locations',
      ],
      experience: [
        {
          title: 'More Choice',
          desc: 'A wider assortment across everyday household categories.',
        },
        {
          title: 'More Discovery',
          desc: 'Explore BOGO collection brands conveniently under one neighbourhood roof.',
        },
        {
          title: 'More Convenience',
          desc: 'Everything needed for a complete weekly shopping trip.',
        },
      ],
      description:
        'BOGO Bazaar brings the BOGO experience closer to communities through a medium-format retail store offering everyday essentials, specialised brands, and convenient shopping in neighbourhood locations.',
      logoPath: '/bogo/logos/bogo-bazaar.png',
      imagePath: '/bogo/stores/bogo-bazaar-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-mini',
      name: 'BOGO Mini',
      headline: 'Everyday essentials within reach.',
      promise: 'Quick shopping trips and daily essentials always near you.',
      size: 'Around 2,000 sq. ft.',
      idealFor: [
        'Daily quick shopping',
        'Apartment communities',
        'Office districts',
        'Transit and neighbourhood locations',
      ],
      experience: [
        {
          title: 'Quick Visits',
          desc: 'Designed for rapid, friction-free transactions and daily convenience.',
        },
        {
          title: 'Everyday Essentials',
          desc: 'Focused on the products customers buy most often throughout the week.',
        },
        {
          title: 'Closer to Customers',
          desc: 'Conveniently located where people live, commute, and work.',
        },
      ],
      description:
        'BOGO Mini is the most accessible BOGO retail format, designed for quick shopping trips and daily essentials. Located in neighbourhoods, it brings convenient everyday shopping closer to customers.',
      logoPath: '/bogo/logos/bogo-mini.png',
      imagePath: '/bogo/stores/bogo-mini-concept.webp',
      caption: 'Concept',
    },
  ] as BogoFormat[],

  // Distribution: BOGO Go
  distribution: {
    slug: 'bogo-go',
    name: 'BOGO Go',
    headline: 'Connecting products to people',
    summary:
      'BOGO Go is the distribution and supply chain arm of the BOGO ecosystem. It ensures that products move efficiently from manufacturers and suppliers to BOGO stores, retail partners, and customers, creating a reliable network that supports sustainable growth.',
    capabilities: [
      'Product distribution across urban centres',
      'Supply chain management and monitoring',
      'Automated inventory replenishment',
      'Retail shelf restocking and fulfilment',
      'Logistics coordination and tracking',
      'Last-mile store support',
    ],
    promises: [
      {
        title: 'Reliable Distribution',
        desc: 'Ensuring products reach the right place at the right time without stockouts.',
      },
      {
        title: 'Efficient Operations',
        desc: 'Streamlining the movement of goods across the entire BOGO retail network.',
      },
      {
        title: 'Scalable Growth',
        desc: 'Building a distribution network that expands alongside opening BOGO stores.',
      },
    ],
    vision:
      'To build India’s most coordinated retail logistics platform, ensuring continuous inventory movement and dependable supply across every store format.',
    logoPath: '/bogo/logos/bogo-go.png',
    imagePath: '/bogo/stores/bogo-go-concept.webp',
    caption: 'Concept',
  },

  // 11 Category Brands
  categoryBrands: [
    {
      slug: 'bogo-essentials',
      name: 'BOGO Essentials',
      tagline: 'Everyday essentials for every home.',
      summary:
        'BOGO Essentials brings together the household and personal care products that families use every day. From home care to personal hygiene, the brand focuses on quality, convenience, and value, making it easy to find trusted essentials under one roof.',
      color: '#149395',
      productLines: [
        'Bath and body care',
        'Hair care products',
        'Oral care essentials',
        'Household cleaning products',
        'Laundry and fabric care',
        'Home and hygiene essentials',
      ],
      promises: [
        {
          title: 'Trusted Everyday Brands',
          desc: 'A carefully selected range of products from leading and reliable makers.',
        },
        {
          title: 'Value for Every Household',
          desc: 'Everyday essentials at competitive prices without compromising on quality.',
        },
        {
          title: 'Always Within Reach',
          desc: 'Keeping household necessities consistently available for every family.',
        },
      ],
      vision:
        'To become every household’s trusted destination for daily essentials by delivering quality, convenience, and value in every shopping experience.',
      logoPath: '/bogo/logos/bogo-essentials.png',
      imagePath: '/bogo/stores/bogo-essentials-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-daily',
      name: 'BOGO Daily',
      tagline: 'Your destination for everyday food essentials.',
      summary:
        'BOGO Daily brings together a comprehensive range of packaged food products that households rely on every day. From pantry staples to dairy and beverages, the brand offers trusted food products that make everyday cooking convenient, reliable, and affordable.',
      color: '#EB7C20',
      productLines: [
        'Packaged grocery products',
        'Rice, grains, and pulses',
        'Dairy products and staples',
        'Snacks and confectionery',
        'Beverages and packaged drinks',
        'Frozen and packaged foods',
      ],
      promises: [
        {
          title: 'Trusted Food Brands',
          desc: 'A carefully selected range from leading national and regional producers.',
        },
        {
          title: 'Complete Pantry Solutions',
          desc: 'Everything needed to stock the kitchen, organized in one clean aisle.',
        },
        {
          title: 'Freshness You Can Trust',
          desc: 'Quality products stored and managed to maintain strict safety and freshness.',
        },
      ],
      vision:
        'To become the preferred destination for packaged food by offering trusted brands, everyday convenience, and a complete range of pantry essentials for every household.',
      logoPath: '/bogo/logos/bogo-daily.png',
      imagePath: '/bogo/stores/bogo-daily-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-farms',
      name: 'BOGO Farms',
      tagline: 'Pure. Organic. Naturally better.',
      summary:
        'BOGO Farms is dedicated to bringing organically grown food products to customers who value healthy and sustainable living. By working with trusted farmers and responsible producers, the brand delivers fresh, natural, and chemical-conscious products from farm to shelf.',
      color: '#02A04A',
      productLines: [
        'Organic fruits',
        'Organic vegetables',
        'Organic food products',
        'Organic powders and super greens',
        'Natural health ingredients',
        'Farm-fresh seasonal produce',
      ],
      promises: [
        {
          title: 'Certified Quality',
          desc: 'Carefully sourced organic produce customers can trust implicitly.',
        },
        {
          title: 'Naturally Fresh',
          desc: 'Fresh produce selected for peak nutrition, natural aroma, and taste.',
        },
        {
          title: 'Responsible Farming',
          desc: 'Supporting sustainable agricultural practices and fair-treatment growers.',
        },
      ],
      vision:
        'To make organic living more accessible by connecting customers with trusted, naturally grown agricultural produce every day.',
      logoPath: '/bogo/logos/bogo-farms.png',
      imagePath: '/bogo/stores/bogo-farms-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-superfoods',
      name: 'BOGO Superfoods',
      tagline: 'Nutrition for a healthier tomorrow.',
      summary:
        'BOGO Superfoods offers a curated range of nutrition-focused products that support healthier lifestyles. From everyday wellness to active athletic living, the brand provides verified products that help customers make informed choices for their health and wellbeing.',
      color: '#1E345F',
      productLines: [
        'Protein supplements',
        'Functional health foods',
        'Nutritional supplements',
        'Nutrient-dense snacks',
        'Vitamins and minerals',
        'Targeted wellness formulations',
      ],
      promises: [
        {
          title: 'Science-Led Nutrition',
          desc: 'Products selected to support modern health, recovery, and wellness goals.',
        },
        {
          title: 'Trusted Quality',
          desc: 'A verified range from reputable, lab-certified nutrition makers.',
        },
        {
          title: 'Wellness Made Simple',
          desc: 'Making clean nutrition understandable, transparent, and easy to choose.',
        },
      ],
      vision:
        'To inspire healthier lifestyles by making trusted nutrition and wellness products accessible to every customer through expert selection and dependable quality.',
      logoPath: '/bogo/logos/bogo-superfoods.png',
      imagePath: '/bogo/stores/bogo-superfoods-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-health',
      name: 'BOGO Health',
      tagline: 'Wellness you can trust.',
      summary:
        'BOGO Health is dedicated to supporting everyday wellbeing by bringing together trusted healthcare products, wellness essentials, and over-the-counter solutions in one convenient destination. The brand makes everyday healthcare more accessible through carefully selected products and reliable guidance.',
      color: '#5C6C7B',
      productLines: [
        'Over-the-counter wellness solutions',
        'Ayurvedic and herbal formulations',
        'Vitamins and daily supplements',
        'Personal healthcare essentials',
        'First aid and home medical items',
        'Preventive health care solutions',
      ],
      promises: [
        {
          title: 'Trusted Healthcare',
          desc: 'Products sourced exclusively from reputable, licensed healthcare brands.',
        },
        {
          title: 'Wellness for Everyone',
          desc: 'Everyday healthcare solutions that are simple, accessible, and dependable.',
        },
        {
          title: 'Care with Confidence',
          desc: 'Helping customers make informed, reassuring choices for family health.',
        },
      ],
      vision:
        'To become a trusted neighbourhood destination for everyday healthcare by making wellness products accessible, reliable, and convenient for every family.',
      logoPath: '/bogo/logos/bogo-health.png',
      imagePath: '/bogo/stores/bogo-health-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-beauty',
      name: 'BOGO Beauty',
      tagline: 'Beauty that inspires confidence.',
      summary:
        'BOGO Beauty offers a curated collection of skincare, cosmetics, haircare, and personal care products from trusted brands. Designed for customers of all ages, it brings together beauty, self-care, and everyday essentials in one welcoming destination.',
      color: '#9E2C37',
      productLines: [
        'Dermatological skincare',
        'Cosmetics and makeup',
        'Specialised haircare',
        'Fragrances and mists',
        'Personal care essentials',
        'Beauty accessories and tools',
      ],
      promises: [
        {
          title: 'Curated Selection',
          desc: 'A thoughtful range of verified skincare and cosmetic brands.',
        },
        {
          title: 'Quality You Deserve',
          desc: 'Formulations chosen for performance, safety, and dermatological integrity.',
        },
        {
          title: 'Beauty for Every Routine',
          desc: 'Products that support daily hygiene routines as well as celebratory occasions.',
        },
      ],
      vision:
        'To create a trusted beauty destination where customers can discover quality products, express their individuality, and feel confident every day.',
      logoPath: '/bogo/logos/bogo-beauty.png',
      imagePath: '/bogo/stores/bogo-beauty-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-luxe',
      name: 'BOGO Luxe',
      tagline: 'Premium products. Curated experiences.',
      summary:
        'BOGO Luxe offers an exclusive collection of imported, premium, and collaborative products for customers seeking distinctive craftsmanship. From international gourmet selections to thoughtfully curated gift hampers, BOGO Luxe delivers a refined shopping experience built around quality and exclusivity.',
      color: '#6F357C',
      productLines: [
        'Imported confectionery and beverages',
        'Premium festive gift hampers',
        'International lifestyle products',
        'Collaborative designer ranges',
        'Luxury personal care selections',
        'Exclusive seasonal collections',
      ],
      promises: [
        {
          title: 'Curated Exclusivity',
          desc: 'A distinctive collection of rare, imported, and small-batch products.',
        },
        {
          title: 'Global Quality',
          desc: 'Bringing renowned international brands directly to Indian retail shelves.',
        },
        {
          title: 'Exceptional Gifting',
          desc: 'Thoughtfully packaged presentations designed for personal and corporate gifting.',
        },
      ],
      // Corrected vision as requested in brief (PDF erroneously duplicated Essentials)
      vision:
        'To curate an exceptional collection of imported gourmet foods, artisanal craftsmanship, and luxury gifting that brings the world’s finest retail directly to modern Indian households.',
      logoPath: '/bogo/logos/bogo-luxe.png',
      imagePath: '/bogo/stores/bogo-luxe-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-divine',
      name: 'BOGO Divine',
      tagline: 'Faith. Tradition. Devotion.',
      summary:
        'BOGO Divine offers a thoughtfully curated range of spiritual and devotional products that support everyday worship and meaningful celebrations. The brand combines tradition with convenience, making faith an accessible, respectful part of daily life.',
      color: '#8B8937',
      productLines: [
        'Pooja and prayer essentials',
        'Incense, dhoop, and fragrances',
        'Fresh offerings and ceremonial supplies',
        'Idols and sacred brassware',
        'Festive and seasonal collections',
        'Spiritual gifting hampers',
      ],
      promises: [
        {
          title: 'Respecting Tradition',
          desc: 'Products that honour authentic cultural, Vedic, and spiritual practices.',
        },
        {
          title: 'Authentic Purity',
          desc: 'Carefully prepared devotional ingredients with verified purity.',
        },
        {
          title: 'Meaningful Experiences',
          desc: 'Supporting quiet moments of daily prayer and large family celebrations alike.',
        },
      ],
      vision:
        'To become a trusted destination for devotional products by preserving time-honoured traditions while making spiritual living simple, pure, and accessible.',
      logoPath: '/bogo/logos/bogo-divine.png',
      imagePath: '/bogo/stores/bogo-divine-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-paws',
      name: 'BOGO Paws',
      tagline: 'Everything your pets deserve.',
      summary:
        'BOGO Paws is a complete destination for pet owners, bringing together quality nutrition, toys, accessories, and pet care guidance. From nutritious food to grooming and hygiene, every offering is designed with the health and happiness of pets in mind.',
      color: '#EB9C03',
      productLines: [
        'Nutritious pet food and treats',
        'Pet grooming and hygiene items',
        'Accessories, collars, and leashes',
        'Interactive toys and scratchers',
        'Comfort bedding and travel carriers',
        'Preventive wellness and coat care',
      ],
      promises: [
        {
          title: 'Complete Pet Care',
          desc: 'Essential foods and accessories designed for every breed and life stage.',
        },
        {
          title: 'Trusted Nutrition',
          desc: 'Veterinarian-approved diets free from harmful fillers and additives.',
        },
        {
          title: 'Happy Pets, Happy Families',
          desc: 'Creating healthier, playful lives for companion animals and their guardians.',
        },
      ],
      vision:
        'To become the preferred destination for pet parents by delivering wholesome products, reliable accessories, and attentive support for every pet family.',
      logoPath: '/bogo/logos/bogo-paws.png',
      imagePath: '/bogo/stores/bogo-paws-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-play',
      name: 'BOGO Play',
      tagline: 'Where imagination comes to life.',
      summary:
        'BOGO Play is an interactive destination where children and families discover toys, games, learning kits, and creative activities. Designed to encourage curiosity, critical thinking, and social play, it transforms shopping into an experience children eagerly anticipate.',
      color: '#EA5735',
      productLines: [
        'Stem and educational toys',
        'Creative arts and crafts play',
        'Board games and family puzzles',
        'Active outdoor play gear',
        'Collectibles and hobby sets',
        'Sensory development toys',
      ],
      promises: [
        {
          title: 'Learning Through Play',
          desc: 'Engaging toys that stimulate creativity, hand-eye coordination, and discovery.',
        },
        {
          title: 'Safe & Certified',
          desc: 'Non-toxic, rigorously safety-tested materials from recognised manufacturers.',
        },
        {
          title: 'Fun for Every Age',
          desc: 'Entertaining games that bring parents and children together.',
        },
      ],
      vision:
        'To inspire childhood creativity and active learning by providing engaging toys and playful experiences that spark curiosity and lasting growth.',
      logoPath: '/bogo/logos/bogo-play.png',
      imagePath: '/bogo/stores/bogo-play-concept.webp',
      caption: 'Concept',
    },
    {
      slug: 'bogo-classroom',
      name: 'BOGO Classroom',
      tagline: 'Learning beyond the classroom.',
      summary:
        'BOGO Classroom is dedicated to supporting learners of every age through school stationery, office supplies, educational books, and project resources. It brings together everything students, teachers, and lifelong learners need in one inspiring location.',
      color: '#294189',
      productLines: [
        'Reference books and study guides',
        'School and office stationery',
        'Hands-on educational project kits',
        'Art and architecture drafting supplies',
        'Organization and desk accessories',
        'Skill development learning materials',
      ],
      promises: [
        {
          title: 'Supporting Every Learner',
          desc: 'Tools and supplies tailored for kindergarteners, university students, and professionals.',
        },
        {
          title: 'Accessible Quality',
          desc: 'Durable, high-grade stationery and paper at reasonable student prices.',
        },
        {
          title: 'Inspiring Curiosity',
          desc: 'Resources that make homework, creative writing, and study sessions enjoyable.',
        },
      ],
      vision:
        'To build a trusted learning destination that empowers students, teachers, and curious minds through dependable stationery and educational tools.',
      logoPath: '/bogo/logos/bogo-classroom.png',
      imagePath: '/bogo/stores/bogo-classroom-concept.webp',
      caption: 'Concept',
    },
  ] as BogoCategoryBrand[],

  // 4 Programmes
  programmes: [
    {
      slug: 'bogo-life',
      name: 'BOGO Life',
      headline: 'Exclusive benefits. Everyday corporate savings.',
      summary:
        'BOGO Life is the corporate engagement platform within the BOGO ecosystem. By partnering with leading organisations, it provides working professionals with exclusive shopping privileges, dedicated corporate discounts, and customised employee reward programmes.',
      pillars: [
        {
          title: 'More Value',
          desc: 'Exclusive savings and tiered pricing beyond regular in-store promotions.',
        },
        {
          title: 'Stronger Partnerships',
          desc: 'Customised benefit programmes designed specifically for employer partners.',
        },
        {
          title: 'Everyday Benefits',
          desc: 'Making quality household shopping more rewarding for working professionals.',
        },
      ],
      vision:
        'To become India’s preferred corporate retail benefits programme by establishing meaningful workplace partnerships that reward employees and strengthen employer loyalty.',
      logoPath: '/bogo/logos/bogo-life.png',
    },
    {
      slug: 'bogo-companion',
      name: 'BOGO Companion',
      headline: 'More than membership. A better way to experience BOGO.',
      summary:
        'BOGO Companion brings customers closer to the stores, brands, and digital services across the BOGO ecosystem. Through one connected membership, patrons access extra savings, reward points, and festive privileges across all eleven category brands.',
      pillars: [
        {
          title: 'Membership',
          desc: 'Belong to the unified BOGO ecosystem with a single unified identity.',
        },
        {
          title: 'Subscription',
          desc: 'Select flexible subscription options for higher savings on staples.',
        },
        {
          title: 'Privileges',
          desc: 'Enjoy special member pricing, seasonal previews, and priority checkout.',
        },
      ],
      journey: [
        { step: '01', title: 'Join', desc: 'Become a member through a rapid, single-click digital sign-up.' },
        { step: '02', title: 'Engage', desc: 'Shop across BOGO brands and stores while earning tier points.' },
        { step: '03', title: 'Reward', desc: 'Redeem points and access bespoke member coupons on daily staples.' },
        { step: '04', title: 'Return', desc: 'Experience progressively greater value and lasting relationship benefits.' },
      ],
      benefits: [
        { title: 'Exclusive Discounts', desc: 'Special member-only rates across fresh and pantry essentials.' },
        { title: 'Reward Points', desc: 'Earn points on every physical and online checkout transaction.' },
        { title: 'Festival Offers', desc: 'Early bird access and higher festive discounts during holiday seasons.' },
        { title: 'Birthday Treats', desc: 'Surprise celebration discounts and complimentary tokens during birthday month.' },
      ],
      vision:
        'To unify everyday retail through an equitable membership programme where frequent patrons continuously accumulate real, practical household value.',
      logoPath: '/bogo/logos/bogo-companion.png',
    },
    {
      slug: 'bogo-affairs',
      name: 'BOGO Affairs',
      headline: 'A voice for the BOGO ecosystem.',
      summary:
        'BOGO Affairs is a dedicated editorial and communications platform created to keep customers, partners, and employees informed and engaged. Beginning as an ecosystem newsletter, it is planned to evolve into a broader retail and FMCG community publication.',
      pillars: [
        { title: 'Inform', desc: 'Sharing updates, store openings, and operational milestones.' },
        { title: 'Connect', desc: 'Building an active community of producers, suppliers, and retail patrons.' },
        { title: 'Engage', desc: 'Highlighting supplier origin stories and behind-the-scenes craft.' },
        { title: 'Evolve', desc: 'Expanding coverage to examine broader retail industry trends and developments.' },
      ],
      // Note: Dates (2027-2028) are plans, not facts, as instructed in brief
      journey: [
        { step: '01', title: 'Inform (Planned)', desc: 'Launch digital bulletin sharing updates and stories across the BOGO network.' },
        { step: '02', title: 'Connect (Planned)', desc: 'Foster active community discussions around local producers and sustainable sourcing.' },
        { step: '03', title: 'Engage (Planned 2027)', desc: 'Roll out dedicated communication initiatives for partner brands in the ecosystem.' },
        { step: '04', title: 'Evolve (Planned 2028)', desc: 'Expand editorial scope to cover Indian FMCG market trends and modern retail analysis.' },
      ],
      vision:
        'To become an authoritative, transparent window into modern Indian commerce, tracing how responsible brands and regional communities thrive together.',
      logoPath: '/bogo/logos/bogo-affairs.png',
    },
    {
      slug: 'bogo-partner',
      name: 'BOGO Partner',
      headline: 'Building businesses together through shared equity.',
      summary:
        'BOGO Partner is a collaborative growth platform where promising emerging brands receive prominent retail shelf space, prime endcaps, and distribution coordination within the BOGO ecosystem in exchange for strategic equity participation.',
      pillars: [
        { title: 'Retail Shelf Space', desc: 'Guaranteed placement across high-traffic BOGO retail store formats.' },
        { title: 'Strategic Equity', desc: 'Aligning business incentives through long-term collaborative ownership.' },
        { title: 'Distribution Support', desc: 'Immediate access to the BOGO Go supply and inventory replenishment network.' },
      ],
      vision:
        'To build India’s most collaborative retail platform where promising consumer businesses and BOGO scale together through shared investment and mutual success.',
      logoPath: '/bogo/logos/bogo-partner.png',
    },
  ] as BogoProgram[],

  // Technology Vision: 6 Phases
  technologyVision: {
    headline: 'Building the Future of Retail, One Phase at a Time',
    summary:
      'Technology at BOGO is introduced through a planned phased roadmap, ensuring that every digital upgrade directly simplifies the customer visit while keeping operations transparent and lean.',
    phases: [
      {
        phase: 1,
        title: 'Purchase History',
        desc: 'A connected shopping history in the BOGO app that helps customers review past purchases, track recurring household expenditure, and re-order pantry staples quickly.',
        status: 'Planned',
      },
      {
        phase: 2,
        title: 'Smart Basket',
        desc: 'An intelligent shopping basket that automatically tallies selected items and synchronises with the customer’s active shopping list in real time.',
        status: 'Planned',
      },
      {
        phase: 3,
        title: 'Concierge Service',
        desc: 'Patrons can browse inventory and place advance pre-orders, arriving at their neighbourhood store simply to pick up pre-packed groceries.',
        status: 'Planned',
      },
      {
        phase: 4,
        title: 'Smart Trolley',
        desc: 'An interactive trolley fitted with a digital scanner and screen, offering route-optimised navigation, instant price verification, and self-checkout capability.',
        status: 'Planned',
      },
      {
        phase: 5,
        title: 'Home Delivery',
        desc: 'Scheduled zero-emission home delivery for large or bulky orders, linking high-street store inventory directly to neighbourhood residential addresses.',
        status: 'Planned',
      },
      {
        phase: 6,
        title: 'Intelligent Product Discovery',
        desc: 'Interactive product scanning allowing customers to instantly inspect nutritional profiles, organic certifications, manufacturing origins, and allergen details.',
        status: 'Planned',
      },
    ] as BogoTechPhase[],
  },

  // Growth Roadmap: 4 Phases (Plans)
  growthRoadmap: {
    headline: 'Phased Growth Strategy',
    summary:
      'A disciplined, four-phase plan balancing store development with supply chain infrastructure, progressively expanding from Ahmedabad across western and national markets.',
    phases: [
      {
        phase: '01',
        title: 'Build the Foundation (Planned)',
        milestones: [
          'Launch BOGO Square flagship format',
          'Establish central warehousing and core retail operations',
          'Introduce initial flagship BOGO collection brands',
          'Standardise store staffing and service touchpoints',
        ],
      },
      {
        phase: '02',
        title: 'Expand the Network (Planned)',
        milestones: [
          'Open BOGO Bazaar stores in primary residential corridors',
          'Deploy BOGO Mini locations in high-density communities',
          'Strengthen BOGO Go logistics and replenishment cycles',
          'Expand footprint into surrounding tier-1 and tier-2 Gujarat cities',
        ],
      },
      {
        phase: '03',
        title: 'Enable Growth (Planned)',
        milestones: [
          'Deploy smart basket and self-checkout technology across all stores',
          'Expand equity collaborations through BOGO Partner',
          'Broaden category brands portfolio to full 11 product lines',
          'Roll out BOGO Companion membership privileges',
        ],
      },
      {
        phase: '04',
        title: 'Lead the Future of Retail (Planned)',
        milestones: [
          'Operate interconnected national store and distribution grid',
          'Scale BOGO Go distribution to third-party retail partners',
          'Incorporate full predictive inventory and intelligent discovery',
          'Deliver long-term enterprise value across customers and partners',
        ],
      },
    ] as BogoGrowthPhase[],
  },
};

export default bogoContent;
