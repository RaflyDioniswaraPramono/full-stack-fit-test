const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const { TransactionController } = require("../../controllers/TransactionController");

router.get("/transaction", auth, TransactionController.getTransactions);
router.get("/transaction/:month", auth, TransactionController.getTransactionsByMonth);
router.get("/income/:year", auth, TransactionController.getRecap);

module.exports = router;
