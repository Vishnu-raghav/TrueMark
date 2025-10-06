import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const organizationSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    type: {
      type: String,
      enum: ["college", "coaching", "company", "NGO", "edtech", "other"],
      default: "other",
    },

    address: { type: String },
    phone: { type: String },
    website: { type: String },

    // 🔹 Members of this org
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🔹 Users who can issue certificates
    issuers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🔹 Certificates issued by org
    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],

    // 🔹 Admin (the one who registered this organization)
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshToken: { type: String },
  },
  { timestamps: true }
);

//
// 🔐 Hash password
//
organizationSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//
// 🔍 Check password
//
organizationSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//
// 🪪 Generate access token
//
organizationSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      type: this.type,
      admin: this.admin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

//
// 🔁 Generate refresh token
//
organizationSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Organization = mongoose.model("Organization", organizationSchema);
