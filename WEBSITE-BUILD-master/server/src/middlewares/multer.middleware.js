import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = crypto.randomBytes(4).toString('hex');
      cb(null, file.fieldname + '-' + Date.now() + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
  
export const upload = multer({
     storage,
});
