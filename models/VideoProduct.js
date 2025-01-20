// models/VideoProduct.js
import mongoose from 'mongoose';

const VideoProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.models.VideoProduct || mongoose.model('VideoProduct', VideoProductSchema);
