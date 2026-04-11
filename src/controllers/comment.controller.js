import Comment from "../models/comment.model.js";

const getComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("author", "name email role")
    .populate("article", "title status");
  return res.status(200).json(comments);
};

const createComment = async (req, res) => {
  const { article, commentContent } = req.body;
  if (!article || !commentContent) {
    return res
      .status(400)
      .json({ message: "article and commentContent are required" });
  }

  const comment = await Comment.create({
    article,
    commentContent,
    author: req.user?._id,
  });
  return res.status(201).json(comment);
};

const getArticleComments = async (req, res) => {
  const comments = await Comment.find({ article: req.params.articleId })
    .populate("author", "name email role")
    .sort({ createdAt: -1 });
  return res.status(200).json({ success: true, data: comments });
};

const createPublicComment = async (req, res) => {
  const { commentContent, pseudoName } = req.body;
  const { articleId } = req.params;

  if (!commentContent) {
    return res.status(400).json({ message: "commentContent is required" });
  }

  const comment = await Comment.create({
    article: articleId,
    commentContent,
    pseudoName: pseudoName || "Anonymous",
  });

  return res.status(201).json({ success: true, data: comment });
};

const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const isOwner = comment.author ? comment.author.toString() === req.user._id.toString() : false;
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Forbidden" });
  }

  comment.commentContent = req.body.commentContent || comment.commentContent;
  await comment.save();

  return res.status(200).json(comment);
};

const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const isOwner = comment.author ? comment.author.toString() === req.user._id.toString() : false;
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await Comment.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Comment deleted" });
};

export { 
  getComments, 
  createComment, 
  updateComment, 
  deleteComment, 
  getArticleComments, 
  createPublicComment 
};
