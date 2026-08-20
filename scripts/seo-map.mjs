import { pageContent } from '../src/data/pages.js';
import { guides } from '../src/data/guides.js';
import { site } from '../src/data/site.js';

const staticPages = {
  '/': {
    title: 'Gas Stove Repair in Nalasopara, Virar & Vasai | Pooja Gas Stove Services',
    description: 'Doorstep gas stove repair, hob service, chimney cleaning, LPG pipeline fitting and kitchen appliance support across Nalasopara, Virar, Vasai and nearby areas.',
    keywords: 'gas stove repair Nalasopara, gas stove repair Virar, gas stove repair Vasai, hob repair Nalasopara, chimney service Virar, LPG appliance repair',
  },
  '/about': {
    title: 'About Pooja Gas Stove Services | Nalasopara Kitchen Appliance Repair',
    description: 'Learn about Pooja Gas Stove Services, our Nalasopara East service base, supported kitchen appliances and doorstep coverage across nearby areas.',
    keywords: 'Pooja Gas Stove Services Nalasopara, gas stove technician Nalasopara, kitchen appliance service Palghar',
  },
  '/services': {
    title: 'Gas Stove, Hob, Chimney & LPG Repair Services | Nalasopara to Borivali',
    description: 'Explore gas stove repair, built-in hob service, chimney cleaning, gas pipeline fitting, leak inspection, ignition repair and LPG appliance service.',
    keywords: 'gas stove repair service, hob repair, chimney service, gas pipeline installation, gas leakage inspection, LPG appliance repair Nalasopara Virar Vasai',
  },
  '/service-areas': {
    title: 'Gas Stove Repair Service Areas | Nalasopara, Virar, Vasai to Borivali',
    description: 'Check Pooja Gas Stove Services coverage across Nalasopara, Virar, Vasai, Naigaon, Bhayandar, Mira Road, Dahisar, Borivali and Palghar areas.',
    keywords: 'gas stove repair Nalasopara Virar Vasai Naigaon Bhayandar Mira Road Dahisar Borivali Palghar',
  },
  '/guides': {
    title: 'Gas Stove, Hob & Chimney Care Guides | Pooja Gas Stove Services',
    description: 'Practical guides on gas stove safety, burner cleaning, built-in hob troubleshooting and kitchen chimney maintenance.',
    keywords: 'gas stove safety guide, gas stove cleaning tips, hob troubleshooting, chimney maintenance',
  },
  '/faq': {
    title: 'Gas Stove Repair FAQs | Service Areas, Hob Repair, Chimney & LPG Safety',
    description: 'Answers about doorstep gas stove repair, service areas, hob servicing, chimney cleaning, gas pipeline fitting, leak inspection and maintenance.',
    keywords: 'gas stove repair FAQ, hob repair questions, gas leak inspection, kitchen appliance service areas',
  },
  '/contact': {
    title: 'Contact Pooja Gas Stove Services | Book Doorstep Repair',
    description: 'Contact Pooja Gas Stove Services for gas stove, hob, chimney, cooking range and LPG appliance service across Nalasopara and nearby areas.',
    keywords: 'contact gas stove repair Nalasopara, book gas stove service Virar, hob repair contact Vasai',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${site.name}`,
    description: 'Privacy policy for Pooja Gas Stove Services, including enquiry data, cookies, analytics, advertising and Google AdSense disclosures.',
    keywords: 'Pooja Gas Stove Services privacy policy',
  },
  '/cookie-policy': {
    title: `Cookie Policy | ${site.name}`,
    description: 'Cookie policy explaining how Pooja Gas Stove Services may use essential, analytics and advertising cookies, including Google advertising cookies.',
    keywords: 'cookie policy, advertising cookies, AdSense cookies',
  },
  '/terms-of-use': {
    title: `Terms of Use | ${site.name}`,
    description: 'Terms governing use of the Pooja Gas Stove Services website, service information, enquiries, availability and intellectual property.',
    keywords: 'terms of use Pooja Gas Stove Services',
  },
  '/disclaimer': {
    title: `Disclaimer | ${site.name}`,
    description: 'Website and service disclaimer for Pooja Gas Stove Services covering general information, safety, third-party links and service outcomes.',
    keywords: 'Pooja Gas Stove Services disclaimer',
  },
  '/editorial-policy': {
    title: `Content & Editorial Policy | ${site.name}`,
    description: 'Editorial standards for service pages and educational guides published by Pooja Gas Stove Services.',
    keywords: 'editorial policy, content policy, appliance repair guides',
  },
};

for (const [slug, page] of Object.entries(pageContent)) {
  staticPages[`/services/${slug}`] = {
    title: page.seoTitle,
    description: page.meta,
    keywords: page.keywords,
    schema: {
      '@type': 'Service',
      'name': page.h1,
      'description': page.meta,
      'url': `${site.domain}/services/${slug}`,
      'provider': { '@type': 'LocalBusiness', 'name': site.name },
    },
  };
}

for (const [slug, guide] of Object.entries(guides)) {
  staticPages[`/guides/${slug}`] = {
    title: guide.seoTitle,
    description: guide.description,
    keywords: guide.keywords,
    article: true,
    schema: {
      '@type': 'Article',
      'headline': guide.title,
      'description': guide.description,
      'url': `${site.domain}/guides/${slug}`,
      'author': { '@type': 'Organization', 'name': site.name },
      'publisher': { '@type': 'Organization', 'name': site.name },
    },
  };
}

export const seoRoutes = Object.keys(staticPages);
export const seoMap = staticPages;
