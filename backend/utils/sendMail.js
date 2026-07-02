import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    if (!to) {
      throw new Error("No recipient email provided");
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    console.log("Sending mail to:", to, "| subject:", subject);
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully to:", to);
  } catch (error) {
    console.error("error sending email", error);
    throw error;
  }
};
