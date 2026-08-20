import { Helmet } from 'react-helmet-async';
import { site } from '../data/site';

export default function SEO({
  title,
  description,
  keywords = '',
  path='/',
  schema=[],
  image=site.ogImage,
  type='website',
  noindex=false,
  article=false,
}) {
  const normalized = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  const url = `${site.domain}${normalized}`;
  const imageUrl = image.startsWith('http') ? image : `${site.domain}${image}`;
  const suppliedSchemas = Array.isArray(schema) ? schema : [schema];
  const webPageSchema = {'@context':'https://schema.org','@type':'WebPage','name':title,'description':description,'url':url,'inLanguage':site.language,'isPartOf':{'@type':'WebSite','name':site.name,'url':site.domain}};
  const schemas = [webPageSchema, ...suppliedSchemas];
  return <Helmet>
    <html lang={site.language} />
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="author" content={site.name} />
    <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
    <meta name="googlebot" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta name="geo.region" content="IN-MH" />
    <meta name="geo.placename" content="Nalasopara, Maharashtra" />
    <link rel="canonical" href={url} />
    <link rel="alternate" hrefLang="en-IN" href={url} />
    <link rel="alternate" hrefLang="x-default" href={url} />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:type" content={article ? 'article' : type} />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={`${site.name} - gas stove and kitchen appliance service`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    {site.googleSiteVerification && <meta name="google-site-verification" content={site.googleSiteVerification} />}
    {site.adsenseClient && <meta name="google-adsense-account" content={site.adsenseClient} />}
    {schemas.filter(Boolean).map((item, i) => <script key={i} type="application/ld+json">{JSON.stringify(item)}</script>)}
  </Helmet>;
}
