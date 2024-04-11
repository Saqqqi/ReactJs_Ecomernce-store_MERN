// productRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


//authtication routes of users
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


///User get and updates routes
router.get('/user', userController.getActiveUsers);
router.post('/user/update', userController.updateUser);
module.exports = router;
