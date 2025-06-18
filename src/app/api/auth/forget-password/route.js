import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from "../../../../../models/User";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Generate Random password
const generatePassword = () => {
  return Math.random().toString(36).slice(-8) + '@' + Math.floor(100 + Math.random() * 900);
};

const sendNewPasswordEmail = async (toEmail, newPassword) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your New Password',
    html: `
      <p>You requested a password reset.</p>
      <p>Your new auto-generated password is:</p>
      <h3>${newPassword}</h3>
      <p>Please log in using this password. You can change it.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(req) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'No user with this email' }, { status: 404 });
    }

    // Generate new password
    const newPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // Send new password via email
    await sendNewPasswordEmail(email, newPassword);

    return NextResponse.json({ message: 'New password sent to your email' });
  } catch (error) {
    console.error('Auto password reset error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}