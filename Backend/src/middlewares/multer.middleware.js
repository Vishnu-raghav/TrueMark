import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WEBP allowed!"), false);
    }
  },
});

export const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const optimizedPath = `./public/temp/optimized-${Date.now()}.jpg`;

    await sharp(req.file.path)
      .resize({ width: 1000 })
      .jpeg({ quality: 70 })   
      .toFile(optimizedPath);

    fs.unlinkSync(req.file.path);

    req.file.path = optimizedPath;

    next();
  } catch (error) {
    console.error("Sharp error:", error);
    return res.status(500).json({ error: "Image optimization failed" });
  }
};
