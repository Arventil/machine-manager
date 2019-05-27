const express = require('express');

const authCheck = require('../middleware/authCheck');
const standardController = require('../controllers/standard');

const router = express.Router();

router.get('/awaitingMachines', authCheck.isAuth, standardController.getAwaitingMachines);

router.get('/allMachines', authCheck.isAuth, standardController.getAllMachines);

router.get('/ending', authCheck.isAuth, standardController.getEndingMachines);

router.get('/handlingsChoice/:machineId', authCheck.isAuth, standardController.getHandlingsChoice);

router.post('/saveNote', authCheck.isAuth, standardController.postSaveNote);

router.get('/registerHandling/:machineId/:handlingType', authCheck.isAuth, standardController.getRegisterHandling);
router.post('/registerHandling', authCheck.isAuth, standardController.postRegisterHandling);

router.get('/history/:machineId', authCheck.isAuth, standardController.getHistory);

router.get('/historyHandling/:machineName/:handlingId/:userName', authCheck.isAuth, standardController.getHistoryHandling);

module.exports = router;