const router = require("express").Router();
const { auth } = require("../../middlewares/auth")
const { ExpenditureController } = require("../../controllers/ExpenditureController");

router.post("/expenditure", auth, ExpenditureController.addExpenditure);
router.get("/expenditure", auth, ExpenditureController.getExpenditures);

module.exports = router;