import express from "express";
import {
  changeUserRole,
  deleteUser,
  getAllUsers,
} from "../controllers/admin.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect, authorize("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", changeUserRole);
router.delete("/users/:id", deleteUser);

export default router;
