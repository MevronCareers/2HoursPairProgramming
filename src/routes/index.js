const router = require("express").Router();
const userController = require("../controllers/user");
const checkAuth = require("../middleware/checkAuth");

// User Routes
router.post("/users/:coin", userController.createUser);

module.exports = router;
