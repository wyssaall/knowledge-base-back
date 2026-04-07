import User from "../models/user.model.js";
import { AppError, asyncHandler } from "../middlewares/error.middleware.js";

const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: users });
});

const changeUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["admin", "technicien"].includes(role)) {
    throw new AppError("role must be admin or technicien", 400);
  }

  const user = await User.findById(req.params.id);
  if (!user) throw new AppError("User not found", 404);

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: { _id: user._id, email: user.email, role: user.role, name: user.name },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

export { getAllUsers, changeUserRole, deleteUser };
