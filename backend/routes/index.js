const router = require("express").Router();
const authRoutes = require("./end-points/auth-routes");
const residentRoutes = require("./end-points/resident-routes");
const houseRoutes = require("./end-points/house-routes");
const billRoutes = require("./end-points/bill-routes");
const paymentRoutes = require("./end-points/payment-routes");
const expenditureRoutes = require("./end-points/expenditure-routes");
const transactionRoutes = require("./end-points/transaction-routes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    apiVersion: "0.1.0",
    endPoint: "/",
    madeBy: "Rafly Dioniswara Pramono",
  });
});

router.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    apiVersion: "0.1.0",
    endPoint: "/api",
    madeBy: "Rafly Dioniswara Pramono",
  });
});

router.use("/api", authRoutes);
router.use("/api", residentRoutes);
router.use("/api", houseRoutes);
router.use("/api", billRoutes);
router.use("/api", paymentRoutes);
router.use("/api", expenditureRoutes);
router.use("/api", transactionRoutes);

module.exports = router;
