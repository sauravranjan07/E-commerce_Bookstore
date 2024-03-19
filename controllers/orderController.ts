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
    const final_result = await orderSchema.create(data);
    return resp.send({
      data: final_result,
      success: true,
    });
  } catch (error: any) {
    return error.message;
  }
}
async function getMyOrder(req: express.Request, resp: express.Response) {
  const id = req.user?.userData?.id;
  const data = await orderSchema.find({ user: id });
  resp.send({
    no_of_orders: data.length,
    data: data,
    success: true,
  });
}
async function deleteMyOrder(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  try {
    const id = req.params.id;
    let result = await orderSchema.findByIdAndDelete({ _id: id });
    if (result) {
      return resp.send({
        data: result,
        success: false,
      });
    }
    resp.statusCode = 404;
    return resp.send({
      data: "Data not found",
      success: false,
    });
  } catch (error:any) {
    return resp.send({
      data:error.message
    })
  }
}
export { createOrder, getMyOrder, deleteMyOrder };
