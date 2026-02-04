const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // Good practice to have, though minimal use here
const configureSecurity = require('./middlewares/security');
const routes = require('./routes/index');

const app = express();

// Global Locals
app.locals.appName = process.env.APP_NAME || 'FastCenter';

// Security Middleware
configureSecurity(app);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Standard Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).render('index', {
        title: '404 - Not Found',
        page: '404' // We can handle this in index.ejs or separate view
    });
});

module.exports = app;
