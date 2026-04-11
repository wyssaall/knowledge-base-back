import express from "express";
import {
  getPublicArticleById,
  getPublicArticles,
} from "../controllers/public.controller.js";
import { 
  getArticleComments, 
  createPublicComment 
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/articles", getPublicArticles);
router.get("/articles/:id", getPublicArticleById);
router.get("/articles/:articleId/comments", getArticleComments);
router.post("/articles/:articleId/comments", createPublicComment);

export default router;
