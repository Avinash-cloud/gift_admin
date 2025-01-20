import Layout from '@/components/Layout'
import React from 'react'
import { useEffect, useState } from 'react';

const Cuppon = () => {
    const [coupons, setCoupons] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        code: '',
        discountPercent: '',
        discountAmount: '',
    });
    const [editingCoupon, setEditingCoupon] = useState(null);

    useEffect(() => {
        // Fetch coupons when component loads
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        const res = await fetch('/api/coupons');
        const data = await res.json();
        setCoupons(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingCoupon) {
            await updateCoupon();
        } else {
            await createCoupon();
        }
        setFormData({
            title: '',
            desc: '',
            code: '',
            discountPercent: '',
            discountAmount: '',
        });
        setEditingCoupon(null);
        fetchCoupons();
    };

    const createCoupon = async () => {
        await fetch('/api/coupons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    };

    const updateCoupon = async () => {
        await fetch(`/api/coupons?id=${editingCoupon}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon._id);
        setFormData({
            title: coupon.title,
            desc: coupon.desc,
            code: coupon.code,
            discountPercent: coupon.discountPercent || '',
            discountAmount: coupon.discountAmount || '',
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            await fetch(`/api/coupons?id=${id}`, { method: 'DELETE' });
            fetchCoupons();
        }
    };
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Admin Coupon Management</h1>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Coupon Title</label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="desc" className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            id="desc"
                            value={formData.desc}
                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-sm font-semibold text-gray-700">Coupon Code</label>
                        <input
                            id="code"
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="discountPercent" className="block text-sm font-semibold text-gray-700">Discount Percentage</label>
                            <input
                                id="discountPercent"
                                type="number"
                                value={formData.discountPercent}
                                onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="discountAmount" className="block text-sm font-semibold text-gray-700">Discount Amount</label>
                            <input
                                id="discountAmount"
                                type="number"
                                value={formData.discountAmount}
                                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    <button type="submit" className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                </form>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Coupons List</h2>
                    <table className="min-w-full table-auto bg-white border border-gray-200 rounded shadow">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Code</th>
                                <th className="px-4 py-2 text-left">Discount</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon._id} className="border-t">
                                    <td className="px-4 py-2">{coupon.title}</td>
                                    <td className="px-4 py-2">{coupon.code}</td>
                                    <td className="px-4 py-2">
                                        {coupon.discountPercent ? `${coupon.discountPercent}%` : `₹${coupon.discountAmount}`}
                                    </td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(coupon)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Cuppon