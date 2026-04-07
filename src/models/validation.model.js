import mongoose from "mongoose";

const validationSchema = new mongoose.Schema(
    {
        idArticle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true,
        },
        idAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // a voir
            required: true
        },
    }

)

const Validation = mongoose.model("Validation", validationSchema);
export default Validation;