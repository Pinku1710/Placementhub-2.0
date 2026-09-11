import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { dashboard } from "../controllers/dashboardController.js";

const router = Router();
router.get("/", requireAuth, dashboard);

export default router;
