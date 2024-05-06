import express from "express";
import { bookSchema } from "../Models/book";
let upload_Folder = "media/products";

async function createBook(req: express.Request, resp: express.Response) {
  try {
    const productImage =  req.file?.filename;
    const data = await bookSchema.find({ name: req.body.name });
    if (data.length) {
      resp.statusCode = 400;
      return resp.send({
        message: "book with same name already exists",
        datacount: data.length,
      });
    }
    let product = new bookSchema({
      ...req.body,
      productImage, //giving image name should be same as model name
    });
    const result = await product.save();
    return resp.send({ message: "book added succesfully", result });
  } catch (error: any) {
    return resp.json({ message: error.message });
  }
}

async function getAllBooks(req: express.Request, resp: express.Response) {
  const result = await bookSchema.find().populate([
    {path:"category",select:"name"}
  ]);
  return resp.send({
    dataCount: result.length,
    message: "All books fetched",
    result: result,
  });
}
async function deleteBookById(req: express.Request, resp: express.Response) {
  const id = req.params.id;
  if (id) {
    try {
      const result = await bookSchema.findByIdAndDelete({ _id: id });
      return resp.json({ message: "Deleted successfully", result });
    } catch (error: any) {
      return resp.json({ Error: error.message });
    }
  }
}

async function findBookByCategory(
  req: express.Request,
  resp: express.Response
) {
  const category: string = req.params.id;
  if (category) {
    try {
      const result = await bookSchema.find({ category: category });
      console.log(result);
      return resp.json({
        message: "Book fetched by provided Category",
        data: result,
      });
    } catch (error: any) {
      return resp.json({ Error: error.message });
    }
  }
}
export { createBook, getAllBooks, deleteBookById, findBookByCategory };
