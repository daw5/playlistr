require("dotenv").config();
const nodemailer = require("nodemailer");

export default class MailingService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILING_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
  }

  sendVerificationEmail(userEmail, code, userId) {
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-account/${userId}/${code}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userEmail,
      subject: "Email Verification",
      html: `<h1>Thank you for creating your account!</h1><p><a href=${verificationLink}>Click this link to verify your email</a></p>`,
    };
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email not sent: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
