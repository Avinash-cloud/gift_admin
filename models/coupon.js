// models/Coupon.js
import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercent: {
    type: Number,
    required: false, // This field may or may not be present
  },
  discountAmount: {
    type: Number,
    required: false, // This field may or may not be present
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
