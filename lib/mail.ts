const domain = process.env.NEXT_PUBLIC_BASE_URL;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_AUTH_USER,
    pass: process.env.BREVO_AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: "skhan282290@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: "skhan282290@gmail.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
