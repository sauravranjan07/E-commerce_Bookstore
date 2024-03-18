import express, { Express, Response, Request } from "express";
import { createConnection } from "./Database/connection";
import {userRouter} from './Routes/userRoutes'
import morgan from "morgan";
import dotenv from "dotenv";
import { bookRouter } from "./Routes/bookRoutes";
import { categoryRouter } from "./Routes/categoryRoute";
import { orderRouter } from "./Routes/orderRoutes";
dotenv.config();
const app: Express = express();
app.use(express.json())


app.use(morgan("dev"));
app.listen(3000, async (): Promise<any> => {
  let result: string | undefined = await createConnection();
  if (result) {
    console.log(`I am ${result} and working on port 3000 && Database is connected`);
  }
});
app.get("/", (req: Request, resp: Response) => {
  resp.send({ message: "helooo im working on 3000" });
});
const apirouter=express.Router()
app.use('/api',apirouter)
apirouter.use('/user',userRouter)
apirouter.use('/books',bookRouter)
apirouter.use('/category',categoryRouter)
apirouter.use('/order',orderRouter)