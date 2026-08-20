import { Link } from 'react-router-dom';
import { services } from '../data/site';
import { serviceVisuals } from '../data/visuals';
export default function ServiceGrid({limit}){
 const list = limit ? services.slice(0, limit) : services;
 return <div className="service-grid">{list.map((s,i)=>{const visual=limit?(serviceVisuals[s.slug]?.homeCard||serviceVisuals[s.slug]?.card):serviceVisuals[s.slug]?.card;return <article className="service-card" key={s.slug}>
   {visual&&<div className="service-card-image"><img src={visual.src} alt={visual.alt} width="640" height="400" loading="lazy" decoding="async"/></div>}
   <div className="service-card-body"><div className="service-icon"><i className={`fa-solid ${s.icon}`} /></div>
   <span className="service-number">{String(i+1).padStart(2,'0')}</span>
   <h3>{s.title}</h3><p>{s.short}</p><Link to={`/services/${s.slug}`}>View Service <i className="fa-solid fa-arrow-right" /></Link></div>
 </article>})}</div>
}
