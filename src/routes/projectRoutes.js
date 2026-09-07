import express from "express";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProjects);

router.get("/:id", authMiddleware, getProjectById);

router.post("/", authMiddleware, isAdmin, createProject);

router.put("/:id", authMiddleware, isAdmin, updateProject);

router.delete("/:id", authMiddleware, isAdmin, deleteProject);

export default router;
