import express from "express";
import {
  getSavedArticles,
  removeSavedArticle,
  saveArticle,
} from "../controllers/saved.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getSavedArticles);
router.post("/:articleId", saveArticle);
router.delete("/:articleId", removeSavedArticle);

export default router;
