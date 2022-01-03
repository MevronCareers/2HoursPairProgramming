const express = require('express');
const router = express.Router();
const passport = require('passport')
require('../config/passport')
require('dotenv').config();

// import controller
var AccountCtrl =  require('../controllers/UserCtrl');

//middleware
var jwtMiddleWare = passport.authenticate('jwt', {session: false});

//User routes
router.get('/profile',[jwtMiddleWare], AccountCtrl.getProfile);
router.post('/register-name',[jwtMiddleWare], AccountCtrl.registerName);

module.exports = router;