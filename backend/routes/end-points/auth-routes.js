const router = require("express").Router();
const { AuthController } = require("../../controllers/AuthController");
const { auth } = require("../../middlewares/auth");

router.post("/signin", AuthController.signIn);
router.post("/signup", auth, AuthController.signUp);

module.exports = router;
