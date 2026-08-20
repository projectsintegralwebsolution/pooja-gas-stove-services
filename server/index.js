import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { sendContactEmails } from './mailer.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);
const NODE_ENV = process.env.NODE_ENV || 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(v => v.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many enquiries were submitted from this connection. Please try again later or call us.' },
});

const clean = value => typeof value === 'string' ? value.trim().replace(/[\u0000-\u001F\u007F]/g, '') : '';
const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
const validPhone = value => /^[0-9+()\-\s]{7,20}$/.test(value);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, service: 'Pooja Gas Stove Services API' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    // Honeypot field: bots often fill hidden fields. Return success without sending mail.
    if (clean(req.body.website)) {
      return res.status(200).json({ success: true, message: 'Your enquiry has been received.' });
    }

    const enquiry = {
      name: clean(req.body.name),
      email: clean(req.body.email).toLowerCase(),
      phone: clean(req.body.phone),
      locality: clean(req.body.locality),
      service: clean(req.body.service),
      message: clean(req.body.message),
    };

    const errors = [];
    if (enquiry.name.length < 2 || enquiry.name.length > 80) errors.push('Please enter a valid name.');
    if (!validEmail(enquiry.email)) errors.push('Please enter a valid email address.');
    if (!validPhone(enquiry.phone)) errors.push('Please enter a valid phone number.');
    if (enquiry.locality.length > 100) errors.push('Locality is too long.');
    if (enquiry.service.length > 100) errors.push('Service selection is invalid.');
    if (enquiry.message.length > 1500) errors.push('Message must be 1500 characters or less.');

    if (errors.length) {
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    await sendContactEmails(enquiry);
    return res.status(200).json({
      success: true,
      message: 'Thank you. Your enquiry has been sent successfully. A confirmation email has also been sent to you.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not send your enquiry right now. Please call us directly or try again later.',
    });
  }
});

if (NODE_ENV === 'production') {
app.use(
  express.static(distDir, {
    index: ['index.html'],
    maxAge: '1h',
  })
);

  // Serve prerendered route HTML when it exists so crawlers and users receive
  // the correct route-specific title, meta tags, canonical URL and schema.
  app.get('*', async (req, res, next) => {
    try {
      const cleanPath = req.path.replace(/^\/+|\/+$/g, '');
      const candidate = cleanPath
        ? path.join(distDir, cleanPath, 'index.html')
        : path.join(distDir, 'index.html');

      return res.sendFile(candidate, (error) => {
        if (!error) return;
        if (error.code !== 'ENOENT') return next(error);
        return res.sendFile(path.join(distDir, 'index.html'));
      });
    } catch (error) {
      return next(error);
    }
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server request failed.' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
