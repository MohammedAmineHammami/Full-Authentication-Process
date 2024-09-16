import express from "express";
import db from "./database/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import "./utils/passportJwt.config.js";
import "./utils/passportGoogle.config.js";
import "./utils/passportGithub.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/fullAuthDB",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 15 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);

app.listen(port, () => console.log(`Server is running at port:${port}`));
