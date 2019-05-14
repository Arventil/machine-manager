const express = require('express');

const authCheck = require('../middleware/authCheck');
const standardController = require('../controllers/standard');

const router = express.Router();

router.get('/awaitingMachines', authCheck.isAuth, standardController.getAwaitingMachines);

router.get('/allMachines', authCheck.isAuth, standardController.getAllMachines);

router.get('/ending', authCheck.isAuth, standardController.getEndingMachines);

module.exports = router;