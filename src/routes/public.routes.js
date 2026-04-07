import express from "express";
import {
  getPublicArticleById,
  getPublicArticles,
} from "../controllers/public.controller.js";

const router = express.Router();

router.get("/articles", getPublicArticles);
router.get("/articles/:id", getPublicArticleById);

export default router;
