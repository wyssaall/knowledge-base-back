import express from "express";
import { getAllArticles, getOneArticle } from "../controllers/articles.controller";

const articlesRouter = express.Router();
//get all articles
articlesRouter.get('/', getAllArticles);

//get one article
articlesRouter.get('/:id', getOneArticle);
export default articlesRouter