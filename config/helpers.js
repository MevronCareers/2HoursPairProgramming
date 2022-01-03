const db  = require('../database/db');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendError = message => {
    var error = {
        "error": {
            "status": "ERROR",
            "message": message
        }
    }

    return error;
}

const sendSuccess = message => {
    var success = {
        "success": {
            "status": "SUCCESS",
            "message": message
        }
    }

    return success;
}

const checkUserPhone = async function checkUserMobile(req) {
    return await db.User.findOne({ 
        where: {
        phone_number: req.body.phoneNumber }
    });
}

const checkUserEmail = async function createUserMail(req) {
    return await db.User.findOne({ 
        where: {
        email: req.body.email }
    });
}

const checkUserToken = async function checkToken(token) {
    return await db.Oauth.findOne({ 
        where: {
        token: token }
    });
}

const authCheck = async function auth(req) {
    if(req.user)
    {
        return true;
    }

    return false;
}

const signToken = (user) => {

    var token = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.firstname,
    },
      process.env.SECRET,
      {
        expiresIn: process.env.SESSION, //1800
      }
    );
  
    var decoded = jwt_decode(token);
    db.Oauth.create(decoded);
    return token;
};

function getTripPrice()
{
    var arr = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000]
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateString(length)
{
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;  
}

function generateCode(length)
{
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;  
}

module.exports = {
    authCheck,
    sendError,
    sendSuccess,
    checkUserEmail, 
    checkUserPhone, 
    checkUserToken,
    signToken,
    getTripPrice,
    generateString,
    generateCode
};