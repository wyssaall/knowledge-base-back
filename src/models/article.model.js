import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        content: {
            type: String,
            required: true,
            minlength: 20
        },


        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
        }

    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Article", articleSchema);
