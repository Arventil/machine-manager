const express = require('express');

const authCheck = require('../middleware/authCheck');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/main', authCheck.isAuth, authCheck.isAdmin, adminController.getMain);

router.get('/editII', authCheck.isAuth, authCheck.isAdmin, adminController.getEditII);

router.get('/addMachine', authCheck.isAuth, authCheck.isAdmin, adminController.getAddMachine);
router.post('/addMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postAddMachine);

router.get('/editMachine/:machineId', authCheck.isAuth, authCheck.isAdmin, adminController.getEditMachine);
router.post('/editMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postEditMachine);

router.post('/deleteMachine', authCheck.isAuth, authCheck.isAdmin, adminController.postDeleteMachine);

router.get('/addUser', authCheck.isAuth, authCheck.isAdmin, adminController.getAddUser);
router.post('/addUser', authCheck.isAuth, authCheck.isAdmin, adminController.postAddUser);

router.post('/editUserName', authCheck.isAuth, authCheck.isAdmin, adminController.postEditUserName);
router.post('/editUserRole', authCheck.isAuth, authCheck.isAdmin, adminController.postEditUserRole);
router.post('/editUserPassword', authCheck.isAuth, authCheck.isAdmin, adminController.postEditUserPassword);

router.get('/userList', authCheck.isAuth, authCheck.isAdmin, adminController.getUserList);

router.get('/editUser/:userId', authCheck.isAuth, authCheck.isAdmin, adminController.getEditUser);
// router.post('/editUser', authCheck.isAuth, authCheck.isAdmin, adminController.postEditUser);

router.get('/deleteUser/:userId', authCheck.isAuth, authCheck.isAdmin, adminController.getDeleteUser);

module.exports = router;