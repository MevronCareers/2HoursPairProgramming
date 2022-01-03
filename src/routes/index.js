const router = require("express").Router();
const userController = require("../controllers/user");
const checkAuth = require("../middleware/checkAuth");

// User Routes
router.post("/user/createphone", userController.createPhone);
router.post("/user/verifyphone", userController.verifyPhone);
router.post("/user/add-names", userController.addName);
router.post("/user/add-email", userController.addEmail);
router.get("/users", userController.getAllUsers);

module.exports = router;
