exports.index = (req, res) => {
    res.render('index', {
        title: 'Home',
        successMessage: null
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

    // Re-render index with success message
    res.render('index', {
        title: 'Home',
        successMessage: 'Thank you for contacting us! We will get back to you shortly.'
    });
};
