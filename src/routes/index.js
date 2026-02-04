const homeController = require('../controllers/homeController');
const express = require('express');
const router = express.Router();

router.get('/', homeController.index);
router.post('/contact', homeController.submitContact);

module.exports = router;
