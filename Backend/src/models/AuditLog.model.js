import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "USER_LOGIN",
        "USER_LOGOUT",
        "ROLE_UPDATE",
        "USER_INVITE",
        "USER_REMOVE",
        "CERTIFICATE_ISSUED",
        "CERTIFICATE_REVOKED",
        "CERTIFICATE_UPDATED",
        "TEMPLATE_CREATED",
        "TEMPLATE_UPDATED",
        "TEMPLATE_DELETED",
        "SUBSCRIPTION_UPDATED",
        "ORG_SETTING_UPDATE",
      ],
      required: true,
    },

    details: {
      type: mongoose.Schema.Types.Mixed, 
      default: {},
    },

    ipAddress: { type: String },
    userAgent: { type: String }, 
    location: { type: String }, 
    severity: {
      type: String,
      enum: ["INFO", "WARNING", "CRITICAL"],
      default: "INFO",
    },
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
