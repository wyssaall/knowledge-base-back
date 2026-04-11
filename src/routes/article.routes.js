// /api/articles routes (CRUD + Validation)
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAllArticles,
  getMyArticles,
  getMyPendingArticles,
  getOneArticle,
  validateArticle,
} from "../controllers/articles.controller.js";
import express from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { validateRequest } from "../middlewares/error.middleware.js";
import {
  createArticleValidator,
  updateArticleValidator,
} from "../validators/article.validator.js";

const articlRouter = express.Router();

articlRouter.get("/", protect, getAllArticles);
articlRouter.get("/me/all", protect, authorize("technicien", "admin"), getMyArticles);
articlRouter.get(
  "/me/pending",
  protect,
  authorize("technicien", "admin"),
  getMyPendingArticles
);
articlRouter.get("/:id", getOneArticle);
articlRouter.post(
  "/",
  protect,
  upload.single("image"),
  createArticleValidator,
  validateRequest,
  createArticle
);
articlRouter.put(
  "/:id",
  protect,
  upload.single("image"),
  updateArticleValidator,
  validateRequest,
  editArticle
);
articlRouter.delete("/:id", protect, deleteArticle);
articlRouter.patch("/:id/validate", protect, authorize("admin"), validateArticle);

export default articlRouter;