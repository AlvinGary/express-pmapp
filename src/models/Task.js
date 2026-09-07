import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
        },

        description: {
            type: String,
            required: true,
            minlength: 10,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        assignedTo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        deadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["todo", "in progress", "done"],
            default: "todo",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Task", taskSchema);
