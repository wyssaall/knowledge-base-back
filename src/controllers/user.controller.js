// Admin: createAccount, deleteAccount, updateAccount logics
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getTechniciens = async (req, res) => {
  const users = await User.find({ role: "technicien" }).select("-password");
  return res.status(200).json(users);
};

const createTechnicien = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already used" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role === "admin" ? "admin" : "technicien",
  });

  return res.status(201).json(sanitizeUser(user));
};

const updateTechnicien = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role && ["admin", "technicien"].includes(role)) user.role = role;
  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();
  return res.status(200).json(sanitizeUser(user));
};

const deleteTechnicien = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted" });
};

export {
  getTechniciens,
  createTechnicien,
  updateTechnicien,
  deleteTechnicien,
};