const express = require('express');

const standardController = require('../controllers/standard');

const router = express.Router();

router.get('/awaitingMachines', standardController.getAwaitingMachines);

router.get('/allMachines', standardController.getAllMachines);

router.get('/ending', standardController.getEndingMachines);

module.exports = router;