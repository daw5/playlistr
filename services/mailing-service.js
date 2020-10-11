require("dotenv").config();

export default class MailingService {
  constructor() {
    this.nodemailer = require("nodemailer");
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILING_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
  }

  sendVerificationEmail(userEmail, verificationLink) {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userEmail,
      subject: "Email Verification",
      html: `<h1>Thank you for creating your account!</h1><p>Click this link to verify your account ${verificationLink}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
