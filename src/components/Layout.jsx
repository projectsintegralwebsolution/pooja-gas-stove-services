import Header from './Header';
import Footer from './Footer';
import AdSenseLoader from './AdSenseLoader';
export default function Layout({children}){ return <><AdSenseLoader/><Header/><main id="main-content">{children}</main><Footer/></>; }
