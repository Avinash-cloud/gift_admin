import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';

const VideoProductAdmin = () => {
    const [videoProducts, setVideoProducts] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchVideoProducts();
    }, []);

    // Fetch video products from the API
    const fetchVideoProducts = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/videoProduct');
            setVideoProducts(res.data.data);
        } catch (error) {
            console.error('Error fetching video products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Add or update a video product
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateVideoProduct(editId);
        } else {
            await addVideoProduct();
        }
        setVideoUrl('');
        setProductUrl('');
        setEditId(null);
    };

    // Add a new video product
    const addVideoProduct = async () => {
        try {
            await axios.post('/api/videoProduct', { videoUrl, productUrl });
            fetchVideoProducts();
        } catch (error) {
            console.error('Error adding video product:', error);
        }
    };

    // Update an existing video product
    const updateVideoProduct = async (id) => {
        try {
            await axios.put(`/api/videoProduct?id=${id}`, { videoUrl, productUrl });
            fetchVideoProducts();
        } catch (error) {
            console.error('Error updating video product:', error);
        }
    };

    // Delete a video product
    const deleteVideoProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this video product?')) {
            try {
                await axios.delete(`/api/videoProduct?id=${id}`);
                fetchVideoProducts();
            } catch (error) {
                console.error('Error deleting video product:', error);
            }
        }
    };

    // Edit a video product
    const handleEdit = (id, videoUrl, productUrl) => {
        setEditId(id);
        setVideoUrl(videoUrl);
        setProductUrl(productUrl);
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Manage Video Products</h1>

                {/* Add/Edit Form */}
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="space-y-4">
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Enter video URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="url"
                            value={productUrl}
                            onChange={(e) => setProductUrl(e.target.value)}
                            placeholder="Enter product URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {editId ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </form>

                {/* Video Products Table */}
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Video URL</th>
                                <th className="px-4 py-2 text-left">Product URL</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoProducts.map((product, index) => (
                                <tr key={product._id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={product.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            {product.videoUrl}
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={product.productUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            {product.productUrl}
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(product._id, product.videoUrl, product.productUrl)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteVideoProduct(product._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
};

export default VideoProductAdmin;
