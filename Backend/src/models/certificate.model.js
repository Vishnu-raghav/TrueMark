import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
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
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
