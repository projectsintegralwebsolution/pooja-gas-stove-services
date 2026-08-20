import { Link } from 'react-router-dom';
import { site, services } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="cta-band">
        <div className="container cta-flex">
          <div>
            <span className="eyebrow light">
              DOORSTEP KITCHEN APPLIANCE SERVICE
            </span>
            <h2>Need Gas Stove or Hob Repair?</h2>
            <p>
              Call to discuss the appliance, problem and exact service
              location before booking.
            </p>
          </div>

          <a href={`tel:${site.phone}`} className="cta-phone">
            <i className="fa-solid fa-phone-volume" /> +91 {site.phone}
          </a>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">
              <i className="fa-solid fa-fire-flame-curved" />
            </span>

            <span>
              <b>Pooja</b>
              <small>Gas Stove Services</small>
            </span>
          </div>

          <p>
            Doorstep repair, servicing, cleaning, installation and inspection
            assistance for gas stoves, built-in hobs, chimneys, cooking ranges
            and LPG kitchen appliances.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/services">All Services</Link>
          <Link to="/service-areas">Service Areas</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div>
          <h3>Popular Services</h3>
          {services.slice(0, 5).map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </div>

        <div>
          <h3>Policies</h3>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/cookie-policy">Cookie Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/editorial-policy">
            Content & Editorial Policy
          </Link>
        </div>
      </div>

      <div className="footer-contact">
        <div className="container">
          <strong>{site.name}</strong>
          <span>{site.address}</span>
          <a href={`tel:${site.phone}`}>+91 {site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <span>
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </span>

          <span>
            Developed by{' '}
            <a
              href="https://integralwebsolution.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Integral Web Solution
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
