import {Navigate,Link,useParams} from 'react-router-dom';
import SEO from '../components/SEO';import PageHero from '../components/PageHero';
import ServiceAreasStrip from '../components/ServiceAreasStrip';
import {pageContent} from '../data/pages';import {site,services,serviceAreas} from '../data/site';
import {graph,localBusinessSchema,breadcrumbSchema} from '../components/Schema';
import {serviceVisuals} from '../data/visuals';

export default function ServiceDetail(){
 const {slug}=useParams(); const p=pageContent[slug]; const s=services.find(x=>x.slug===slug); if(!p)return <Navigate to="/services" replace/>;
 const path=`/services/${slug}`; const visual=serviceVisuals[slug];
 const schema=graph(
   localBusinessSchema,
   {'@type':'Service','@id':`${site.domain}${path}#service`,'name':p.h1,'description':p.meta,'url':`${site.domain}${path}`,'provider':{'@id':`${site.domain}/#business`},'areaServed':serviceAreas.map(a=>({'@type':'Place','name':`${a.name}, Maharashtra, India`}))},
   breadcrumbSchema([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:p.h1,path}])
 );
 return <><SEO title={p.seoTitle} description={p.meta} keywords={p.keywords} path={path} schema={schema}/><PageHero kicker="DOORSTEP SERVICE" title={p.h1} text="Professional inspection and service assistance with clear, practical guidance before repair work begins." image={visual?.hero?.src} imageAlt={visual?.hero?.alt}/><section className="section"><div className="container detail-grid"><article className="detail-content">{visual?.detail&&<figure className="detail-visual"><img src={visual.detail.src} alt={visual.detail.alt} width="1100" height="680" loading="lazy" decoding="async"/></figure>}<span className="eyebrow">SERVICE OVERVIEW</span><h2>{s?.title}</h2><p>{p.intro}</p><p>{p.body}</p><h2 className="subheading">{p.h2}</h2><ul className="check-list">{p.items.map(i=><li key={i}><i className="fa-solid fa-check"/>{i}</li>)}</ul><h2 className="subheading">{p.extraHeading}</h2><p>{p.extra}</p><div className="notice-card"><h3>Before You Book</h3><p>Share your appliance type, the problem you are seeing and your exact locality. This helps us confirm whether the service is supported and whether a technician is available for your location.</p></div><div className="detail-cta"><h2>Need help with this service?</h2><p>Call Pooja Gas Stove Services to discuss your appliance and service location. For gas-leak emergencies, follow immediate safety guidance rather than waiting for a routine appointment.</p><a className="btn primary" href={`tel:${site.phone}`}>Call +91 {site.phone}</a></div></article><aside className="sidebar"><h2>Our Services</h2>{services.slice(0,8).map(x=><Link className={x.slug===slug?'active':''} key={x.slug} to={`/services/${x.slug}`}>{x.title}<i className="fa-solid fa-arrow-right"/></Link>)}<Link to="/services">View All Services<i className="fa-solid fa-grid-2"/></Link><Link to="/service-areas">Service Areas<i className="fa-solid fa-location-dot"/></Link></aside></div></section><ServiceAreasStrip/></>
}
