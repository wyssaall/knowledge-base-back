import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['technicien', 'admin'],
      default: 'technicien'
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
