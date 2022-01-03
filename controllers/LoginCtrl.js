const db  = require('../database/db');
const bcrypt =  require('bcryptjs');
const helpers = require('../config/helpers');
const Joi = require('joi');
var uuid = require('node-uuid');

const loginSchema = Joi.object().keys({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
}).unknown();


module.exports = {
  
login: async (req, res, next) => {
  
  const validate = Joi.validate(req.body, loginSchema)

  if(validate.error != null)
  {
      const errorMessage = validate.error.details.map(i => i.message).join('.');
      return res.status(400).json(
          helpers.sendError(errorMessage)
      );
  }

  var user = await db.User.findOne({ where: { email: req.body.email }});

  if(user)
  {
    if(bcrypt.compareSync(req.body.password, user.password))
    {
      const token = helpers.signToken(user);

      return res.status(200).json({
        success: {
          token: token
        }
      });

    }
    else
    {
      return res.status(400).json({
        error: { status: 'ERROR',
        message: "Incorrect Password!",
        code: '00'
      }});
    }

  }
  else
  {
    return res.status(400).json({
      error: { status: 'ERROR',
      message: "Account does not exist",
      code: '00'
    }});
  }

}

};