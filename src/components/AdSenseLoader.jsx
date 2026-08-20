import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../data/site';

// AdSense is intentionally disabled until a real publisher ID is supplied.
// Before enabling for EEA/UK/Switzerland traffic, configure a Google-certified CMP in AdSense.
export default function AdSenseLoader(){
  const {pathname}=useLocation();
  useEffect(()=>{
    if(['/privacy-policy','/cookie-policy'].includes(pathname)) return;
    const enabled = import.meta.env.VITE_ENABLE_ADSENSE === 'true';
    if(!enabled || !site.adsenseClient || document.querySelector('script[data-pooja-adsense]')) return;
    const s=document.createElement('script');
    s.async=true;
    s.crossOrigin='anonymous';
    s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`;
    s.dataset.poojaAdsense='true';
    document.head.appendChild(s);
    return ()=>{};
  },[pathname]);
  return null;
}
