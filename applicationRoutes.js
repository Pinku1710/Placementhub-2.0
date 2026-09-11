import { Router } from "express";
import {
  listApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication
} from "../controllers/applicationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", listApplications);
router.get("/:id", getApplication);
router.post("/", createApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
