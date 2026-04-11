import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    content: {
      type: String,
      required: true,
      minlength: 20,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "validated", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);
export default Article;