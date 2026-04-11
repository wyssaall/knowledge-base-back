import { body } from "express-validator";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createArticleValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Title must be between 3 and 150 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long"),
  body("categories")
    .optional()
    .custom((value) => {
      let arr = value;
      if (typeof value === "string") {
        try { arr = JSON.parse(value); } catch(e) { throw new Error("Invalid JSON array"); }
      }
      if (!Array.isArray(arr)) throw new Error("categories must be an array");
      for (const item of arr) {
        if (!objectIdRegex.test(item)) throw new Error("each category must be a valid ObjectId");
      }
      return true;
    }),
];

const updateArticleValidator = [
  body("title").optional().trim().isLength({ min: 3, max: 150 }),
  body("description").optional().trim().isLength({ min: 10, max: 500 }),
  body("content").optional().trim().isLength({ min: 20 }),
  body("categories")
    .optional()
    .custom((value) => {
      let arr = value;
      if (typeof value === "string") {
        try { arr = JSON.parse(value); } catch(e) { throw new Error("Invalid JSON array"); }
      }
      if (!Array.isArray(arr)) throw new Error("categories must be an array");
      for (const item of arr) {
        if (!objectIdRegex.test(item)) throw new Error("each category must be a valid ObjectId");
      }
      return true;
    }),
  body("status")
    .optional()
    .isIn(["pending", "validated", "rejected"])
    .withMessage("invalid status"),
];

export { createArticleValidator, updateArticleValidator };
