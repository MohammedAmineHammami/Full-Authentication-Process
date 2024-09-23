import { sender, mailtrap_client } from "./emailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./email.templates.js";

const clientUrl = "http://localhost:3001/reset-pass";
export const sendVerificationEmail = async (email, code) => {
  const recipients = [{ email }];

  try {
    mailtrap_client
      .send({
        from: sender,
        to: recipients,
        subject: "Account Verification",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code),
        category: "Integration Test",
      })
      .then(console.log, console.error);
  } catch (err) {
    throw err;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];
  try {
    mailtrap_client
      .send({
        from: sender,
        to: recipients,
        template_uuid: "cb402590-ef16-44a1-b090-22f08275c29c",
        template_variables: {
          company_info_name: "HAMMAMI COMPANY",
          name,
        },
      })
      .then(console.log, console.error);
  } catch (err) {
    throw err;
  }
};

export const sendResetPassRequestEmail = async (token, email) => {
  const recipients = [{ email }];
  console.log("resetUrl", `${clientUrl}/${token}`);
  try {
    mailtrap_client
      .send({
        from: sender,
        to: recipients,
        subject: "Account Verification",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
          "{resetURL}",
          `${clientUrl}/${token}`
        ),
        category: "Integration Test",
      })
      .then(console.log, console.error);
  } catch (err) {
    throw err;
  }
};

export const sendSuccessResetPassEmail = async (email) => {
  const recipients = [{ email }];
  try {
    mailtrap_client
      .send({
        from: sender,
        to: recipients,
        subject: "Password Updated",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Integration Test",
      })
      .then(console.log, console.error);
  } catch (err) {
    throw err;
  }
};
