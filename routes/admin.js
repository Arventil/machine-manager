const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/main', adminController.getMain);

router.get('/addMachine', adminController.getAddMachine);

router.post('/addMachine', adminController.postAddMachine);

router.get('/editMachine/:machineId', adminController.getEditMachine);

router.post('/editMachine', adminController.postEditMachine);

router.post('/deleteMachine', adminController.postDeleteMachine);

module.exports = router;