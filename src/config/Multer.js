import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

const configStorage = {
  restaurant: {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", "storage", "restaurants"),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);

          return cb(null, res.toString("hex") + extname(file.originalname));
        });
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!extname(file.originalname).match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
      }
      return cb(null, true);
    },
  },

  product: {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", "storage", "products"),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, res) => {
          if (err) return cb(err);

          return cb(null, res.toString("hex") + extname(file.originalname));
        });
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!extname(file.originalname).match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
      }
      return cb(null, true);
    },
  },
};

export { configStorage };
