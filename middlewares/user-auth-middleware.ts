import jsonwebtoken from "jsonwebtoken";
import express, { NextFunction } from "express";
function userAuthMiddleware(
  req: express.Request,
  resp: express.Response,
  next: NextFunction
) {
  try {
    console.log(`i m in line no 9 in userauth middleware`);
    let B_token: string | undefined = req.headers.authorization; //actual jwt token nikala gaya B_token
    let token: any = ""; // ek variable
    token = B_token?.split(" ")[1]; // token me pehle space ke baad jwt retrieve
    const payload = jsonwebtoken.verify(token, "Saurav");
    console.log(payload)
    req.user = {
      userData: payload, //session ke andar user key ke saath request me payload gaya
    };
    next();
  } catch (error) {
    resp.status(401); //unauthorized error
    return resp.json({ error: "invalid...please login" });
  }
}
export { userAuthMiddleware };
