import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    type: {
      type: String,
      enum: ["college", "coaching", "company", "NGO", "edtech", "other"],
      default: "other",
    },

    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    website: { type: String, default: "" },

    // ✅ Better user management
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

    staff: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["issuer", "orgAdmin"],
        default: "issuer"
      },
      assignedAt: {
        type: Date,
        default: Date.now
      }
    }],

    certificates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
    }],

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ✅ New fields for better organization management
    status: {
      type: String,
      enum: ["pending", "active", "suspended", "rejected"],
      default: "active"
    },

    description: { type: String, default: "" },
    
    logo: { type: String, default: "" },

    settings: {
      autoApproveCertificates: { type: Boolean, default: false },
      allowMemberRegistration: { type: Boolean, default: true },
      maxUsers: { type: Number, default: 1000 }
    },

    emailDomain: {
    type: String,
    required: true,
    default: "example.com" // Temporary
  },
  
  // Settings for auto-approval
  settings: {
     autoApproveCertificates: { type: Boolean, default: false },
      allowMemberRegistration: { type: Boolean, default: true },
      maxUsers: { type: Number, default: 1000 },
      // ✅ NEW: Auto-approve students by domain
      autoApproveByDomain: { type: Boolean, default: true }
  },

    refreshToken: { type: String },
  },
  { timestamps: true }
);

// Password Hash
organizationSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password Check
organizationSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Tokens
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

organizationSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Organization = mongoose.model("Organization", organizationSchema);