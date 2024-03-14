import { userSchema } from "../Models/user";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { generatePassword, comparePassword } from "../helpers/hashPassword";
import { validateRegistration } from "../helpers/schemaValidators";
import Signup from '../interfaces/signup'
async function registerUser(
  req: express.Request,
  resp: express.Response
): Promise<Record<string, any>> {
  const data: Signup = req.body;

  try {
    if (validateRegistration(data)) {
      resp.statusCode = 400;
      return resp.send({
        message: validateRegistration(data)[0].message,
        success: false,
      });
    }
    let { email, password, repassword } = data;
    if (password != repassword) {
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
    const hash = await generatePassword(password);
    const user = {
      name: data.name,
      email: data.email,
      password: hash,
      repassword: hash,
      phone: data.phone,
      isAdmin: data.isAdmin,
    };
    let result: any = await new userSchema(user).save();
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
  try {
    const email = req.body.email;
    const result = await userSchema.findOne({ email: email });
    if (!result) {
      resp.statusCode = 404;
      return resp.json({
        message: "Email dosent exist",
        success: false,
        token: "Null",
      });
    }
    // 2.if password not matched
    const verifiedPassword = await comparePassword(
      req.body.password,
      result.password
    );
    if (!verifiedPassword) {
      resp.statusCode = 400;
      return resp.json({
        message: "Password not matched",
        success: false,
        token: "null",
      });
    } else {
      const payload = {
        id: result._id,
        email: result.email,
        isAdmin: result.isAdmin,
      };
      const token: string = jsonwebtoken.sign(payload, "Saurav", {
        expiresIn: "240s",
      });
      return resp.json({
        message: "Login successfully",
        success: true,
        token,
      });
    }
  } catch (error) {
    return new Error("you have an error");
  }
}

export { registerUser, getAllUusers, deleteUserById, loginUser };
