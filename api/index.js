import express from "express";
import db from "./database/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Server is running at port:${port}`));
