import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return this.role === "student"; 
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required : function() {
        return !this.googleId
      }
    },

    googleId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    rollNo: {
      type: String,
      unique: true,
      required:function () {
        return this.role === "student"; 
     },
    },
    collegeName: {
      type: String,
    },
    course: {
      type: String,
    },
    branch: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
    
    certificates:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Certificate"
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      rollNo: this.rollNo,
      name: this.name,
      role: this.role,  
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, 
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User",userSchema)