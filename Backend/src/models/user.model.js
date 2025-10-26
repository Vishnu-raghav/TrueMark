import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["member", "issuer", "orgAdmin", "superAdmin"],
      default: "member",
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    certificates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Certificate",
    }],

    phone: { 
      type: String, 
      default: "" 
    },
    
    dateOfBirth: { 
      type: Date, 
      default: null 
    },
    
    educationLevel: { 
      type: String, 
      enum: [
        "High School", 
        "Associate Degree", 
        "Bachelor's Degree", 
        "Master's Degree", 
        "Doctorate", 
        "Diploma", 
        "Certificate", 
        "Other", 
        ""
      ],
      default: ""
    },

    refreshToken: { 
      type: String 
    }

  },
  { 
    timestamps: true 
  }
);

// Password hash karo
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password check karo
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token generate karo
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Refresh Token generate karo
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);