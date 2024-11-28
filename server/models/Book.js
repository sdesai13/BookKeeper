const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
  },

  stars: {
    type: Number,
  },

  category: {
    type: Array,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  thumbnail: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
