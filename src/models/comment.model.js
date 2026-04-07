import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        commentContent: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;