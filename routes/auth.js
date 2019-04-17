const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.getLoginPage);

router.post('/', authController.postLoginPage);

module.exports = router;