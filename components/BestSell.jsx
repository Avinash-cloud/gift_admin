import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';

function BestSell() {
    const [AllCollections, setAllCollections] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        tagline: "",
        discount_text: "",
        discount: "",
        img_src: "",
        order_link: "",
    });
    const [editingId, setEditingId] = useState(null); // ID of the BestSell being edited
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchAllCollections();
    }, []);

    const fetchAllCollections = async () => {
        try {
            const res = await axios.get("/api/BestSell");
            setAllCollections(res.data.data);
        } catch (error) {
            console.error("Failed to fetch AllCollections:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            if (editingId) {
                // Update existing BestSell
                const res = await axios.put(
                    `/api/BestSell?id=${editingId}`,
                    formData
                );
                setSuccess("BestSell updated successfully!");
            } else {
                // Add new BestSell
                const res = await axios.post("/api/BestSell", formData);
                setSuccess("BestSell added successfully!");
            }

            fetchAllCollections();
            resetForm();
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            tagline: "",
            discount_text: "",
            discount: "",
            img_src: "",
            order_link: "",
        });
        setEditingId(null);
    };

    const handleEdit = (BestSell) => {
        setFormData(BestSell);
        setEditingId(BestSell._id);
    };
    return (
        <div>
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                        Manage BestSell
                    </h1>

                    {/* Error/Success Messages */}
                    {error && <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">{error}</div>}
                    {success && <div className="bg-green-100 text-green-700 p-4 mb-6 rounded-lg">{success}</div>}

                    {/* Form for Adding/Editing Banner */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tagline"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Text
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter discount text"
                                    value={formData.discount_text}
                                    onChange={(e) => setFormData({ ...formData, discount_text: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount (%)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter discount"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image Source (300x300)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter image source"
                                    value={formData.img_src}
                                    onChange={(e) => setFormData({ ...formData, img_src: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Order Link
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter order link"
                                    value={formData.order_link}
                                    onChange={(e) => setFormData({ ...formData, order_link: e.target.value })}
                                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                                >
                                    {editingId ? "Update Banner" : "Add Banner"}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-500 text-white px-6 py-2 rounded-md shadow hover:bg-gray-600 transition"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List of BestSell */}
                    <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6 text-center">
                        Existing BestSell
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AllCollections.map((banner) => (
                            <div
                                key={banner._id}
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {banner.title}
                                </h3>
                                <p className="text-sm text-gray-600">{banner.tagline}</p>
                                <p className="text-sm text-gray-800 font-semibold mt-2">
                                    Discount: {banner.discount}%
                                </p>
                                <img
                                    src={banner.img_src}
                                    alt={banner.title}
                                    className="w-24 h-24 object-cover rounded mt-4"
                                />
                                <a
                                    href={banner.order_link}
                                    className="text-blue-500 mt-3 hover:underline"
                                >
                                    View Order Link
                                </a>
                                <button
                                    onClick={() => handleEdit(banner)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BestSell
