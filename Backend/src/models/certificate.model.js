import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  certificateTitle: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  certificateFileURL: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required : true
  },
  hash: {
    type: String, 
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  verificationId: {   
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
