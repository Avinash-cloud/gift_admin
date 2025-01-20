import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  tagline: {
    type: String,
    required: true, // Tagline is required
  },
  discount_text: {
    type: String,
    default: "", // Default to an empty string if not provided
  },
  discount: {
    type: String,
    required: true, // Discount is required
  },
  img_src: {
    type: String,
    required: true, // Image source is required
  },
  order_link: {
    type: String,
    required: true, // Order link is required
  },
});

export default mongoose.models.BestSell || mongoose.model('BestSell', bannerSchema);
