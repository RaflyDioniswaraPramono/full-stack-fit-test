const router = require("express").Router();
const { HouseController } = require("../../controllers/HouseController");
const { auth } = require("../../middlewares/auth");

router.post("/house", auth, HouseController.addHouse);
router.get("/house", auth, HouseController.getHouses);
router.get("/house/:id", auth, HouseController.getHouse);
router.put("/house/:id", auth, HouseController.updateHouse);
router.delete("/house/:id", auth, HouseController.deleteHouse);

module.exports = router;
