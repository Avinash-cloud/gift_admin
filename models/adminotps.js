import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 minutes
});

export default mongoose.models.adminotps || mongoose.model('adminotps', OtpSchema);
