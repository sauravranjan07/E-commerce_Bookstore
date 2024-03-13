import express from "express";
import { categorySchema } from "../Models/category";

async function createCategory(req: express.Request, resp: express.Response) {
  const result = await categorySchema.find({ name: req.body.name });
  console.log(result)
  if (result.length) {
    return resp.send({
      message: "Category already exists",
      datacount: result.length,
      result
    });
  }
  const data = await new categorySchema(req.body).save();
  return resp.json({ message: "Category created", result: data });
}
async function getAllCategory(req: express.Request, resp: express.Response) {
  const result = await categorySchema.find();
  return resp.send({
    dataCount: result.length,
    message: "all fetched",
    result,
  });
}
async function deleteCategoryById(req: express.Request, resp: express.Response) {
  const id = req.params.id;
  const result = await categorySchema.findByIdAndDelete({ _id: id });
  resp.send({ message: "deleted succesfully", result });
}
export { createCategory, getAllCategory, deleteCategoryById };
