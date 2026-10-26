export interface HeroSlide {
  word: string;
  bgColor: string;
  wordColor: string;
  textColor: string;
  sentenceColor: string;
  headerTone: 'light' | 'dark';
  buttonStyle: 'white' | 'dark';
}

export interface DrawingAnnotation {
  text: string;
  targetX: number;
  targetY: number;
  elbowX: number;
  elbowY: number;
  align: 'start' | 'end';
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    word: 'facades',
    bgColor: '#0E0E10', // ink
    wordColor: '#F58220', // orange
    textColor: '#FFFFFF',
    sentenceColor: '#D1D5DB', // neutral-300
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'homes',
    bgColor: '#A84325', // warm terracotta
    wordColor: '#FFF1EC', // warm cream
    textColor: '#FFFFFF',
    sentenceColor: '#FCE4DC',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'masalas',
    bgColor: '#D99400', // rich turmeric yellow
    wordColor: '#1A0B00', // deep burnt umber
    textColor: '#0E0E10', // dark text for AA contrast (8.2:1)
    sentenceColor: '#281300',
    headerTone: 'dark',
    buttonStyle: 'dark',
  },
  {
    word: 'brands',
    bgColor: '#154D28', // deep green
    wordColor: '#D2F8DD', // pale fresh mint
    textColor: '#FFFFFF',
    sentenceColor: '#E2FBEA',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'stays',
    bgColor: '#0D565C', // teal
    wordColor: '#D8FAFC', // ice aqua
    textColor: '#FFFFFF',
    sentenceColor: '#E6FBFC',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'skills',
    bgColor: '#274B76', // soft cadet blue
    wordColor: '#DCEBFC', // pale sky
    textColor: '#FFFFFF',
    sentenceColor: '#EDF5FD',
    headerTone: 'light',
    buttonStyle: 'white',
  },
  {
    word: 'retail',
    bgColor: '#0F2A5C', // BOGO navy
    wordColor: '#F58A33', // BOGO orange
    textColor: '#FFFFFF',
    sentenceColor: '#D8E4F8',
    headerTone: 'light',
    buttonStyle: 'white',
  },
];

export const HERO_ANNOTATIONS: DrawingAnnotation[][] = [
  // 0: facades (HRS Aluglaze)
  [
    {
      text: 'curtain wall, 38 storeys',
      targetX: 400,
      targetY: 240,
      elbowX: 580,
      elbowY: 240,
      align: 'start',
    },
    {
      text: 'unitised aluminium',
      targetX: 280,
      targetY: 420,
      elbowX: 180,
      elbowY: 420,
      align: 'end',
    },
  ],

  // 1: homes (Hrishikesh Ventures)
  [
    {
      text: 'Shela',
      targetX: 400,
      targetY: 270,
      elbowX: 230,
      elbowY: 270,
      align: 'end',
    },
    {
      text: '4 BHK villas',
      targetX: 400,
      targetY: 560,
      elbowX: 580,
      elbowY: 560,
      align: 'start',
    },
  ],

  // 2: masalas (Hrishikesh Food Products, Bavla)
  [
    {
      text: 'job work and white label',
      targetX: 280,
      targetY: 440,
      elbowX: 180,
      elbowY: 440,
      align: 'end',
    },
    {
      text: 'Bavla processing',
      targetX: 520,
      targetY: 560,
      elbowX: 630,
      elbowY: 500,
      align: 'start',
    },
  ],

  // 3: brands (Hrishikesh Consumer Products)
  [
    {
      text: 'daily essentials',
      targetX: 340,
      targetY: 440,
      elbowX: 180,
      elbowY: 440,
      align: 'end',
    },
    {
      text: '13 brand portfolio',
      targetX: 480,
      targetY: 480,
      elbowX: 580,
      elbowY: 480,
      align: 'start',
    },
  ],

  // 4: stays (FirstGen Hotels & Enterprises)
  [
    {
      text: 'business stays',
      targetX: 380,
      targetY: 440,
      elbowX: 180,
      elbowY: 440,
      align: 'end',
    },
    {
      text: 'Amuktamalyada',
      targetX: 530,
      targetY: 340,
      elbowX: 600,
      elbowY: 340,
      align: 'start',
    },
  ],

  // 5: skills (School of Facade Technologies)
  [
    {
      text: 'facade engineering',
      targetX: 400,
      targetY: 210,
      elbowX: 550,
      elbowY: 210,
      align: 'start',
    },
    {
      text: 'site inspection',
      targetX: 240,
      targetY: 480,
      elbowX: 170,
      elbowY: 480,
      align: 'end',
    },
  ],

  // 6: retail (BOGO flagship)
  [
    {
      text: 'multi-brand retail',
      targetX: 300,
      targetY: 310,
      elbowX: 170,
      elbowY: 310,
      align: 'end',
    },
    {
      text: 'BOGO flagship',
      targetX: 460,
      targetY: 480,
      elbowX: 590,
      elbowY: 480,
      align: 'start',
    },
  ],
];

export const MARQUEE_ENTITIES = [
  'HRS Aluglaze',
  'Hrishikesh Ventures',
  'BOGO',
  'Manpras',
  'Geotrix',
  'School of Facade Technologies',
  'Hrishikesh Food Products',
  'Hrishikesh Consumer Products',
  'FirstGen Assets',
  'Flight Stays',
  'Amuktamalyada',
  'The Bluprint',
  'ShubhVista',
  'Indian Brand House',
];
