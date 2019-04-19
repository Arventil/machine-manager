const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/main', adminController.getMain);

module.exports = router;