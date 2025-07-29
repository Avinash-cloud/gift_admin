// models/Catalog.js
import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Catalog || mongoose.model('Catalog', catalogSchema);
