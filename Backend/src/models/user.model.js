import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },

    googleId: { type: String, default: null },

    role: {
      type: String,
      enum: ["member", "issuer", "orgAdmin", "superAdmin"],
      default: "member",
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null, // ✅ Allow null for members
      required: function () {
        // ✅ Only require for issuer and orgAdmin roles
        return ["issuer", "orgAdmin"].includes(this.role);
      },
    },

    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],

    studentMeta: {
      id: { type: String },          
      category: { type: String },    
      course: { type: String },           
      organization: { type: String }, 
      jobTitle: { type: String }, 
    },

    // ✅ New fields for better member management
    profileStatus: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "active"
    },

    phone: { type: String, default: "" },
    
    dateOfBirth: { type: Date, default: null },
    
    educationLevel: { 
      type: String, 
      enum: ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "Diploma", "Certificate", "Other", ""],
      default: ""
    },

    refreshToken: { type: String },
  },
  { timestamps: true }
);

// Password Hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password Check
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Tokens
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      organization: this.organization,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);