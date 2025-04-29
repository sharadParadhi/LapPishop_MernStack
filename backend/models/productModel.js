import mongoose from "mongoose";

const reviewShcema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    // Comment provided in the review
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    // Image URL of the product
    image: {
      type: String,
      required: true,
    },
    // Description of the product
    description: {
      type: String,
      required: true,
    },
    // Brand of the product
    brand: {
      type: String,
      required: true,
    },
    // Category of the product
    category: {
      type: String,
      required: true,
    },
    // Price of the product
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    // Quantity available in stock
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Array of reviews associated with the product
    reviews: [reviewShcema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    // Number of reviews for the product
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);



const Product =mongoose.model("Product",productSchema)
export default Product;