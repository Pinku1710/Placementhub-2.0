import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  createInterview,
  deleteInterview
} from "../controllers/interviewController.js";

const router = Router();

router.use(requireAuth);
router.post("/application/:applicationId", createInterview);
router.delete("/:id", deleteInterview);

export default router;
