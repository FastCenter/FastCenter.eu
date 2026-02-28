const homeController = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

router.get('/', homeController.index);
router.get('/services/cybersecurity', homeController.cybersecurity);
router.get('/services/software', homeController.software);
router.get('/services/web', homeController.web);
router.get('/about', homeController.about);
router.get('/careers', homeController.careers);
router.get('/contact', homeController.contactPage);
router.post('/contact', homeController.submitContact);
router.post('/careers/submit', homeController.submitCareers);

module.exports = router;
