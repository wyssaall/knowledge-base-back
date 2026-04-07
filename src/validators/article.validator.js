import { body } from "express-validator";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createArticleValidator = [
  body("title").trim().notEmpty().withMessage("title is required").isLength({
    min: 3,
    max: 150,
  }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 10, max: 500 }),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("content is required")
    .isLength({ min: 20 }),
  body("category")
    .optional()
    .matches(objectIdRegex)
    .withMessage("category must be a valid ObjectId"),
];

const updateArticleValidator = [
  body("title").optional().trim().isLength({ min: 3, max: 150 }),
  body("description").optional().trim().isLength({ min: 10, max: 500 }),
  body("content").optional().trim().isLength({ min: 20 }),
  body("category")
    .optional()
    .matches(objectIdRegex)
    .withMessage("category must be a valid ObjectId"),
  body("status")
    .optional()
    .isIn(["pending", "validated", "rejected"])
    .withMessage("invalid status"),
];

export { createArticleValidator, updateArticleValidator };
