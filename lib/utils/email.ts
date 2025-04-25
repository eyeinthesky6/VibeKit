import nodemailer from 'nodemailer';
import { loadEnv } from '../../config/env';

const env = loadEnv();

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendInvitationEmail(
  to: string,
  teamName: string,
  role: string,
  inviteId: number
) {
  const url = `${env.BASE_URL}/sign-up?inviteId=${inviteId}`;
  const info = await transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject: `You're invited to join ${teamName}`,
    html: `<p>You have been invited as <strong>${role}</strong> to join <strong>${teamName}</strong>.</p><p><a href="${url}">Click here to accept</a></p>`,
  });
  console.log('Invitation email sent:', info.messageId);
}
