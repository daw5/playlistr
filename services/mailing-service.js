require("dotenv").config();
const mailgun = require("mailgun-js");

export default class MailingService {
  constructor() {
    this.DOMAIN = process.env.MAILGUN_DOMAIN;
  }

  sendVerificationEmail(userEmail, code, userId) {
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-account/${userId}/${code}`;
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: this.DOMAIN,
    });
    const data = {
      from: `daw5@${this.DOMAIN}`,
      to: userEmail,
      subject: "Email Verification",
      html: `<h1>Thank you for creating your account!</h1><p><a href=${verificationLink}>Click this link to verify your email</a></p>`,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        console.log("error: ", error);
      } else {
        console.log(body);
      }
    });
  }
}
