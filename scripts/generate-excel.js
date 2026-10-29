const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://subhash-seeni.github.io/HRS-Group-Website';

const pagesData = [
  // 1. Core Corporate Pages
  {
    category: 'Core Corporate',
    pageName: 'Homepage',
    route: '/',
    url: `${BASE_URL}/`,
    primaryOwner: 'Corporate Marketing / Leadership',
    contentNeeded: 'Rolling hero statements (facades, homes, masalas, brands, stays, identities); parent group value proposition; 5 sector preview blurbs; verified key enterprise figures (founding year 2010, 4 operating hubs, manufacturing capacity).',
    metricsNeeded: 'Founding year (2010), total real estate developments (14), Sanand plant monthly facade capacity (18,000 sq m), Bavla milling capacity (3,200 MT).',
    mediaRequirements: 'High-res Ahmedabad skyline banner, corporate lobby photo, interactive hero parametric mesh theme.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'About Us',
    route: '/about',
    url: `${BASE_URL}/about/`,
    primaryOwner: 'Corporate Communications / HR',
    contentNeeded: '16-year corporate narrative (2010 founding to multi-sector enterprise); 6 core value descriptions (Faith, Trust, Foundation, People, Process, Service); chronological milestones timeline (2010, 2014, 2018, 2021, 2024); bios for 7 executive directors.',
    metricsNeeded: '16 operational years, 7 executive directors, 4 physical campuses.',
    mediaRequirements: '7 leadership portrait headshots (high-contrast, professional attire), corporate office lobby photo, Sanand campus exterior.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Businesses Directory',
    route: '/businesses',
    url: `${BASE_URL}/businesses/`,
    primaryOwner: 'Group Business Development',
    contentNeeded: 'Overview paragraph for each of the 5 core operating sectors; 1-sentence descriptor for each of the 11 operating companies; summary of 4 physical operating campuses.',
    metricsNeeded: 'Live metric chips for each company (capacities, territory, floor area).',
    mediaRequirements: 'Hero cards for all operating entities with 16:10 photography; campus photos of Sanand, Bavla, Ahmedabad, and Bengaluru.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Developments & Facade Portfolio',
    route: '/projects',
    url: `${BASE_URL}/projects/`,
    primaryOwner: 'Hrishikesh Ventures & Aluglaze Project Desks',
    contentNeeded: 'Project profiles for 14 Hrishikesh Ventures residential/commercial developments + 2 flagship facade projects; architectural typologies (residential, commercial, joint-venture, facade engineering); completion year or construction stage; unit counts and scale.',
    metricsNeeded: '16 projects, floor counts (11 to 21 floors), unitised curtain wall areas (18,500 sq m and 24,000 sq m), structural wind load ratings (2.2 kPa).',
    mediaRequirements: 'High-resolution architectural renders and civil site construction photos (16:10 aspect ratio).',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Sustainability & Operational Governance',
    route: '/sustainability',
    url: `${BASE_URL}/sustainability/`,
    primaryOwner: 'Technical Quality & EHS Desks',
    contentNeeded: 'Detailed copy for 3 operational sustainability pillars: 1. High-performance building skins (thermal breaks, SHGC, HVAC energy cuts); 2. Clean botanical processing (chemical-free cold milling, optical sortation, allergen control); 3. Vocational trade safety (School of Facade Technologies fall-arrest rigging, crane safety).',
    metricsNeeded: 'HVAC load cut percentage (up to 28%), Solar Heat Gain Coefficient (< 0.25), cold milling temperature (< 42°C), volatile oil retention (> 99.2%), annual certified technicians (80+).',
    mediaRequirements: 'Close-up of double-glazed curtain wall thermal break, stone milling bay at Bavla, facade training workshop benches.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Media Center & Press Kit',
    route: '/media',
    url: `${BASE_URL}/media/`,
    primaryOwner: 'PR & Corporate Communications',
    contentNeeded: 'Enterprise factsheet at a glance; approved corporate spokesperson bios & quote authorization; press contact protocol (email, telephone, office hours); brand guidelines summary for editorial publishers.',
    metricsNeeded: 'Key group milestones, facility sizes, annual turnover tier (if disclosable), leadership tenure.',
    mediaRequirements: 'Downloadable vector SVG and high-resolution PNG logos; high-res editorial facility photography archive.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Vendor & Partner Desk',
    route: '/partners',
    url: `${BASE_URL}/partners/`,
    primaryOwner: 'Procurement & Supply Chain Desk',
    contentNeeded: 'Procurement requirements across 4 tracks: Industrial extrusions (6063-T6), float glass, agricultural whole spices (APMC), BOGO retail distribution products, and contract logistics; 4-step onboarding pathway; vendor compliance expectations.',
    metricsNeeded: 'Standard 30-day payment turnaround SLA, quality testing thresholds.',
    mediaRequirements: 'Track icons and material inspection photography.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Careers Board',
    route: '/careers',
    url: `${BASE_URL}/careers/`,
    primaryOwner: 'Human Resources / Talent Acquisition',
    contentNeeded: 'Overview of 4 operating work environments (Engineering Bay, Botanical Lab, Retail Floor, Hospitality Hub); employee testimonial quotes; summary of core employee welfare benefits; active job count.',
    metricsNeeded: 'Active opening count, campus location badges, experience ranges.',
    mediaRequirements: 'Workplace photography of technicians at CNC machinery, food lab, retail floor, and front office.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Contact Us & Commercial Inquiries',
    route: '/contact',
    url: `${BASE_URL}/contact/`,
    primaryOwner: 'Operations Secretariat',
    contentNeeded: 'Full physical postal addresses, telephone numbers, and operating hours for 4 campuses (Ahmedabad HQ, Bengaluru Hub, Sanand Works, Bavla Campus); direct email routing for 6 commercial desks; 4 detailed commercial FAQs.',
    metricsNeeded: '1 working day commercial inquiry response SLA.',
    mediaRequirements: 'Facility photos for all 4 physical campuses.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'News & Announcements Index',
    route: '/news',
    url: `${BASE_URL}/news/`,
    primaryOwner: 'Editorial / Communications',
    contentNeeded: 'Lead featured article summary; list of operational disclosures and announcements with dates, locations, and sector tags.',
    metricsNeeded: 'Dates, panel output figures, civil milestones.',
    mediaRequirements: 'Editorial preview photography for all articles (16:10 aspect ratio).',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Privacy Policy',
    route: '/privacy',
    url: `${BASE_URL}/privacy/`,
    primaryOwner: 'Legal & Compliance Desk',
    contentNeeded: 'Comprehensive corporate data governance clauses covering commercial tenders, CAD drawings, job applications, and analytics; data retention periods; DPDP statutory compliance details; corporate secretariat postal contact.',
    metricsNeeded: 'Statutory retention periods (e.g. 12 months for CVs, project duration for drawings).',
    mediaRequirements: 'Structured data matrix format.',
    status: 'Ready for copy review',
  },
  {
    category: 'Core Corporate',
    pageName: 'Terms of Use',
    route: '/terms',
    url: `${BASE_URL}/terms/`,
    primaryOwner: 'Legal & Compliance Desk',
    contentNeeded: 'Registered trademarks protection (HRS Group, Aluglaze, Ventures, BOGO, FirstGen); architectural and engineering specifications disclaimer; quotation validity terms (30 days); exclusive jurisdiction of Ahmedabad courts.',
    metricsNeeded: '30-day tender quote validity.',
    mediaRequirements: 'Structured clause cards with icon markers.',
    status: 'Ready for copy review',
  },

  // 2. Operating Business Profiles
  {
    category: 'Operating Business',
    pageName: 'Hrishikesh Ventures',
    route: '/businesses/hrishikesh-ventures',
    url: `${BASE_URL}/businesses/hrishikesh-ventures/`,
    primaryOwner: 'Hrishikesh Ventures Desk',
    contentNeeded: 'Detailed profiles for 13 live developments (H1, H2, H3, H4, H6, H7, H10, W1, Kishor Park, Hrishikesh Villa, Hrishikesh 1, 2, 3) + joint venture H9 on Sindhu Bhavan Road; architectural philosophy; RERA compliance numbers; commercial leasing inquiries protocol.',
    metricsNeeded: '13 live projects, 1 JV, residential unit counts, commercial office sq ft.',
    mediaRequirements: 'High-res renders of residential towers, floor plans, and construction topping-out photos.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'HRS Aluglaze Ltd',
    route: '/businesses/hrs-aluglaze',
    url: `${BASE_URL}/businesses/hrs-aluglaze/`,
    primaryOwner: 'HRS Aluglaze Engineering Desk',
    contentNeeded: 'Sanand manufacturing plant details (120,000 sq ft, 5-axis CNC machining, automated unitised panel assembly line); 4 engineered facade systems (Unitised, Semi-unitised, Spider glazing, Fin louvres); acoustic and thermal parameters; CWCT water test certifications.',
    metricsNeeded: '18,000 sq m monthly capacity (450,000 sq m annual), 38-storey tower capability, 0.5mm fabrication tolerances.',
    mediaRequirements: 'Sanand factory exterior, CNC milling lines, close-up of structural silicone and double-glazed curtain wall.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'Geotrix Pvt. Ltd.',
    route: '/businesses/geotrix',
    url: `${BASE_URL}/businesses/geotrix/`,
    primaryOwner: 'Geotrix Southern Hub Desk',
    contentNeeded: 'Southern India facade operating scope (Bengaluru, Chennai, Hyderabad); on-site crane logistics and high-rise installation methods; coordination with Sanand plant; landmark commercial tech park project references.',
    metricsNeeded: 'Kadubeesanahalli hub address, 24,000 sq m commercial project scale.',
    mediaRequirements: 'Commercial IT corridor curtain wall installation, crane hoisting facade units.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'School of Facade Technologies',
    route: '/businesses/school-of-facade-technologies',
    url: `${BASE_URL}/businesses/school-of-facade-technologies/`,
    primaryOwner: 'Academic Director / Training Desk',
    contentNeeded: 'Detailed breakdown of 3 audience tracks: 1. Students & fresh entrants; 2. Site installers & fabricators; 3. Architects & structural engineers; course syllabus (sealant chemistry, wind loading, seismic displacement, acoustic testing); admission cycles and placement partners.',
    metricsNeeded: '42 certified graduates per cohort, 70% practical workshop ratio, course durations.',
    mediaRequirements: 'Classroom benches, fabrication workshop, pressure-testing test rigs.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'BOGO (Retail Ecosystem)',
    route: '/bogo',
    url: `${BASE_URL}/bogo/`,
    primaryOwner: 'BOGO Retail Strategy Desk',
    contentNeeded: 'Master profile for BOGO retail ecosystem: 5 Pillars (Brands, Technology, Partnerships, Distribution, Retail); 3 retail formats (BOGO Square 10,000+ sq ft, BOGO Bazaar 4,000–6,000 sq ft, BOGO Mini ~2,000 sq ft); BOGO Go distribution supply grid; Companion loyalty program; 11 category brands.',
    metricsNeeded: 'Format square footages (10k+, 4k-6k, 2k), brand counts (11), planned store rollout figures.',
    mediaRequirements: 'BOGO 3D store concept renders, category logos, companion loyalty cards mockups.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'Hrishikesh Food Products',
    route: '/businesses/hrishikesh-food-products',
    url: `${BASE_URL}/businesses/hrishikesh-food-products/`,
    primaryOwner: 'Food Processing Operations Desk',
    contentNeeded: 'Bavla milling campus infrastructure details; 3 operating pathways: 1. Job work (stone milling & pouch packaging for institutional clients); 2. White labelling (custom supermarket spice packaging); 3. Own product lines; quality control and BRCGS global food safety audit ratings.',
    metricsNeeded: '3,200 metric tonnes milling capacity, cold stone milling < 42°C, BRCGS Grade A audit rating.',
    mediaRequirements: 'Whole spices on stone, automated optical sorting bay, cleanroom packaging line.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'Hrishikesh Consumer Products',
    route: '/businesses/hrishikesh-consumer-products',
    url: `${BASE_URL}/businesses/hrishikesh-consumer-products/`,
    primaryOwner: 'FMCG Brand Management Desk',
    contentNeeded: 'Manpras neighbourhood grocery store model (inspired by Magson & Falguni Gruh Udhyog); portfolio of 13 dedicated packaged consumer brands (6 active: Manpras, Snackshot, Antrah, Basic Essentials, Gush, Daily Pump; 7 upcoming: Biscbite, Mood Beans, The Frozen Palette, The Nut Tribe, Defumes, Purple Cow, Raspberry Rhinoceros); product categories and pack sizes.',
    metricsNeeded: '13 consumer brands, retail store square footages, SKU counts.',
    mediaRequirements: 'Manpras retail store facade, packaged spice boxes, snack pouches, branding logos.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'FirstGen Pvt. Ltd.',
    route: '/businesses/firstgen',
    url: `${BASE_URL}/businesses/firstgen/`,
    primaryOwner: 'FirstGen Corporate Secretariat',
    contentNeeded: 'Parent holding umbrella overview for commercial hospitality and leasing operations; capital structure and physical asset ownership model.',
    metricsNeeded: 'Asset portfolio size, regional footprint in Gujarat and Karnataka.',
    mediaRequirements: 'Corporate visual brand mark, commercial architecture.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'FirstGen Assets',
    route: '/businesses/firstgen-assets',
    url: `${BASE_URL}/businesses/firstgen-assets/`,
    primaryOwner: 'Commercial Leasing Desk',
    contentNeeded: 'Breakdown of 4 leasing verticals: Commercial office spaces, ground-floor retail showrooms, warehousing & industrial parks, construction equipment & machinery leasing; lease terms and tenant vetting standards.',
    metricsNeeded: 'Total leasable area, occupancy rates, average lease terms.',
    mediaRequirements: 'Commercial building exteriors, warehouse interior bays, machinery fleet.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'FirstGen Hotels',
    route: '/businesses/firstgen-hotels',
    url: `${BASE_URL}/businesses/firstgen-hotels/`,
    primaryOwner: 'Hospitality Operations Desk',
    contentNeeded: 'Flight Stays serviced apartments (Kadubeesanahalli, ORR Bengaluru; extended-stay engineering suites, high-speed fibre, housekeeping); Amuktamalyada authentic Telugu vegetarian culinary establishment (crispy gare, steamed upma, rava idli, golden pesarattu, ghee roast dosas, regional meals).',
    metricsNeeded: '36-key residential suites, restaurant seating capacity, distance to tech parks (2km).',
    mediaRequirements: 'Serviced apartment bedroom/desk photo, traditional South Indian breakfast spread.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'FirstGen Enterprises',
    route: '/businesses/firstgen-enterprises',
    url: `${BASE_URL}/businesses/firstgen-enterprises/`,
    primaryOwner: 'Retail & Experience Desk',
    contentNeeded: 'The Bluprint by Builders Cafe (cafe, co-working, and building material experience gallery for architects, contractors, and developers); ShubhVista (specialized retail showroom for luxury building materials, architectural hardware, and sanitary fittings).',
    metricsNeeded: 'Experience gallery square footage, co-working desk capacity, vendor product count.',
    mediaRequirements: 'Cafe co-working interior, architectural material sample gallery, hardware display.',
    status: 'Ready for copy review',
  },
  {
    category: 'Operating Business',
    pageName: 'Indian Brand House',
    route: '/businesses/indian-brand-house',
    url: `${BASE_URL}/businesses/indian-brand-house/`,
    primaryOwner: 'Creative Director / Agency Desk',
    contentNeeded: 'Overview of 3 agency pillars: 1. Brand Strategy & Visual Identity; 2. Packaging & Print Systems; 3. Digital & Performance Marketing; portfolio case studies across FMCG, retail, and industrial manufacturing.',
    metricsNeeded: 'Campaign case study metrics, client industry sectors.',
    mediaRequirements: 'Creative studio desks, packaging prototypes, typography and brand identity boards.',
    status: 'Ready for copy review',
  },

  // 3. Career Positions Detail Pages
  {
    category: 'Career Position',
    pageName: 'Senior Structural Facade Engineer',
    route: '/careers/senior-structural-facade-engineer',
    url: `${BASE_URL}/careers/senior-structural-facade-engineer/`,
    primaryOwner: 'HRS Aluglaze Engineering HR',
    contentNeeded: 'Role summary (wind load calculations, unitised panel engineering), required experience (6-10 years, BE/MTech Structural), software proficiency (AutoCAD, Strand7, RFEM), interview process, compensation range.',
    metricsNeeded: '6-10 years experience, Sanand/Ahmedabad location.',
    mediaRequirements: 'HRS Aluglaze Sanand engineering bay photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Facade Estimator & Cost Engineer',
    route: '/careers/facade-estimator-cost-engineer',
    url: `${BASE_URL}/careers/facade-estimator-cost-engineer/`,
    primaryOwner: 'HRS Aluglaze Commercial HR',
    contentNeeded: 'Bill of quantities preparation, aluminium extrusion index pricing, glass procurement tendering, tender bid submission management.',
    metricsNeeded: '4-7 years experience, Bodakdev Ahmedabad location.',
    mediaRequirements: 'Corporate office engineering desk photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Site Installation Manager',
    route: '/careers/site-installation-manager',
    url: `${BASE_URL}/careers/site-installation-manager/`,
    primaryOwner: 'Geotrix Bengaluru HR',
    contentNeeded: 'Crane rigging, tower cradle facade panel installation, site safety supervision, high-rise wind monitoring along Outer Ring Road corridor.',
    metricsNeeded: '7-12 years experience, Kadubeesanahalli Bengaluru location.',
    mediaRequirements: 'High-rise tower construction site photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'CNC Machining Center Operator',
    route: '/careers/cnc-machining-center-operator',
    url: `${BASE_URL}/careers/cnc-machining-center-operator/`,
    primaryOwner: 'Sanand Works Plant HR',
    contentNeeded: 'Operation of 5-axis Elumatec CNC milling centers, profile cutting tolerances to 0.5mm, tool calibration, preventive maintenance.',
    metricsNeeded: '3-5 years experience, ITI/Diploma Mechanical, Sanand GIDC.',
    mediaRequirements: 'Sanand plant CNC machine bay photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Quality Control Chemist & Food Technologist',
    route: '/careers/quality-control-chemist-food-technologist',
    url: `${BASE_URL}/careers/quality-control-chemist-food-technologist/`,
    primaryOwner: 'Hrishikesh Food Products HR',
    contentNeeded: 'Microbiological testing, moisture content analysis, volatile oil retention verification, BRCGS audit documentation adherence at Bavla mill.',
    metricsNeeded: '3-6 years experience, BSc/MSc Food Tech/Chemistry, Bavla.',
    mediaRequirements: 'Food quality laboratory testing photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Spice Processing Plant Supervisor',
    route: '/careers/spice-processing-plant-supervisor',
    url: `${BASE_URL}/careers/spice-processing-plant-supervisor/`,
    primaryOwner: 'Hrishikesh Food Products HR',
    contentNeeded: 'Stone pulverizer milling line supervision, dust extraction monitoring, shift worker allocation, raw material intake logging.',
    metricsNeeded: '5-8 years experience, Bavla industrial belt.',
    mediaRequirements: 'Spice milling processing lines photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Brand Manager · Consumer Goods',
    route: '/careers/brand-manager-consumer-goods',
    url: `${BASE_URL}/careers/brand-manager-consumer-goods/`,
    primaryOwner: 'Consumer Products Marketing HR',
    contentNeeded: 'Brand marketing strategy for Manpras and FMCG portfolio (Snackshot, Antrah, Gush); pack design coordination, retailer trade promotions.',
    metricsNeeded: '4-7 years FMCG experience, MBA Marketing, Ahmedabad.',
    mediaRequirements: 'Manpras brand design studio photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Retail Store Operations Manager · BOGO',
    route: '/careers/retail-store-operations-manager-bogo',
    url: `${BASE_URL}/careers/retail-store-operations-manager-bogo/`,
    primaryOwner: 'BOGO Retail HR',
    contentNeeded: 'Floor management for 10,000+ sq ft BOGO Square flagship; stock replenishment, POS billing governance, customer service and staff leadership.',
    metricsNeeded: '6-10 years retail store management experience, Ahmedabad.',
    mediaRequirements: 'Modern retail store aisle photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Serviced Apartment Operations Lead · Flight Stays',
    route: '/careers/serviced-apartment-operations-lead',
    url: `${BASE_URL}/careers/serviced-apartment-operations-lead/`,
    primaryOwner: 'FirstGen Hospitality HR',
    contentNeeded: 'Guest relations for extended-stay corporate engineering teams, housekeeping quality control, vendor maintenance, OTA listing management.',
    metricsNeeded: '4-8 years hospitality experience, Kadubeesanahalli Bengaluru.',
    mediaRequirements: 'Flight Stays reception and suite photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Civil Project Engineer · Residential',
    route: '/careers/civil-project-engineer-residential',
    url: `${BASE_URL}/careers/civil-project-engineer-residential/`,
    primaryOwner: 'Hrishikesh Ventures HR',
    contentNeeded: 'RCC frame inspection, concrete slump testing, contractor billing verification, structural schedule tracking for residential towers.',
    metricsNeeded: '4-8 years civil construction experience, BE Civil, Ahmedabad.',
    mediaRequirements: 'Hrishikesh Ventures residential tower site photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'Career Position',
    pageName: 'Brand Identity & Visual Designer',
    route: '/careers/brand-identity-visual-designer',
    url: `${BASE_URL}/careers/brand-identity-visual-designer/`,
    primaryOwner: 'Indian Brand House HR',
    contentNeeded: 'Vector logo design, packaging dieline design, brand identity systems, typography guidelines for FMCG and retail ecosystem brands.',
    metricsNeeded: '3-6 years graphic design experience, portfolio required, Ahmedabad.',
    mediaRequirements: 'Creative design studio workstation photo.',
    status: 'Ready for copy review',
  },

  // 4. News Announcements Detail Pages
  {
    category: 'News & Announcements',
    pageName: 'HRS Aluglaze Sanand Line Expansion',
    route: '/news/hrs-aluglaze-expands-sanand-production-line',
    url: `${BASE_URL}/news/hrs-aluglaze-expands-sanand-production-line/`,
    primaryOwner: 'HRS Aluglaze PR Desk',
    contentNeeded: 'Official announcement of second automated unitised panel assembly line installation at Sanand plant; technical tolerances; civil delivery timelines for 3 commercial towers in Ahmedabad and Surat.',
    metricsNeeded: 'Monthly output increase to 18,000 sq m, 0.5mm tolerances.',
    mediaRequirements: 'Sanand plant assembly line photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'News & Announcements',
    pageName: 'Hrishikesh Ventures H10 Structural Topping Out',
    route: '/news/hrishikesh-ventures-tops-out-h10-commercial-centre',
    url: `${BASE_URL}/news/hrishikesh-ventures-tops-out-h10-commercial-centre/`,
    primaryOwner: 'Hrishikesh Ventures PR Desk',
    contentNeeded: 'Completion of 14-storey structural topping out of H10 commercial building on SG Highway, Bodakdev; double-glazed facade schedule; tenant handover date mid-2027.',
    metricsNeeded: '14 storeys, 180,000 sq ft office area, handover mid-2027.',
    mediaRequirements: 'H10 structural topping-out photo overlooking SG Highway.',
    status: 'Ready for copy review',
  },
  {
    category: 'News & Announcements',
    pageName: 'BOGO Square Flagship Announcement',
    route: '/news/bogo-square-flagship-announced-ahmedabad',
    url: `${BASE_URL}/news/bogo-square-flagship-announced-ahmedabad/`,
    primaryOwner: 'BOGO Retail PR Desk',
    contentNeeded: 'Unveiling of BOGO Square inaugural flagship retail destination planned for western Ahmedabad; multi-format layout housing 11 category brands, dining, and fulfillment hub.',
    metricsNeeded: '10,000+ sq ft format, western Ahmedabad location.',
    mediaRequirements: 'BOGO Square architectural 3D exterior render.',
    status: 'Ready for copy review',
  },
  {
    category: 'News & Announcements',
    pageName: 'School of Facade Technologies 6th Cohort Graduation',
    route: '/news/school-of-facade-technologies-graduates-sixth-cohort',
    url: `${BASE_URL}/news/school-of-facade-technologies-graduates-sixth-cohort/`,
    primaryOwner: 'School of Facade Technologies Desk',
    contentNeeded: 'Certification ceremony for 42 structural facade engineers, supervisors, and fabricators; 5-month intensive curriculum summary; industry placement rate.',
    metricsNeeded: '42 graduates certified, 100% industry placement across Gujarat, Maharashtra, Karnataka.',
    mediaRequirements: 'Graduation ceremony and training workshop photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'News & Announcements',
    pageName: 'FirstGen Hotels Flight Stays Annex Opening',
    route: '/news/firstgen-hotels-opens-flight-stays-annex-bengaluru',
    url: `${BASE_URL}/news/firstgen-hotels-opens-flight-stays-annex-bengaluru/`,
    primaryOwner: 'FirstGen Hospitality PR Desk',
    contentNeeded: 'Launch of 36-unit serviced residential annex in Kadubeesanahalli near Outer Ring Road tech campuses; corporate extended-stay facilities for visiting engineering consultants.',
    metricsNeeded: '36 keys, 2km to major tech parks.',
    mediaRequirements: 'Flight Stays annex building and serviced apartment interior photo.',
    status: 'Ready for copy review',
  },
  {
    category: 'News & Announcements',
    pageName: 'Hrishikesh Food Products BRCGS Certification',
    route: '/news/hrishikesh-food-products-attains-brcgs-certification',
    url: `${BASE_URL}/news/hrishikesh-food-products-attains-brcgs-certification/`,
    primaryOwner: 'Hrishikesh Food Products PR Desk',
    contentNeeded: 'Audit confirmation of BRCGS Global Standard for Food Safety certification for Bavla processing and spice milling plant; botanical traceability protocols; expansion into private label export contracts.',
    metricsNeeded: 'BRCGS Global Food Safety Standard, Bavla Ahmedabad district.',
    mediaRequirements: 'BRCGS audit inspection at Bavla spice milling bay.',
    status: 'Ready for copy review',
  },
];

// Helper to escape XML
function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to escape CSV
function escapeCsv(val) {
  const str = String(val || '').replace(/"/g, '""');
  return `"${str}"`;
}

// 1. Generate CSV
const csvHeaders = [
  'Category',
  'Page Name',
  'Route',
  'Live Deployment Link',
  'Primary Content Owner',
  'Content Required from Writing Team',
  'Specific Figures / Metrics Needed',
  'Media / Photography Requirements',
  'Current Status',
];

const csvRows = [
  csvHeaders.map(escapeCsv).join(','),
  ...pagesData.map((row) =>
    [
      row.category,
      row.pageName,
      row.route,
      row.url,
      row.primaryOwner,
      row.contentNeeded,
      row.metricsNeeded,
      row.mediaRequirements,
      row.status,
    ]
      .map(escapeCsv)
      .join(',')
  ),
];

const csvContent = csvRows.join('\r\n');

// 2. Generate Excel XML 2003 (.xls)
const xmlRows = pagesData
  .map(
    (row, idx) => `   <Row ss:AutoFitHeight="1">
    <Cell ss:StyleID="CategoryCell"><Data ss:Type="String">${escapeXml(row.category)}</Data></Cell>
    <Cell ss:StyleID="PageNameCell"><Data ss:Type="String">${escapeXml(row.pageName)}</Data></Cell>
    <Cell ss:StyleID="RouteCell"><Data ss:Type="String">${escapeXml(row.route)}</Data></Cell>
    <Cell ss:StyleID="HyperlinkCell" ss:HRef="${escapeXml(row.url)}"><Data ss:Type="String">${escapeXml(row.url)}</Data></Cell>
    <Cell ss:StyleID="OwnerCell"><Data ss:Type="String">${escapeXml(row.primaryOwner)}</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">${escapeXml(row.contentNeeded)}</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">${escapeXml(row.metricsNeeded)}</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">${escapeXml(row.mediaRequirements)}</Data></Cell>
    <Cell ss:StyleID="StatusCell"><Data ss:Type="String">${escapeXml(row.status)}</Data></Cell>
   </Row>`
  )
  .join('\n');

const excelXmlContent = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>HRS Group Web Development</Author>
  <LastAuthor>HRS Group</LastAuthor>
  <Created>2026-10-29T15:00:00Z</Created>
  <Company>HRS Group</Company>
  <Version>16.00</Version>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Top"/>
   <Borders/>
   <Font ss:FontName="Segoe UI" ss:Size="10" ss:Color="#0E0E10"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="HeaderRow">
   <Alignment ss:Vertical="Center" ss:Horizontal="Left" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#F58220"/>
   </Borders>
   <Font ss:FontName="Segoe UI" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#0E0E10" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="CategoryCell">
   <Alignment ss:Vertical="Top"/>
   <Font ss:FontName="Segoe UI" ss:Size="10" ss:Color="#15852C" ss:Bold="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="PageNameCell">
   <Alignment ss:Vertical="Top"/>
   <Font ss:FontName="Segoe UI" ss:Size="10.5" ss:Color="#0E0E10" ss:Bold="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="RouteCell">
   <Alignment ss:Vertical="Top"/>
   <Font ss:FontName="Consolas" ss:Size="9.5" ss:Color="#4B5563"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="HyperlinkCell">
   <Alignment ss:Vertical="Top"/>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#F58220" ss:Underline="Single"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="OwnerCell">
   <Alignment ss:Vertical="Top"/>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#13477A" ss:Bold="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="WrapTextCell">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#374151"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="StatusCell">
   <Alignment ss:Vertical="Top" ss:Horizontal="Center"/>
   <Font ss:FontName="Segoe UI" ss:Size="9.5" ss:Color="#15803D" ss:Bold="1"/>
   <Interior ss:Color="#F0FDF4" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E5E7EB"/>
   </Borders>
  </Style>
  <Style ss:ID="RulesHeader">
   <Alignment ss:Vertical="Center" ss:Horizontal="Left"/>
   <Font ss:FontName="Segoe UI" ss:Size="12" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#F58220" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="RulesBanned">
   <Alignment ss:Vertical="Top" ss:WrapText="1"/>
   <Font ss:FontName="Segoe UI" ss:Size="10" ss:Color="#B91C1C" ss:Bold="1"/>
   <Interior ss:Color="#FEF2F2" ss:Pattern="Solid"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FCA5A5"/>
   </Borders>
  </Style>
 </Styles>
 <Worksheet ss:Name="Content Requirements Matrix">
  <Table ss:ExpandedColumnCount="9" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="18">
   <Column ss:Width="110"/>
   <Column ss:Width="160"/>
   <Column ss:Width="130"/>
   <Column ss:Width="260"/>
   <Column ss:Width="160"/>
   <Column ss:Width="340"/>
   <Column ss:Width="220"/>
   <Column ss:Width="240"/>
   <Column ss:Width="110"/>
   <Row ss:Height="28" ss:StyleID="HeaderRow">
    <Cell><Data ss:Type="String">Category</Data></Cell>
    <Cell><Data ss:Type="String">Page Name</Data></Cell>
    <Cell><Data ss:Type="String">Route</Data></Cell>
    <Cell><Data ss:Type="String">Live GitHub Deployment Link</Data></Cell>
    <Cell><Data ss:Type="String">Primary Content Owner</Data></Cell>
    <Cell><Data ss:Type="String">Content Needed from Writing Team</Data></Cell>
    <Cell><Data ss:Type="String">Specific Figures / Metrics Needed</Data></Cell>
    <Cell><Data ss:Type="String">Media / Photography Requirements</Data></Cell>
    <Cell><Data ss:Type="String">Status</Data></Cell>
   </Row>
${xmlRows}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout x:Orientation="Landscape"/>
   </PageSetup>
   <Selected/>
   <FreezePanes/>
   <FrozenNoSplit/>
   <SplitPane>1</SplitPane>
   <SplitHorizontal>1</SplitHorizontal>
   <TopRowBottomPane>1</TopRowBottomPane>
   <ActivePane>2</ActivePane>
  </WorksheetOptions>
 </Worksheet>
 <Worksheet ss:Name="Writing Rules & Banned Words">
  <Table ss:ExpandedColumnCount="3" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="20">
   <Column ss:Width="180"/>
   <Column ss:Width="360"/>
   <Column ss:Width="340"/>
   <Row ss:Height="26" ss:StyleID="RulesHeader">
    <Cell><Data ss:Type="String">Rule Category</Data></Cell>
    <Cell><Data ss:Type="String">Guideline / Instruction</Data></Cell>
    <Cell><Data ss:Type="String">Mandatory Standard</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="PageNameCell"><Data ss:Type="String">Brand Tone</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Modern, confident, colourful and a little playful, like a contemporary brand site. Never read like a SaaS startup or generic corporate template.</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Plain, specific language. No slogans for headings where a clear statement will do.</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="PageNameCell"><Data ss:Type="String">Case Convention</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Sentence case everywhere across all headings, buttons, tabs, and tables.</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">NO uppercase tracked eyebrows. NO Title Case in subheadings.</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">STRICTLY BANNED WORDS</Data></Cell>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">unlock, elevate, empower, seamless, cutting-edge, state-of-the-art, innovative, leverage, robust, holistic, synergy, journey, world-class, next-generation, end-to-end, passionate</Data></Cell>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">Also banned: &apos;not just X but Y&apos;, &apos;where X meets Y&apos;. These are corporate clichés.</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="PageNameCell"><Data ss:Type="String">Punctuation</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">NO em dashes (&apos;—&apos;). Use standard commas, colons, or middle dots (&apos;·&apos;). NO exclamation marks (&apos;!&apos;).</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Zero exclamation marks allowed across the entire website.</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="PageNameCell"><Data ss:Type="String">Numerals &amp; Facts</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Use tabular lining figures for all numbers, years, metrics, and floor counts.</Data></Cell>
    <Cell ss:StyleID="WrapTextCell"><Data ss:Type="String">Specific realistic details in Ahmedabad, Gujarat, and Bengaluru. No &apos;lorem ipsum&apos;, &apos;placeholder&apos;, or &apos;TBD&apos;.</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">Scope Exclusions</Data></Cell>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">DO NOT include FirstGen QSR, Quantum Build, or any redevelopment arm.</Data></Cell>
    <Cell ss:StyleID="RulesBanned"><Data ss:Type="String">DO NOT hardcode a count of companies in any prose copy.</Data></Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;

// Write files to public/downloads and workspace root
const outDir = path.join(process.cwd(), 'public', 'downloads');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'HRS_Group_Website_Content_Requirements.csv'), csvContent, 'utf8');
fs.writeFileSync(path.join(outDir, 'HRS_Group_Website_Content_Requirements.xls'), excelXmlContent, 'utf8');

// Also write in root directory for easy local access
fs.writeFileSync('HRS_Group_Website_Content_Requirements.csv', csvContent, 'utf8');
fs.writeFileSync('HRS_Group_Website_Content_Requirements.xls', excelXmlContent, 'utf8');

console.log('Successfully generated Excel and CSV files:');
console.log('1. HRS_Group_Website_Content_Requirements.xls (Excel format with multiple tabs, styling & column widths)');
console.log('2. HRS_Group_Website_Content_Requirements.csv (Universal CSV format)');
console.log('Total pages cataloged:', pagesData.length);
