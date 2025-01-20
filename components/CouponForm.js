// components/CouponForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const CouponForm = ({ couponId }) => {
  const [coupon, setCoupon] = useState({
    title: '',
    desc: '',
    code: '',
    discountPercent: '',
    discountAmount: '',
  });

  useEffect(() => {
    if (couponId) {
      // Fetch coupon details if couponId is provided (for updating)
      axios.get(`/api/coupons?id=${couponId}`)
        .then(response => {
          setCoupon(response.data);
        })
        .catch(error => {
          console.error('Error fetching coupon:', error);
        });
    }
  }, [couponId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (couponId) {
        // Update existing coupon
        await axios.put(`/api/coupons?id=${couponId}`, coupon);
      } else {
        // Create new coupon
        await axios.post('/api/coupons', coupon);
      }
      alert('Coupon saved successfully!');
    } catch (error) {
      console.error('Error saving coupon:', error);
      alert('Failed to save coupon');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{couponId ? 'Update Coupon' : 'Create Coupon'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Coupon Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={coupon.title}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Coupon Description</label>
          <textarea
            id="desc"
            name="desc"
            value={coupon.desc}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={coupon.code}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="discountPercent" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
            <input
              type="number"
              id="discountPercent"
              name="discountPercent"
              value={coupon.discountPercent}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount</label>
            <input
              type="number"
              id="discountAmount"
              name="discountAmount"
              value={coupon.discountAmount}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {couponId ? 'Update Coupon' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
