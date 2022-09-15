const mongoose = require("mongoose");

const subProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Sub Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Sub description"],
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
      },
    },
  ],
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Please Enter Product "],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SubProducts", subProductSchema);
