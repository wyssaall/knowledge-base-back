import Category from "../models/category.model.js";

const getCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json(categories);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(409).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });
  return res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  return res.status(200).json(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  return res.status(200).json({ message: "Category deleted" });
};

export { getCategories, createCategory, updateCategory, deleteCategory };
