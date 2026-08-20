import { useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { site } from '../data/site';
import { graph, localBusinessSchema, breadcrumbSchema } from '../components/Schema';
import { pageVisuals } from '../data/visuals';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  locality: '',
  service: '',
  message: '',
  website: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send your enquiry. Please try again.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Thank you. Your enquiry has been sent successfully.',
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your enquiry. Please call us or try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <SEO
      title="Contact Pooja Gas Stove Services | Book Doorstep Repair"
      description="Contact Pooja Gas Stove Services for gas stove, hob, chimney, cooking range and LPG appliance service across Nalasopara and nearby areas."
      keywords="contact gas stove repair Nalasopara, book gas stove service Virar, hob repair contact Vasai"
      path="/contact"
      schema={graph(localBusinessSchema, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]))}
    />

    <PageHero
      title="Contact Pooja Gas Stove Services"
      text="Share your appliance, problem and locality so we can confirm service scope and technician availability."
      image={pageVisuals.contact.src}
      imageAlt={pageVisuals.contact.alt}
    />

    <section className="section">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">BOOK YOUR SERVICE</span>
          <h2>Get Doorstep Repair & Service Assistance</h2>
          <p>For faster guidance, tell us the appliance type, what is happening, and your exact locality. Service is available across our published coverage area subject to technician schedule.</p>

          <div className="contact-cards">
            <a href={`tel:${site.phone}`}>
              <i className="fa-solid fa-phone" />
              <span><small>Call Us</small>+91 {site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`}>
              <i className="fa-solid fa-envelope" />
              <span><small>Email Us</small>{site.email}</span>
            </a>
            <div>
              <i className="fa-solid fa-location-dot" />
              <span><small>Service Base</small>{site.address}</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <h2>Service Enquiry</h2>
          <p>Complete the form below. We will use these details only to respond to your service enquiry.</p>

          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
              minLength="2"
              maxLength="80"
              required
              placeholder="Your Name"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              maxLength="254"
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              inputMode="tel"
              autoComplete="tel"
              minLength="7"
              maxLength="20"
              required
              placeholder="Phone Number"
            />
          </label>

          <label>
            Locality
            <input
              name="locality"
              value={form.locality}
              onChange={onChange}
              autoComplete="address-level2"
              maxLength="100"
              placeholder="Nalasopara / Virar / Vasai / etc."
            />
          </label>

          <label>
            Service
            <select name="service" value={form.service} onChange={onChange}>
              <option value="">Select Service</option>
              <option>Gas Stove Repair</option>
              <option>Built-in Hob Repair</option>
              <option>Chimney Service</option>
              <option>Gas Cleaning</option>
              <option>Cooking Range Service</option>
              <option>Gas Pipeline Installation</option>
              <option>Gas Leakage Inspection</option>
              <option>Gas Regulator Repair</option>
              <option>Ignition Repair</option>
              <option>Commercial Kitchen Service</option>
              <option>Annual Maintenance</option>
              <option>Other LPG Appliance Service</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              maxLength="1500"
              placeholder="Describe the appliance problem"
              rows="5"
            />
          </label>

          <div className="form-honeypot" aria-hidden="true">
            <label>Website<input name="website" value={form.website} onChange={onChange} tabIndex="-1" autoComplete="off" /></label>
          </div>

          {status.message && (
            <div className={`form-status ${status.type}`} role="status" aria-live="polite">
              {status.message}
            </div>
          )}

          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Enquiry'}
          </button>

          <small>By submitting an enquiry you agree that we may use the details to respond to your service request. See our Privacy Policy. Submission does not confirm a booking or guaranteed arrival time.</small>
        </form>
      </div>
    </section>
  </>;
}
