import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

savedSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const Saved = mongoose.model("Saved", savedSchema);
export default Saved;
