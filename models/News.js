const mongoose = require("mongoose");
const { slugify } = require("transliteration");

const NewsSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  star: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  slug: String,
  mn: {
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
    },
    shortDetails: {
      type: String,
    },
  },

  eng: {
    name: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
    },
    shortDetails: {
      type: String,
    },
  },

  type: {
    type: String,
    enum: ["default", "picture"],
    default: "default",
  },

  pictures: {
    type: [String],
  },

  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "NewsCategory",
    },
  ],
  tags: {
    type: [String],
  },
  views: {
    type: Number,
    default: 0,
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



module.exports = mongoose.model("News", NewsSchema);
