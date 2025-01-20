// pages/api/coupons/index.js
import { mongooseConnect } from '@/lib/mongoose';
import Coupon from '@/models/coupon';

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'GET') {
    // Fetch all coupons
    try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch coupons' });
    }
  } else if (req.method === 'POST') {
    // Create a new coupon
    try {
      const newCoupon = new Coupon(req.body);
      await newCoupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create coupon' });
    }
  } else if (req.method === 'PUT') {
    // Update an existing coupon
    const { id } = req.query;
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update coupon' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a coupon
    const { id } = req.query;
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete coupon' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
