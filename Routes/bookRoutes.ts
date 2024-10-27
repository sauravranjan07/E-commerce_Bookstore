import express from "express";
const bookRouter = express.Router();
import {
  createBook,
  deleteBookById,
  findBookByCategory,
  getAllBooks,
} from "../controllers/bookController";
import { adminAuthMiddleware } from "../middlewares/user-auth-middleware";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
let upload_Folder = "media/products";
let s3_key="AKIA6JQ45DI2D3K5HVKJ";
let s3_secret_key="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"
let s3_bucket_name="pageturnbooksimg"

const { S3Client } = require('@aws-sdk/client-s3')
// const multerS3 = require('multer-s3')
import multers3 from  'multer-s3'

const app = express()

const s3 = new S3Client({
  region:"ap-southeast-2",
  credentials:{
    secretAccessKey:s3_secret_key,
    accessKeyId:s3_key,
  },
})





// const tempMulter = multerS3({ dest: "media/products" });
let storage = multers3({
  s3: s3,
  bucket: s3_bucket_name,
  metadata: function (req: any, file: { fieldname: any; }, cb: (arg0: null, arg1: { fieldName: any; }) => void) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, new mongoose.Types.ObjectId() + ".png")
  }
})
const upload = multer({ storage });

bookRouter.post("/addbook", upload.single("image"), createBook);
bookRouter.get("/allbooks", getAllBooks);
bookRouter.delete("/deletebook/:id", adminAuthMiddleware, deleteBookById);
bookRouter.get("/getbookbycategory/:id", findBookByCategory);
export { bookRouter };
