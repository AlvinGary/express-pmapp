import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(201).json({
            message: "Register successful",
            user: userResponse,
        });
    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const matched = await user.comparePassword(password);

        if (!matched) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
        );

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({
            message: "Login successful",
            token,
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
