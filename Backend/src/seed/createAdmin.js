import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { User } from "../models/user.model.js"; 

dotenv.config({ path: "./.env" });

const createDefaultAdmin = async () => {
  try {
    await connectDB();

    const exists = await User.findOne({ role: "admin" });
    if (exists) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    await User.create({
      name: "Super Admin",
      email: "vishnuraghav776@gmail.com",
      password: "Admin@123",
      role: "admin",   
      collegeName: "NA",
      course: "NA",
      branch: "NA",
    });

    console.log("default admin created");
    process.exit(0);
  } catch (err) {
    console.log("Error creating admin:", err.message);
    process.exit(1);
  }
};

createDefaultAdmin();
