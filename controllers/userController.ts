import { userSchema } from "../Models/user";
import express from "express";

async function registerUser(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  const data: any = req.body;
  try {
    if (!data) {
      resp.statusCode = 400;
      return resp.send({
        message: "body not available",
        success: false,
      });
    }
    let { email, password, repassword } = req.body;
    if (password !== repassword) {
      resp.statusCode = 500;
      return resp.json({
        message: "Password not matched",
        success: false,
      });
    }
    let userData = await userSchema.findOne({ email: email });
    if (userData) {
      resp.statusCode = 500;
      return resp.json({
        message: "Email already exists",
        success: false,
      });
    }
    let result: any = await new userSchema(req.body).save();
    resp.statusCode = 200;
    return resp.send({
      message: "user added successfully",
      data: result,
    });
  } catch (error) {
    return resp.send(error);
  }
}
async function getAllUusers(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  let result: Array<Record<string, any>> = await userSchema.find();
  if (!result.length) {
    resp.statusCode = 404;
    return resp.json({ message: "no data exists", dataCount: result.length });
  }
  return resp.json({ dataCount: result.length, result });
}

async function deleteUserById(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  const id = req.params.id;
  if (!id) {
    return resp.json({
      message: "please provide an id",
      success: false,
      id: false,
    });
  }
  const result = await userSchema.findByIdAndDelete({ _id: id });
  if (result == null) {
    resp.statusCode = 404;
    return resp.json({ message: "no data found", result: result });
  }
  resp.statusCode = 200;
  return resp.json({ message: "Data deleted successfully", result: result });
}
async function loginUser(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  // 1.check email exists or not
  const email = req.body.email;
  const result = await userSchema.findOne({ email: email });
  if (!result) {
    resp.statusCode = 404;
    return resp.json({ message: "Email dosent exist", success: false });
  }
  // 2.if password not matched
  else if (result.password != req.body.password) {
    resp.statusCode = 400;
    return resp.json({ message: "Password not matched", success: false });
  } else {
    return resp.json({ message: "Login successfully", success: true });
  }
}

export { registerUser, getAllUusers, deleteUserById, loginUser };
