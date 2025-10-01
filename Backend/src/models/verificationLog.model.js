import mongoose from "mongoose";

const verificationLogSchema = new mongoose.Schema(
  {
    certificate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
      required: true,
      index: true,
    },

    verifierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, 
    },

    verifierEmail: {
      type: String, 
    },

    verifierName: {
      type: String, 
    },

    verifierIp: {
      type: String,
    },

    verifierDevice: {
      type: String, 
    },

    status: {
      type: String,
      enum: ["valid", "revoked", "expired"],
      required: true,
    },

    note: {
      type: String, 
    },

    isPremiumLog: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

verificationLogSchema.index({ certificate: 1, verifierId: 1 });
verificationLogSchema.index({ certificate: 1, createdAt: -1 });

export const VerificationLog = mongoose.model(
  "VerificationLog",
  verificationLogSchema
);
