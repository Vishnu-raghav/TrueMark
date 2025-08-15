import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true, 
      unique: true,
    },

    password: {
      type: String,
      default: null, 
    },

    googleId: {
      type: String,
      default: null, 
    },

    rollNo: {
      type: String,
      required: true, 
      unique: true,
    },

    collegeName: {
      type: String,
    },

    course: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },
    refreshToken : {
      type : String
    }
  },
  { timestamps: true }
);

studentSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next()
  this.password = bcrypt.hash(this.password,10)
  next()
})

studentSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)

}

export const Student = mongoose.model("Student", studentSchema);
