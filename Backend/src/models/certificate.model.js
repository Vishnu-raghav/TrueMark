import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    certificateId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    issueDate: { type: Date, default: Date.now },

    expiryDate: { type: Date },

    status: {
      type: String,
      enum: ["active", "revoked", "expired"],
      default: "active",
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

    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificateTemplate",
      required: true,
    },

    verificationHash: { type: String, required: true },

    fileUrl: { type: String },

    metaData: { type: mongoose.Schema.Types.Mixed }, 
  },
  { timestamps: true }
);

certificateSchema.index({ certificateId: 1, verificationHash: 1 });

export const Certificate = mongoose.model("Certificate", certificateSchema);
