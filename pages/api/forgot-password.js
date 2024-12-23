import dbConnect from '../../utils/dbConnect';
import Customer from '../../utils/models/customer'
import Otp from '../../models/Otp';
import { sendOtpEmail } from '../../utils/nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  const user = await Customer.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const User=user.firstName

  const otp = crypto.randomInt(100000, 999999).toString();

  await Otp.create({ email, otp });

  await sendOtpEmail(email, otp,User);

  res.status(200).json({ message: 'OTP sent to email' });
}
