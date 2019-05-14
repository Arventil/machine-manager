const express = require('express');

const authCheck = require('../middleware/authCheck');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/main', authCheck.isAuth, authCheck.isAdmin, adminController.getMain);

router.get('/addMachine', authCheck.isAuth, authCheck.isAdmin, adminController.getAddMachine);
router.post('/addMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postAddMachine);

router.get('/editMachine/:machineId', authCheck.isAuth, authCheck.isAdmin, adminController.getEditMachine);
router.post('/editMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postEditMachine);

router.post('/deleteMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postDeleteMachine);

router.get('/addUser', authCheck.isAuth, authCheck.isAdmin, adminController.getAddUser);
router.post('/addUser', authCheck.isAuth, authCheck.isAdmin, adminController.postAddUser);

module.exports = router;