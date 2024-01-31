const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
  createNews,
  getNews,
  multDeleteNews,
  getSingleNews,
  updateNews,
  getCountNews,
  excelData,
  getSlugNews,
} = require("../controller/News");

router
  .route("/")
  .post(protect, authorize("admin", "operator"), createNews)
  .get(getNews);

router
  .route("/:id")
  .get(getSingleNews)
  .put(protect, authorize("admin", "operator"), updateNews);

router.route("/excel").get(excelData);
router.route("/s/:slug").get(getSlugNews);

router
  .route("/count")
  .get(protect, authorize("admin", "operator"), getCountNews);
router.route("/delete").delete(protect, authorize("admin"), multDeleteNews);


module.exports = router;
