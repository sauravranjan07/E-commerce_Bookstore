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
      message: "user controller working",
      data: result,
    });
  } catch (error) {
    return resp.send(error);
  }
}
async function getAllUusers(req:express.Request,resp:express.Response):Promise<Record<string,any>>{
    let result:Array<Record<string,any>>=await userSchema.find()
    return resp.json({result})
}
export { registerUser,getAllUusers };
