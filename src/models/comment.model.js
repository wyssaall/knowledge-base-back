import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        idArticle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
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