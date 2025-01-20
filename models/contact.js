import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
