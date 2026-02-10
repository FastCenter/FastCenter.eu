exports.index = (req, res) => {
    res.render('index', {
        title: 'Inicio',
        successMessage: null,
        page: 'home'
    });
};

exports.services = (req, res) => {
    res.render('services', {
        title: 'Servicios',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'services'
    });
};

exports.about = (req, res) => {
    res.render('about', {
        title: 'Nosotros',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'about'
    });
};

exports.careers = (req, res) => {
    res.render('careers', {
        title: 'Talento',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'careers'
    });
};

exports.contactPage = (req, res) => {
    res.render('contact', {
        title: 'Contacto',
        appName: process.env.APP_NAME || 'FastCenter',
        page: 'contact'
    });
};

exports.submitContact = (req, res) => {
    const { name, email, message } = req.body || {};

    // Simulate email sending logic
    console.log('--- New Contact Submission ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------');

    // In a real app, we would send an email here.

    // Re-render contact page with success message or redirect
    // For simplicity, just render contact again with a success flag (not implemented in view yet, but good practice)
    // Or redirect to home with a query param? Let's just render index with success for now like before, 
    // or maybe render 'contact' with success.

    // Let's render 'contact' again but maybe add success logic there later. 
    // For now, let's stick to the original behavior but point to index or keep on contact.
    // User expects interaction. Let's redirect to index with success message to keep simple feedback loop.

    res.render('index', {
        title: 'Inicio',
        successMessage: 'Gracias por contactarnos. Nos pondremos en contacto pronto.',
        page: 'home'
    });
};
