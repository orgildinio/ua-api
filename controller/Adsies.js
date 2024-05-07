const Ads = require("../models/Adsies");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const { RegexOptions, userSearch } = require("../lib/searchOfterModel");
const { valueRequired } = require("../lib/check");
const { imageDelete } = require("../lib/fileUpload");

exports.createAds = asyncHandler(async (req, res) => {
  if (!valueRequired(req.body.banner)) {
    throw new MyError("Баннер оруулна уу", 500);
  }

  const banner = await Ads.create(req.body);

  res.status(200).json({
    success: true,
    data: banner,
  });
});

exports.getAdsies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  let sort = req.query.sort || { createAt: -1 };

  const userInput = req.query;

  // FIELDS
  let status = req.query.status || null;

  const createUser = userInput["createUser"];
  const updateUser = userInput["updateUser"];

  const query = Ads.find();

  if (valueRequired(createUser)) {
    const userData = await userSearch(createUser);
    if (userData) query.where("createUser").in(userData);
  }

  if (valueRequired(updateUser)) {
    const userData = await userSearch(updateUser);
    if (userData) query.where("updateUser").in(userData);
  }

  if (valueRequired(sort)) {
    if (typeof sort === "string") {
      const spliteSort = sort.split(":");
      let convertSort = {};
      if (spliteSort[1] === "ascend") {
        convertSort = { [spliteSort[0]]: 1 };
      } else {
        convertSort = { [spliteSort[0]]: -1 };
      }
      if (spliteSort[0] != "undefined") query.sort(convertSort);
    } else {
      query.sort(sort);
    }
  }

  if (valueRequired(status)) {
    if (status.split(",").length > 1) {
      query.where("status").in(status.split(","));
    } else query.where("status").equals(status);
  }

  query.populate("createUser");
  query.populate("updateUser");

  const qc = query.toConstructor();
  const clonedQuery = new qc();
  const result = await clonedQuery.count();

  const pagination = await paginate(page, limit, Ads, result);
  query.limit(limit);
  query.skip(pagination.start - 1);
  const ads = await query.exec();

  res.status(200).json({
    success: true,
    count: ads.length,
    data: ads,
    pagination,
  });
});

exports.getFullData = asyncHandler(async (req, res) => {
  let sort = req.query.sort || { createAt: -1 };
  const select = req.query.select;

  const userInput = req.query;

  // FIELDS
  let status = req.query.status || null;
  const createUser = userInput["createUser"];
  const updateUser = userInput["updateUser"];

  const query = Ads.find();

  if (valueRequired(createUser)) {
    const userData = await userSearch(createUser);
    if (userData) query.where("createUser").in(userData);
  }

  if (valueRequired(updateUser)) {
    const userData = await userSearch(updateUser);
    if (userData) query.where("updateUser").in(userData);
  }

  if (valueRequired(sort)) {
    if (typeof sort === "string") {
      const spliteSort = sort.split(":");
      let convertSort = {};
      if (spliteSort[1] === "ascend") {
        convertSort = { [spliteSort[0]]: 1 };
      } else {
        convertSort = { [spliteSort[0]]: -1 };
      }
      if (spliteSort[0] != "undefined") query.sort(convertSort);
    } else {
      query.sort(sort);
    }
  }

  if (valueRequired(status)) {
    if (status.split(",").length > 1) {
      query.where("status").in(status.split(","));
    } else query.where("status").equals(status);
  }

  query.select(select);
  query.populate({ path: "createUser", select: "firstName -_id" });
  query.populate({ path: "updateUser", select: "firstName -_id" });

  const adsies = await query.exec();

  res.status(200).json({
    success: true,
    count: adsies.length,
    data: adsies,
  });
});

exports.getAds = asyncHandler(async (req, res) => {
  const ads = await Ads.findById(req.params.id)
    .populate("createUser")
    .populate("updateUser");

  if (!ads) {
    throw new MyError("Тухайн баннер байхгүй байна. ", 404);
  }

  res.status(200).json({
    success: true,
    data: ads,
  });
});

exports.multDeleteAds = asyncHandler(async (req, res) => {
  const ids = req.queryPolluted.id;
  const findads = await Ads.find({ _id: { $in: ids } });

  if (findads.length <= 0) {
    throw new MyError("Таны сонгосон баннерууд байхгүй байна", 400);
  }

  findads.map(async (el) => {
    el.banner && (await imageDelete(el.banner));
  });

  const ads = await Ads.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
  });
});

exports.updateAds = asyncHandler(async (req, res) => {
  let ads = await Ads.findById(req.params.id);

  if (!ads) {
    throw new MyError("Тухайн баннер байхгүй байна. ", 404);
  }

  if (!valueRequired(req.body.banner)) {
    throw new MyError("Баннер оруулна уу", 500);
  }

  req.body.updateAt = new Date();
  req.body.updateUser = req.userId;

  ads = await Ads.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: ads,
  });
});

exports.getCounAds = asyncHandler(async (req, res) => {
  const ads = await Ads.count();
  res.status(200).json({
    success: true,
    data: ads,
  });
});
