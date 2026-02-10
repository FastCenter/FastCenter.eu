const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const configureSecurity = (app) => {
    // Helmet Configuration
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"], // Allow Tailwind CDN if needed as fallback, though we are compiling locally, keeping it for flexibility/scripts
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:", "https://*"], // Generic allow for images
                connectSrc: ["'self'"],
            },
        },
    }));

    // Rate Limiter
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5000, // Limit each IP to 5000 requests per windowMs
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'Too many requests from this IP, please try again after 15 minutes',
    });

    // Apply to all requests
    app.use(limiter);
};

module.exports = configureSecurity;
