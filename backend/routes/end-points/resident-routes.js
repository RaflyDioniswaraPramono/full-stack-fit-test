const router = require("express").Router();
const { ResidentController } = require("../../controllers/ResidentController");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/multer");

router.post("/resident", auth, upload.single("identity_card_image"), ResidentController.addResident);
router.get("/resident", auth, ResidentController.getResidents);
router.get("/resident/:id", auth, ResidentController.getResident);
router.put("/resident/:id", auth, upload.single("identity_card_image"), ResidentController.updateResident);
router.delete("/resident/:id", auth, ResidentController.deleteResident);

module.exports = router;
