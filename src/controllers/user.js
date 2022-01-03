const Joi = require("joi");
const User = require("../models/user");
const { default: axios } = require("axios");
const mongoose = require("mongoose");
//  Create User
const createUser = async (req, res) => {};

const checkAvailability = async (req, res) => {};

module.exports = {
  createUser,
  checkAvailability,
};
