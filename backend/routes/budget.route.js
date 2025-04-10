import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addExpense, createBudget, getBudget } from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", protectRoute, getBudget);

router.post("/create", protectRoute, createBudget);

router.post("/:id/expense", protectRoute, addExpense);

export default router;
