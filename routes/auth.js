const express = require('express');

const authCheck = require('../middleware/authCheck');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/logout', authCheck.isAuth, authController.getLogout);

router.get('/', authController.getLoginPage);

router.post('/', authController.postLoginPage);

module.exports = router;