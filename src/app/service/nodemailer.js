import nodemailer from "nodemailer";
const email = process.env.NEXT_PUBLIC_SENDER_EMAIL;
const pass = process.env.NEXT_PUBLIC_SENDER_PASSWORD;
export const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
};
