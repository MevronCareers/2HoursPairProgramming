const db = require('../database/db');
const helpers = require('../config/helpers');
const bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
const Joi = require('joi');

module.exports = {

register: async (req, res, next) => {

  const registerSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, registerSchema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var checkEmail = await helpers.checkUserEmail(req);

  if (checkEmail) {
    return res.status(400).json(
      helpers.sendError("Email is already in use!")
    );
  }

  var checkPhone = await helpers.checkUserPhone(req);
  
  if (checkPhone) {
    return res.status(400).json(
      helpers.sendError("Phone number is already in use!")
    );
  }

  const user = await db.User.create({
    phone_number: req.body.phoneNumber,
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password),
    uuid: uuid(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    type: req.body.type,
  });

  if(user) {

    if(user.type == "driver")
    {
        //create dummy car for driver for testing
        await db.Car.create({
          uuid: uuid(),
          driver_id: user.uuid,
          name: 'Toyato Camry',
          plate_number: helpers.generateString(6),
          color: 'WHITE',
        });
    }

    return res.status(200).json(
      helpers.sendSuccess("Account created successfully")
    );
  }
  else 
  {
    res.status(400).json(
      helpers.sendError("Error ocurred!")
    )
  }
},

registerNumber: async (req, res, next) => {

  const registerSchema = Joi.object().keys({
    phoneNumber: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, registerSchema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var checkPhone = await helpers.checkUserPhone(req);
  
  if (checkPhone) {
    return res.status(400).json(
      helpers.sendError("Phone number is already in use!")
    );
  }

  var code = helpers.generateCode(6);

  const user = await db.User.create({
    phone_number: req.body.phoneNumber,
    uuid: uuid(),
    otp: code
  });

  if(user) {
    return res.status(200).json({
      success: {
        status: 'SUCCESS',
        message: 'User details logged successfully',
        code: code
      }
    });
  }
  else 
  {
    res.status(400).json(
      helpers.sendError("Error ocurred!")
    )
  }
}, 

validateOTP: async (req, res, next) => {

  const registerSchema = Joi.object().keys({
    otp: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, registerSchema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var user = await db.User.findOne({where: {otp: req.body.otp}});

  if(user)
  {
    const token = helpers.signToken(user);

    return res.status(200).json({
      success: {
        status: 'SUCCESS',
        message: 'OTP validated successfully',
        token: token
      }
    });
  }
  else
  {
    return res.status(400).json(
      helpers.sendError("Invalid OTP")
    )
  }
}, 

}