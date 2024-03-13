import express from "express";
import { bookSchema } from "../Models/book";

async function createBook(req: express.Request, resp: express.Response) {
  const data = await bookSchema.find({ name: req.body.name });
  if (data.length) {
    resp.statusCode = 400;
    return resp.send({
      message: "book with same name already exists",
      datacount: data.length,
    });
  }
  const result = await new bookSchema(req.body).save();
  return resp.send({ message: "book added succesfully", result });
}

async function getAllBooks(req: express.Request, resp: express.Response) {
  const result = await bookSchema.find();
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
