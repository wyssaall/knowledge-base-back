import Saved from "../models/saved.model.js";
import { AppError, asyncHandler } from "../middlewares/error.middleware.js";

const saveArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  if (!articleId) throw new AppError("articleId is required", 400);

  const saved = await Saved.findOneAndUpdate(
    { userId: req.user._id, articleId },
    { userId: req.user._id, articleId },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ success: true, data: saved });
});

const removeSavedArticle = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const deleted = await Saved.findOneAndDelete({ userId: req.user._id, articleId });
  if (!deleted) throw new AppError("Saved article not found", 404);
  res.status(200).json({ success: true, message: "Saved article removed" });
});

const getSavedArticles = asyncHandler(async (req, res) => {
  const saved = await Saved.find({ userId: req.user._id })
    .populate({
      path: "articleId",
      populate: [{ path: "author", select: "name email role" }, { path: "categories", select: "name" }],
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, data: saved });
});

export { saveArticle, removeSavedArticle, getSavedArticles };
