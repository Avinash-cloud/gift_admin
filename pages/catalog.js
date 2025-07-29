'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/Layout";

const AdminCatalog = () => {
    const [url, setUrl] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [catalogs, setCatalogs] = useState([]);
const URL = process.env.NEXT_PUBLIC_UPLOAD_API;
    // 📤 Upload PDF
    async function uploadPDF(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }

            const res = await axios.post(`${URL}:5000/api/upload`, data);
            setPdfUrl(res.data.fileUrl);
            setIsUploading(false);
        }
    }

    // 💾 Save Catalog
    async function saveCatalog() {
        if (!url || !pdfUrl) return alert('Both fields required');
        const res = await axios.post('/api/catalog', { url, pdfUrl });
        setUrl('');
        setPdfUrl('');
        fetchCatalogs();
    }

    // 📥 Load Existing Catalogs
    async function fetchCatalogs() {
        const res = await axios.get('/api/catalog');
        setCatalogs(res.data);
    }

    // ❌ Delete
    async function deleteCatalog(id) {
        await axios.delete(`/api/catalog?id=${id}`);
        fetchCatalogs();
    }

    useEffect(() => {
        fetchCatalogs();
    }, []);

    return (
        <Layout>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Catalog Admin Panel</h1>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">URL Slug</label>
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="e.g. summer-2025"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Upload PDF</label>
                    <input type="file" onChange={uploadPDF} accept="application/pdf" />
                    {isUploading && <p className="text-blue-600 mt-1">Uploading...</p>}
                    {pdfUrl && (
                        <p className="text-green-600 mt-1">Uploaded: <a href={pdfUrl} target="_blank" className="underline">{pdfUrl}</a></p>
                    )}
                </div>

                <button
                    onClick={saveCatalog}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Catalog
                </button>

                <hr className="my-6" />

                <h2 className="text-xl font-semibold mb-2">Existing Catalogs</h2>
                <ul className="space-y-2">
                    {catalogs.map((cat) => (
                        <li
                            key={cat._id}
                            className="border p-3 rounded flex justify-between items-center"
                        >
                            <div>
                                <p><strong>URL:</strong> {cat.url}</p>
                                <a href={cat.pdfUrl} className="text-blue-600 underline" target="_blank">
                                    View PDF
                                </a>
                            </div>
                            <button
                                onClick={() => deleteCatalog(cat._id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default AdminCatalog;
