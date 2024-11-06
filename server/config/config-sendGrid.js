import sgMail from "@sendgrid/mail";
import { configDotenv } from "dotenv";

configDotenv({ path: "./environment/.env" });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(userEmail, username, comment) {
  const msg = {
    to: userEmail,
    from: process.env.EMAIL,
    subject: "Confirmation of Your Issue - Action Underway",
    text: `Dear ${username}, \nThank you for reaching out to us and bringing your concern to our attention. \nWe have received your comment and would like to inform you that our team is currently analyzing the issue: "${comment}". \nRest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process. \nThank you for your trust in us. \nBest regards, \nTask Pro customer support team !`,
    html: `<p>Dear <strong>${username}</strong>,</p> 
      <p>Thank you for reaching out to us and bringing your concern to our attention.</p>
      <p>We have received your comment and would like to inform you that our team is currently analyzing the issue: <strong>"${comment}"</strong>.</p>
      <p>Rest assured that we are committed to finding a resolution as quickly as possible. We appreciate your patience and understanding during this process.</p>
      <p>Thank you for your trust in us.</p>
      <p>Best regards,</p>
      <p><strong>TaskPro</strong>'s customer support team !</p>`,
  };

  sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((error) => console.log(error?.response?.body?.errors[0]?.message));
}

export default sendEmail;
