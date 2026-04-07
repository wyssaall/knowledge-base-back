import Article from "../models/article.model.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

const buildPublicFilter = (query) => {
  const filter = { status: "validated" };

  if (query.search) {
    filter.title = { $regex: query.search, $options: "i" };
  }

  if (query.category) {
    filter.category = query.category;
  }

  return filter;
};

const getPublicArticles = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const skip = (page - 1) * limit;
  const filter = buildPublicFilter(req.query);

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate("category", "name")
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Article.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    totalResults: total,
    data: articles,
  });
});

const getPublicArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    _id: req.params.id,
    status: "validated",
  })
    .populate("category", "name")
    .populate("author", "name");

  if (!article) {
    return res.status(404).json({ success: false, message: "Article not found" });
  }

  res.status(200).json({ success: true, data: article });
});

export { getPublicArticles, getPublicArticleById };
