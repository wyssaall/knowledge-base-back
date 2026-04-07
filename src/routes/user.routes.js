import express from "express";
import {
  createTechnicien,
  deleteTechnicien,
  getTechniciens,
  updateTechnicien,
} from "../controllers/user.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getTechniciens);
router.post("/", createTechnicien);
router.put("/:id", updateTechnicien);
router.delete("/:id", deleteTechnicien);

export default router;
