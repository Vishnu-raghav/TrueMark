import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },

    description: {
      type: String,
    },

    certificateId: {
      type: String,
      unique: true,
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date, 
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    verificationHash: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String, 
    },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
