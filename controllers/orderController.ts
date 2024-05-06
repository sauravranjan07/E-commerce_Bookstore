import { orderSchema } from "../Models/order";
import { bookSchema } from "../Models/book";
import express from "express";
import { testEmail } from "../helpers/mailHelper";
import { userSchema } from "../Models/user";
// Creating Order
async function createOrder(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  try {
    const data = req.body;
    let tp = 0;
    for (let index in data) {
      let order = data[index];
      let productId = order.book;
      let data2 = await bookSchema.findOne({ _id: productId });
      data[index].price = data2?.price;
      data[index].name = data2?.name;
    }
    let final_result:Array<any>|any = await orderSchema.create(data);
    let { name, email } = req.user?.userData;
    for(let i=0;i<final_result.length;i++){
      tp+=final_result[i].price*final_result[i].quantity
    }
    let email_response = await testEmail(email, final_result, name,tp);
    return resp.send({
      data: final_result,
      success: true,
      email: req.user?.userData.email,
      total:tp,
      email_response: email_response,
    });
  } catch (error: any) {
    return error.message;
  }
}
async function getMyOrder(req: express.Request, resp: express.Response) {
  try {
    const id = req.user?.userData?.id;
    const data = await orderSchema.find({ user: id });
    resp.send({
      no_of_orders: data.length,
      data: data,
      success: true,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
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
  } catch (error: any) {
    return resp.send({
      data: error.message,
    });
  }
}

export { createOrder, getMyOrder, deleteMyOrder };
