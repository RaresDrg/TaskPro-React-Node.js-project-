import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv({ path: "../environment/.env" });

function sendEmail(userEmail, username, comment) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const msg = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Confirmation of Your Issue - Action Underway",
    text: `Dear ${username}, \nThank you for reaching out to us and bringing your concern to our attention. We have received your comment and would like to inform you that our team is currently analyzing the issue: "${comment}". \nRest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process. \nThank you for your trust in us. \nBest regards, \nTask Pro customer support team !`,
    html: `<p>Dear <strong>${username}</strong>,</p> 
      <p>Thank you for reaching out to us and bringing your concern to our attention. We have received your comment and would like to inform you that our team is currently analyzing the issue: <strong>"${comment}"</strong>.</p>
      <p>Rest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process. Thank you for your trust in us.</p>
      <p>Best regards,</p>
      <p><strong>TaskPro</strong>'s customer support team !</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter
      .sendMail(msg)
      .then(() =>
        resolve(console.log(`Email sent succesfully to: ${userEmail}`))
      )
      .catch((error) => {
        reject(new Error("Email not sent. internal server error"));
        console.error(error);
      });
  });
}

export default sendEmail;
