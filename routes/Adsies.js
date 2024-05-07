const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
  createAds,
  getAds,
  getAdsies,
  multDeleteAds,
  updateAds,
  getCounAds,
} = require("../controller/Adsies");

router
  .route("/")
  .post(protect, authorize("admin", "operator"), createAds)
  .get(getAdsies);

router.route("/count").get(protect, authorize("admin", "operator"), getCounAds);

router.route("/delete").delete(protect, authorize("admin"), multDeleteAds);
router
  .route("/:id")
  .get(getAds)
  .put(protect, authorize("admin", "operator"), updateAds);

module.exports = router;
