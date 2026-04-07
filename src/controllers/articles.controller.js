import Article from "../models/article.model.js";
import { AppError, asyncHandler } from "../middlewares/error.middleware.js";

const buildImageUrl = (req) =>
  req.file ? `/uploads/${req.file.filename}` : undefined;

const getAllArticles = asyncHandler(async (req, res) => {
  const { search = "", category, page = 1, limit = 10 } = req.query;
  const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
  const parsedLimit = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (parsedPage - 1) * parsedLimit;

  const filter = {};
  if (!req.user || req.user.role !== "admin") {
    filter.status = "validated";
  }
  if (search) filter.title = { $regex: search, $options: "i" };
  if (category) filter.category = category;

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate("author", "name email role")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit),
    Article.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    page: parsedPage,
    totalPages: Math.ceil(total / parsedLimit),
    totalResults: total,
    data: articles,
  });
});

const getOneArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
    .populate("author", "name email role")
    .populate("category", "name");
  if (!article) throw new AppError("article not found", 404);

  const isAdmin = req.user?.role === "admin";
  const isOwner = req.user && article.author?._id?.toString() === req.user._id.toString();

  if (!isAdmin && article.status !== "validated" && !isOwner) {
    throw new AppError("Forbidden", 403);
  }
  res.status(200).json({ success: true, data: article });
});

const createArticle = asyncHandler(async (req, res) => {
  const imageUrl = buildImageUrl(req);
  const article = await Article.create({
    ...req.body,
    ...(imageUrl ? { imageUrl } : {}),
    author: req.user._id,
    status: req.user.role === "admin" ? req.body.status || "validated" : "pending",
  });
  res.status(201).json({ success: true, data: article });
});

const editArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new AppError("article does not exist", 404);

  const isOwner = article.author.toString() === req.user._id.toString();
  if (req.user.role !== "admin" && !isOwner) throw new AppError("Forbidden", 403);

  const imageUrl = buildImageUrl(req);
  Object.assign(article, req.body);
  if (imageUrl) article.imageUrl = imageUrl;
  if (req.user.role === "technicien") article.status = "pending";

  await article.save();
  res.status(200).json({ success: true, data: article });
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new AppError("article not found", 404);

  const isOwner = article.author.toString() === req.user._id.toString();
  if (req.user.role !== "admin" && !isOwner) throw new AppError("Forbidden", 403);

  await Article.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "article deleted" });
});

const validateArticle = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["validated", "rejected"].includes(status)) {
    throw new AppError("status must be validated or rejected", 400);
  }
  const article = await Article.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!article) throw new AppError("article not found", 404);
  res.status(200).json({ success: true, data: article });
});

const getMyArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ author: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: articles });
});

const getMyPendingArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ author: req.user._id, status: "pending" }).sort({
    createdAt: -1,
  });
  res.status(200).json({ success: true, data: articles });
});

export {
  getAllArticles,
  getOneArticle,
  deleteArticle,
  createArticle,
  editArticle,
  validateArticle,
  getMyArticles,
  getMyPendingArticles,
};
