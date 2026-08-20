const viteEnv = import.meta.env || {};

export const site = {
  name: 'Pooja Gas Stove Services',
  legalName: 'Pooja Gas Stove Services',
  phone: '9166037352',
  email: 'poojagasstoveservice@gmail.com',
  domain: 'https://poojagasstoveservice.com',
  address: 'Room No. 206, Sainath Apartment, Moregaon Rikshaw Stand, Opp. Q & Q Bar and Restaurant, Nalasopara (E), Palghar, Maharashtra – 401209',
  streetAddress: 'Room No. 206, Sainath Apartment, Moregaon Rikshaw Stand, Opp. Q & Q Bar and Restaurant',
  locality: 'Nalasopara East',
  region: 'Maharashtra',
  postalCode: '401209',
  country: 'IN',
  language: 'en-IN',
  ogImage: '/assets/img/og-cover.png',
  adsenseClient: viteEnv.VITE_ADSENSE_CLIENT || '',
  googleSiteVerification: viteEnv.VITE_GOOGLE_SITE_VERIFICATION || '',
};

export const serviceAreas = [
  {name:'Nalasopara', note:'Our service base is in Nalasopara East, making this our primary doorstep service area.'},
  {name:'Virar', note:'Doorstep appliance repair enquiries are accepted across Virar, subject to technician schedule and exact location.'},
  {name:'Vasai', note:'We assist suitable residential and commercial kitchen appliance service requirements in Vasai.'},
  {name:'Naigaon', note:'Customers in Naigaon can contact us for gas stove, hob, chimney and related LPG kitchen service requirements.'},
  {name:'Bhayandar', note:'Doorstep service enquiries are accepted for Bhayandar for supported kitchen appliances and LPG-related work.'},
  {name:'Mira Road', note:'We provide service assistance for suitable gas-based kitchen appliance requirements in Mira Road.'},
  {name:'Dahisar', note:'Service enquiries from Dahisar are handled based on technician availability, appliance type and travel feasibility.'},
  {name:'Borivali', note:'Customers in Borivali can contact us to check availability for supported repair, inspection and maintenance services.'},
  {name:'Palghar', note:'We serve suitable requirements within Palghar district, with availability depending on the exact service location.'},
];

export const services = [
  { slug: 'gas-stove-repair', title: 'Gas Stove Repair & Service', short: 'Doorstep inspection, repair, servicing and burner or ignition support for gas stoves.', icon: 'fa-fire-burner' },
  { slug: 'hob-repair', title: 'Built-in Hob Repair & Service', short: 'Inspection and service for built-in hob ignition, burners, gas flow and maintenance needs.', icon: 'fa-border-all' },
  { slug: 'chimney-service', title: 'Chimney Repair & Service', short: 'Kitchen chimney cleaning, servicing and troubleshooting for residential and selected commercial kitchens.', icon: 'fa-wind' },
  { slug: 'gas-cleaning', title: 'Gas Cleaning Services', short: 'Cleaning and servicing of gas burners and stove components to support reliable performance.', icon: 'fa-spray-can-sparkles' },
  { slug: 'cooking-range-service', title: 'Cooking Range Services', short: 'Repair, inspection, cleaning and maintenance for suitable domestic and commercial cooking ranges.', icon: 'fa-kitchen-set' },
  { slug: 'gas-pipeline-installation', title: 'Gas Pipeline Installation & Fitting', short: 'Pipeline installation, fitting, appliance connection assistance and inspection for suitable LPG setups.', icon: 'fa-pipe-valve' },
  { slug: 'gas-leakage-inspection', title: 'Gas Leakage Inspection', short: 'Inspection of LPG appliance connections, regulators and pipelines when a gas leak is suspected.', icon: 'fa-triangle-exclamation' },
  { slug: 'gas-regulator-repair', title: 'Gas Regulator Repair & Service', short: 'Inspection and repair assistance for gas regulator and connection-related problems.', icon: 'fa-gauge-high' },
  { slug: 'ignition-repair', title: 'Gas Stove & Hob Ignition Repair', short: 'Ignition system inspection and repair for suitable gas stoves, hobs and cooking appliances.', icon: 'fa-bolt' },
  { slug: 'lpg-appliance-repair', title: 'LPG Appliance Repair Services', short: 'Doorstep repair and service support across gas stoves, hobs, cooktops, regulators and LPG systems.', icon: 'fa-screwdriver-wrench' },
  { slug: 'commercial-kitchen-service', title: 'Commercial Kitchen Repair & Service', short: 'Inspection, repair, cleaning and maintenance assistance for suitable gas-based commercial kitchen equipment.', icon: 'fa-store' },
  { slug: 'annual-maintenance', title: 'Annual Maintenance Service', short: 'Routine inspection, cleaning, burner, ignition and gas-connection checks for suitable kitchen appliances.', icon: 'fa-calendar-check' },
  { slug: 'kitchen-appliance-service', title: 'Kitchen Appliance Repair & Service', short: 'Specialized support for gas stoves, built-in hobs, cooktops, chimneys, cooking ranges and LPG appliances.', icon: 'fa-house-chimney' }
];
