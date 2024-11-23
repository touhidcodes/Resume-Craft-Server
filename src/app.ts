import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { gobbleErrorHandler } from "./app/middlewears/globalErrorHandler";

const app: Application = express();
export const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api", (req: Request, res: Response) => {
  res.send({
    massage: "Hello world",
  });
});
app.use("/api", router);

app.use(gobbleErrorHandler.gobbleError);
app.use(gobbleErrorHandler.notFound);
export default app;
