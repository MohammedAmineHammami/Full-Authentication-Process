import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const enviroment = process.env.ENVIROMENT_MODE;
export const genTokenAndSetCookie = (res, id) => {
  const accessToken = Jwt.sign({ user_id: id }, secretKey, { expiresIn: "1h" });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: enviroment === "production",
    maxAge: 60 * 60 * 1000, //1h
  });
};
