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
const tempMulter = multer({ dest: "media/products" });
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.join(__dirname, "../") + upload_Folder;
    // __dirname gives the currentv laction of project + upload_folder adress will be joined
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const fileName = new mongoose.Types.ObjectId() + ".png"; //creting a file name
    cb(null, fileName);
  },
});
const upload = multer({ storage });

bookRouter.post("/addbook", upload.single("image"), createBook);
bookRouter.get("/allbooks", getAllBooks);
bookRouter.delete("/deletebook/:id", adminAuthMiddleware, deleteBookById);
bookRouter.get("/getbookbycategory/:id", findBookByCategory);
export { bookRouter };
