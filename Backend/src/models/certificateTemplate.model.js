import mongoose from "mongoose";
import fieldSchema from "./fields.model.js";

const certificateTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    fields: [fieldSchema], 

    backgroundUrl: { type: String }, 

    logoUrl: { type: String },
    signatureUrls: [{ type: String }],

    isDefault: { type: Boolean, default: false },

    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const CertificateTemplate = mongoose.model(
  "CertificateTemplate",
  certificateTemplateSchema
);
