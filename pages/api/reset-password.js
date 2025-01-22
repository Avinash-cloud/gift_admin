import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models/admin';
import adminotps from '@/models/adminotps';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {  otp, newPassword } = req.body;
  if(!otp || !newPassword){
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const otpRecord = await adminotps.findOne({otp });

  if (!otpRecord) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await Admin.updateOne({password: hashedPassword });

  await adminotps.deleteOne({otp });

  res.status(200).json({ message: 'Password reset successful' });
}
