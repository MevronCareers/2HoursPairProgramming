const Joi = require("joi");
const User = require("../models/user");
const { default: axios } = require("axios");
const mongoose = require("mongoose");
//  Create User
const createUser = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\,])(?=.{8,})/)
      .message({
        "string.pattern.base":
          "Password should contain at least 1 special character, number, alphabet and minimum of 8 characters",
      }),
    email: Joi.string()
      .required()
      .pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .message({
        "string.pattern.base": "Invalid E-mail address",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ err: error.details[0].message, status: "failed" });

  try {
    req.body.email = req.body.email.toLowerCase();
    req.body.username = req.body.username.toLowerCase();
    // Get necessary details
    const { email, username } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ err: `Email already exists`, status: "failed" });
    }
    const checkUsername = await User.findOne({ username: username });
    if (checkUsername) {
      return res
        .status(400)
        .json({ err: `Username already exists`, status: "failed" });
    }
    //  906721727
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const code = await checkUniqueId();
    const validateMailToken = uuidv4();

    let newUser = {
      email: email,
      password: hash,
      username: username,
      role: "driver",

      "verifyMailToken.token": validateMailToken,
      "verifyMailToken.expires": Date.now() + 120 * 60 * 60 * 1000, // 5 days
    };

    let user = await User.create(newUser);
    let userId = user._id;
    if (user) {
      // Upload image to cloudinary
      await generateUserWallet(userId, "BTC");
      await generateUserWallet(userId, "ETH");
      await generateUserWallet(userId, "TRON");
      const subject = "E-mail Verification";
      const token = user.verifyMailToken.token;
      const message = {
        username,
        title: "Thank you for signing up with ValorExchange! ",
        body: `Please follow this link to activate your account. <br> Link will expire after<b> 5 days </b>. <br> </p>`,
        link: `access/verify_email?token=${token}`,
        btn: `Activate Account`,
      };
      await sendBigNotes(email, subject, message);
    } else {
      return res
        .status(400)
        .json({ err: `Could not create user`, status: "failed" });
    }

    await SaveLog(ip, device, userId, "created an account");
    return res.status(201).json({
      msg: "Account Created successfully. Please check your email verify your account",
      user,
      status: "successful",
    });
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(500)
        .json({ err: "user already exist", status: "failed" });
    }
    return res.status(500).json({ err: error.message, status: "failed" });
  }
};

const checkAvailability = async (req, res) => {
  try {
    // Assuming user is logged in and req.user.id is passed from the Auth middleware
    const id = req.user.id;
    // Check if driver is not booked
    const checkDriver = User.findOne({ available: true });
    if (checkDriver) {
      return res
        .status(500)
        .json({ err: "User not available", status: "failed" });
    }

    // Calculate Fare Price

    return res.status(200).json({ msg: "", status: "successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message, status: "failed" });
  }
};

module.exports = {
  createUser,
  checkAvailability,
};
