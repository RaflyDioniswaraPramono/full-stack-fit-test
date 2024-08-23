const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const { PaymentController } = require("../../controllers/PaymentController");

router.post("/payment", auth, PaymentController.payment);
router.get("/payment", auth, PaymentController.getPayments);

module.exports = router;
