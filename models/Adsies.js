const mongoose = require("mongoose");
const { slugify } = require("transliteration");
const AdsiesSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    enum: [true, false],
    required: [true, "Төлөв сонгоно уу"],
  },

  banner: {
    type: String,
    required: [true, "Баннер оруулна уу"],
  },

  link: {
    type: String,
    required: [true, "Линк оруулна уу"],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  updateUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Adsies", AdsiesSchema);
