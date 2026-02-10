const homeController = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

router.get('/', homeController.index);
router.get('/services', (req, res, next) => { console.log('Hit /services'); next(); }, homeController.services);
router.get('/about', homeController.about);
router.get('/careers', homeController.careers);
router.get('/contact', homeController.contactPage);
router.post('/contact', homeController.submitContact);

module.exports = router;
