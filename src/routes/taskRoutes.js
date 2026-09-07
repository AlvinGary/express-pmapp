import express from "express";

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTaskById);

router.post("/", authMiddleware, isAdmin, createTask);

router.put("/:id", authMiddleware, isAdmin, updateTask);

router.delete("/:id", authMiddleware, isAdmin, deleteTask);

export default router;
