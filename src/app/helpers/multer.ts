import { Request } from "express";
import multer from "multer";
import path from "path";

const maxSize = 1 * 1024 * 1024; //1MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "..", "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    return cb(null, true);
  }

  cb(null, false);
}

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single("img");
