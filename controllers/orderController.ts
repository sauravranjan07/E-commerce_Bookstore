import { orderSchema } from "../Models/order";
import { bookSchema } from "../Models/book";
import express from "express";
async function createOrder(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  try {
    const data = req.body;
    console.log("before adding price", data);
    for (let index in data) {
      let order = data[index];
      let productId = order.book;
      let price = (await bookSchema.findOne({ _id: productId }))?.price;
      data[index].price = price;
    }
    console.log("after adding price", data);
    const final_result = await orderSchema.create(data);
    return resp.send({
      data: final_result,
      success: true,
    });
  } catch (error: any) {
    return error.message;
  }
}
async function getMyOrder(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  const id = req.params.id;
  let result = await orderSchema.find({ user: id });
  return resp.send({
    total_Orders:result.length,
    data: result,
    success: true,
  });
}
export { createOrder, getMyOrder };
