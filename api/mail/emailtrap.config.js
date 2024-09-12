import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

const mailtrap_token = process.env.MAILTRAP_TOKEN;

export const mailtrap_client = new MailtrapClient({
  token: mailtrap_token,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
