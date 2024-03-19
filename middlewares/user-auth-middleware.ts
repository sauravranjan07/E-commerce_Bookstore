import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import express, { NextFunction } from "express";
function userAuthMiddleware(
  req: express.Request,
  resp: express.Response,
  next: NextFunction
) {
  try {
    let B_token: string | undefined = req.headers.authorization; //actual jwt token nikala gaya B_token
    let token: any = ""; // ek variable
    token = B_token?.split(" ")[1]; // token me pehle space ke baad jwt retrieve
    const payload = jsonwebtoken.verify(token, "Saurav");
    req.user = {
      userData: payload, //session ke andar user key ke saath request me payload gaya
    };
    next();
  } catch (error) {
    resp.status(401); //unauthorized error
    return resp.json({ error: "invalid...please login" });
  }
}

function adminAuthMiddleware(
  req: express.Request,
  resp: express.Response,
  next: NextFunction
) {
  try {
    let B_token: any = req.headers.authorization?.split(" ")[1];
    const payload: JwtPayload | string = jsonwebtoken.verify(B_token, "Saurav");
    let data = JSON.parse(JSON.stringify(payload));
    req.user = {
      userdata: data,
    };
    if (+data.isAdmin) {
      return next();
    }
    resp.status(401);
    return resp.json({ err: "not an admin......you are not authorized" });
  } catch (error) {
    resp.status(401);
    return resp.json({ err: "invalid token" });
  }
}
export { userAuthMiddleware, adminAuthMiddleware };
