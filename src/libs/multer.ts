import multer from "multer";
import path from "path";
import {v4 as uuid} from "uuid";

const storage = multer.diskStorage({
  destination: 'public',
  filename: (req, file, callback) => {
    callback(null, uuid() + path.extname(file.originalname));
  }
});

export default multer({storage});