import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true, 
      unique: true,
    },

    password: {
      type: String,
      default: null, 
    },

    googleId: {
      type: String,
      default: null, 
    },

    rollNo: {
      type: String,
      required: true, 
      unique: true,
    },

    collegeName: {
      type: String,
    },

    course: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
