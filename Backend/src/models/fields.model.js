import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    fieldName: { type: String, required: true }, 
    label: { type: String }, 

    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },

    fontSize: { type: Number, default: 16 },
    fontColor: { type: String, default: "#000000" },
    fontFamily: { type: String, default: "Arial" },
    bold: { type: Boolean, default: false },

    placeholder: { type: String }, 
  },
  { _id: false } 
);

export default fieldSchema;
