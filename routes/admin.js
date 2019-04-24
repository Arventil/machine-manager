const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/main', adminController.getMain);

router.get('/addMachine', adminController.getAddMachine);

router.post('/addMachine', adminController.postAddMachine);

module.exports = router;