import { Link } from 'react-router-dom';
import { visuals } from '../data/visuals';
export default function PageHero({kicker='POOJA GAS STOVE SERVICES', title, text, image=visuals.kitchen, imageAlt='Gas stove and kitchen appliance service environment'}){
 return <section className="page-hero"><div className="container page-hero-grid"><div className="page-hero-copy"><span className="eyebrow light">{kicker}</span><h1>{title}</h1>{text && <p>{text}</p>}<div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{title}</span></div></div><div className="page-hero-image" aria-hidden="false"><img src={image} alt={imageAlt} width="720" height="520" decoding="async" fetchPriority="high"/></div></div></section>
}
