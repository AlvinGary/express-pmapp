import express from "express";

import {
    register,
    login,
    getCurrentUser,
    // getUsers,
    // getUserById,
    // updateUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get-user", authMiddleware, getCurrentUser);

// router.get("/users", authMiddleware, isAdmin, getUsers);

// router.get("/users/:id", authMiddleware, isAdmin, getUserById);

// router.put("/users/:id", authMiddleware, isAdmin, updateUser);

export default router;
