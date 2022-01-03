const express = require('express');
const router = express.Router();
require('dotenv').config();

// import controller
var LoginCtrl =  require('../controllers/LoginCtrl');
var RegisterCtrl =  require('../controllers/RegisterCtrl');

// Routes
router.post('/register-number', RegisterCtrl.registerNumber);
router.post('/validate-otp', RegisterCtrl.validateOTP);
router.post('/login', LoginCtrl.login);

module.exports = router;