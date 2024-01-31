const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const FooterMenuSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },

  isDirect: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  isModel: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  mn: {
    name: {
      type: String,
    },
  },
  eng: {
    name: {
      type: String,
    },
  },

  direct: {
    type: String,
  },

  slug: {
    type: String,
  },

  parentId: {
    type: String,
  },

  position: {
    type: Number,
  },

  model: {
    type: String,
    enum: ["news", "employee", "contact", "medias"],
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



module.exports = mongoose.model("FooterMenu", FooterMenuSchema);
