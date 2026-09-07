import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
            required: true,
            minlength: 10,
        },

        deadline: {
            type: Date,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("Project", projectSchema);
