import { site, serviceAreas } from '../data/site';

export const postalAddress = {
  '@type':'PostalAddress',
  streetAddress: site.streetAddress,
  addressLocality: site.locality,
  addressRegion: site.region,
  postalCode: site.postalCode,
  addressCountry: site.country,
};

export const areaServed = serviceAreas.map(a => ({'@type':'Place', name:`${a.name}, Maharashtra, India`}));

export const localBusinessSchema = {
  '@type':'LocalBusiness',
  '@id':`${site.domain}/#business`,
  name:site.name,
  legalName:site.legalName,
  url:site.domain,
  telephone:`+91${site.phone}`,
  email:site.email,
  image:`${site.domain}${site.ogImage}`,
  priceRange:'₹₹',
  address:postalAddress,
  areaServed,
};

export function breadcrumbSchema(items){
  return {
    '@type':'BreadcrumbList',
    itemListElement: items.map((x,i)=>({
      '@type':'ListItem', position:i+1, name:x.name,
      ...(x.path ? {item:`${site.domain}${x.path === '/' ? '' : x.path}`} : {})
    }))
  };
}

export function graph(...items){return {'@context':'https://schema.org','@graph':items.flat().filter(Boolean)}}
