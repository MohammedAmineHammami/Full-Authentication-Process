import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const database_uri = process.env.DATABASE_URI;
const db = mongoose
  .connect(database_uri)
  .then(() => console.log("database is connected!"))
  .catch((err) => console.log(err));

export default db;
