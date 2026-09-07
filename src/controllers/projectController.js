import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate(
            "createdBy",
            "name email role",
        );

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            "createdBy",
            "name email role",
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
