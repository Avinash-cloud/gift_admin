// models/VideoProduct.js
import mongoose from 'mongoose';

const VideoProductSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.VideoProduct || mongoose.model('VideoProduct', VideoProductSchema);
