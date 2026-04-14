import multer from "multer";
import path from "path";
import fs from "fs";

export const fileValidation = {
  image: ["image/jpeg", "image/png"],
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.resolve("./temp");
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (!fileValidation.image.includes(file.mimetype)) {
    return cb(new Error("invalid type"), false);
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});

export { upload };
