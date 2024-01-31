const mongoose = require("mongoose");
const { transliterate, slugify } = require("transliteration");

const MediaCategorySchema = new mongoose.Schema({
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },

  mn: {
    type: {
      name: {
        type: String,
      },
    },
    default: {},
  },

  eng: {
    type: {
      name: {
        type: String,
      },
    },
    default: {},
  },

  slug: {
    type: String,
  },
  parentId: {
    type: String,
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



module.exports = mongoose.model("MediaCategory", MediaCategorySchema);
