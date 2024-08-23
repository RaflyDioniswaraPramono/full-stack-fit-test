const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const { BillController } = require("../../controllers/BillController");

router.post("/bill", auth, BillController.addBill);
router.get("/bill", auth, BillController.getBills);
router.get("/bill/:id", auth, BillController.getBill);
router.get("/bill/resident/:id", auth, BillController.getBillByResident);

module.exports = router;
