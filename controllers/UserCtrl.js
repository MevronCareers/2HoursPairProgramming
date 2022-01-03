const db = require('../database/db');
const helpers = require('../config/helpers');
const Joi = require('joi');
var uuid = require('node-uuid');
require('dotenv').config();

module.exports = {

getProfile: async(req, res, next) => {

  var data = {
    _id: req.user.uuid,
    name: req.user.name,
    phone_number: req.user.phone_number,
    email: req.user.email,
  }
  return res.status(200).json({
    success: {
      status: "SUCCESS",
      data: data
    }
  });
},

registerName: async(req, res, next) => {

  const loginSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).unknown();

  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
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

  var user = await db.User.findOne({where: req.user.id});

  user.name = req.body.name;
  user.email = req.body.email;
  await user.save();

  return res.status(200).json({
    success: {
      status: 'SUCCESS',
      data: 'User details updated successfully'
    }
  });

}

}

