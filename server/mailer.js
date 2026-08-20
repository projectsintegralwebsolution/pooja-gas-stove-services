import nodemailer from 'nodemailer';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export function createTransporter() {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('MAIL_USER and MAIL_APP_PASSWORD must be configured in .env');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendContactEmails(enquiry) {
  const transporter = createTransporter();
  const sender = process.env.MAIL_USER;
  const adminEmails = (process.env.ADMIN_EMAILS || 'poojagasstoveservice@gmail.com,princekumarjha80@gmail.com')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
  const businessName = process.env.BUSINESS_NAME || 'Pooja Gas Stove Services';
  const phone = process.env.BUSINESS_PHONE || '9166037352';

  const safe = Object.fromEntries(
    Object.entries(enquiry).map(([key, value]) => [key, escapeHtml(value)])
  );

  const adminSubject = `New Service Enquiry: ${enquiry.service || 'Kitchen Appliance Service'} - ${enquiry.name}`;
  const adminText = [
    'A new service enquiry was submitted from the website.',
    '',
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Locality: ${enquiry.locality || 'Not provided'}`,
    `Service: ${enquiry.service || 'Not selected'}`,
    `Message: ${enquiry.message || 'Not provided'}`,
    '',
    `Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
  ].join('\n');

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#222">
      <div style="background:#191919;color:white;padding:22px 26px;border-radius:12px 12px 0 0">
        <h2 style="margin:0">New Website Service Enquiry</h2>
      </div>
      <div style="border:1px solid #e4e4e4;border-top:0;padding:26px;border-radius:0 0 12px 12px">
        <p>A visitor submitted the contact form on <strong>${escapeHtml(businessName)}</strong>.</p>
        <table cellpadding="9" cellspacing="0" style="width:100%;border-collapse:collapse">
          <tr><td style="border-bottom:1px solid #eee"><strong>Name</strong></td><td style="border-bottom:1px solid #eee">${safe.name}</td></tr>
          <tr><td style="border-bottom:1px solid #eee"><strong>Email</strong></td><td style="border-bottom:1px solid #eee">${safe.email}</td></tr>
          <tr><td style="border-bottom:1px solid #eee"><strong>Phone</strong></td><td style="border-bottom:1px solid #eee">${safe.phone}</td></tr>
          <tr><td style="border-bottom:1px solid #eee"><strong>Locality</strong></td><td style="border-bottom:1px solid #eee">${safe.locality || 'Not provided'}</td></tr>
          <tr><td style="border-bottom:1px solid #eee"><strong>Service</strong></td><td style="border-bottom:1px solid #eee">${safe.service || 'Not selected'}</td></tr>
          <tr><td style="vertical-align:top"><strong>Message</strong></td><td>${safe.message || 'Not provided'}</td></tr>
        </table>
        <p style="margin-top:22px"><a href="mailto:${safe.email}" style="display:inline-block;background:#ff4f38;color:white;text-decoration:none;padding:12px 18px;border-radius:24px">Reply to Customer</a></p>
      </div>
    </div>`;

  const customerSubject = `We received your service enquiry | ${businessName}`;
  const customerText = `Dear ${enquiry.name},\n\nThank you for contacting ${businessName}. We have received your enquiry regarding ${enquiry.service || 'your kitchen appliance service requirement'}.\n\nOur team will review the details and contact you to confirm service scope, location and technician availability.\n\nEnquiry summary:\nPhone: ${enquiry.phone}\nLocality: ${enquiry.locality || 'Not provided'}\nService: ${enquiry.service || 'Not selected'}\n\nFor urgent assistance, you can call +91 ${phone}.\n\nRegards,\n${businessName}`;

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#222">
      <div style="background:#191919;color:white;padding:22px 26px;border-radius:12px 12px 0 0">
        <h2 style="margin:0">Thank you for contacting us</h2>
      </div>
      <div style="border:1px solid #e4e4e4;border-top:0;padding:26px;border-radius:0 0 12px 12px">
        <p>Dear ${safe.name},</p>
        <p>We have received your service enquiry for <strong>${safe.service || 'kitchen appliance service'}</strong>.</p>
        <p>Our team will review your request and contact you to confirm the service requirement, location and technician availability.</p>
        <div style="background:#f7f7f7;padding:18px;border-radius:10px;margin:22px 0">
          <strong>Your enquiry summary</strong><br><br>
          Phone: ${safe.phone}<br>
          Locality: ${safe.locality || 'Not provided'}<br>
          Service: ${safe.service || 'Not selected'}
        </div>
        <p>For urgent assistance, call <strong>+91 ${escapeHtml(phone)}</strong>.</p>
        <p>Regards,<br><strong>${escapeHtml(businessName)}</strong></p>
        <p style="font-size:12px;color:#777">This is an acknowledgement of your website enquiry. It does not confirm a booking or guaranteed service time.</p>
      </div>
    </div>`;

  // Send one admin notification to each configured admin plus one acknowledgement to the customer.
  await Promise.all([
    ...adminEmails.map((adminEmail) => transporter.sendMail({
      from: `"${businessName} Website" <${sender}>`,
      to: adminEmail,
      replyTo: enquiry.email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    })),
    transporter.sendMail({
      from: `"${businessName}" <${sender}>`,
      to: enquiry.email,
      replyTo: adminEmails[0],
      subject: customerSubject,
      text: customerText,
      html: customerHtml,
    }),
  ]);
}
