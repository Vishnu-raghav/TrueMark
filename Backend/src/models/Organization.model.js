import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["college", "coaching", "company", "ngo", "edtech", "other"],
      default: "other",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    phone: {
      type: String,
    },

    website: {
      type: String,
    },

    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],

    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],

  },
  { timestamps: true }
);

export const Organization = mongoose.model("Organization", organizationSchema);
