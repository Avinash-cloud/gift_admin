// 'use client'
// import Layout from '@/components/Layout'
// import React from 'react';
// import { ReactSortable } from "react-sortablejs";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import Spinner from "@/components/Spinner";
// import Image from 'next/image';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Banner({ _id, images: existingImages }) {
//     const [images, setImages] = useState(existingImages || []);
//     const [goToProducts, setGoToProducts] = useState(false);
//     const [isUploading, setIsUploading] = useState(false);
//     const [products, setProducts] = useState([]);
//     const router = useRouter();

//     async function saveProduct(ev) {
//         ev.preventDefault();
//         const data = {
//             images
//         };
//         try {
//             if (_id) {
//                 // Update existing banner
//                 await axios.put('/api/banner', { ...data, _id });
//                 toast.success('Banner updated successfully!');
//             } else {
//                 // Create new banner
//                 await axios.post('/api/banner', data);
//                 toast.success('Banner created successfully!');
//             }
//             setGoToProducts(true);
//         } catch (error) {
//             toast.error('Error saving banner!');
//         }
//     }

//     useEffect(() => {
//         if (goToProducts) {
//             router.push('/');
//         }
//     }, [goToProducts, router]);

//     async function uploadImages(ev) {
//         const files = ev.target?.files;
//         if (files?.length > 0) {
//             setIsUploading(true);
//             const data = new FormData();
//             for (const file of files) {
//                 data.append('file', file);
//             }
//             try {
//                 const res = await axios.post('/api/upload', data);
//                 setImages((oldImages) => [...oldImages, ...res.data.links]);
//                 toast.success('Images uploaded successfully!');
//             } catch (error) {
//                 toast.error('Error uploading images!');
//             } finally {
//                 setIsUploading(false);
//             }
//         }
//     }

//     function updateImagesOrder(images) {
//         setImages(images);
//     }

//     useEffect(() => {
//         axios.get('/api/banner').then(response => {
//             setProducts(response.data);
//         });
//     }, []);

//     const deleteImage = (image) => {
//         setImages(images.filter(img => img !== image));
//         toast.info('Image deleted successfully!');
//     };

//     return (
//         <Layout>
//             <ToastContainer />
//             <form onSubmit={saveProduct} className="space-y-4">
//                 <div>
//                     <label className="block text-xl font-semibold">Banner Photos</label>
//                     <div className="mb-2 flex flex-wrap gap-2">
//                         <ReactSortable
//                             list={images}
//                             className="flex flex-wrap gap-2"
//                             setList={updateImagesOrder}
//                         >
//                             {images.length > 0 ? (
//                                 images.map((link, index) => (
//                                     <div key={index} className="relative h-32 w-32 bg-white p-2 shadow-md rounded-sm border border-gray-200">
//                                         <Image src={link} alt="Banner Image" layout="fill" objectFit="cover" className="rounded-lg" />
//                                         <button
//                                             type="button"
//                                             onClick={() => deleteImage(link)}
//                                             className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
//                                         >
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-gray-500">No images uploaded yet</div>
//                             )}
//                         </ReactSortable>
//                         {isUploading && (
//                             <div className="h-24 flex items-center justify-center w-32">
//                                 <Spinner />
//                             </div>
//                         )}
//                     </div>
//                     <label className="w-32 h-32 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//                         </svg>
//                         <div>Add Images</div>
//                         <input type="file" onChange={uploadImages} className="hidden" multiple />
//                     </label>
//                 </div>
//                 <button
//                     type="submit"
//                     className="btn-primary w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//                 >
//                     {isUploading ? 'Saving...' : _id ? 'Update Banner' : 'Create Banner'}
//                 </button>
//             </form>

//             <div className='mt-8'>
//                 <h2 className="text-2xl font-semibold mb-4">Existing Banners</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {products.map((product) => (
//                         <div key={product.id} className="relative">
//                             <Image className="h-auto max-w-full rounded-lg" src={product.images[0]} height={200} width={200} alt="" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Banner;



import { Cross, Edit, Trash2Icon } from "lucide-react";
import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import Spinner from "../components/Spinner";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

export default function banner({ initialProducts, serverIP }) {
    const URL = process.env.NEXT_PUBLIC_UPLOAD_API;
    const [loading, setLoading] = useState(false);
    const [banner, setBanner] = useState(initialProducts)
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    console.log("banner",);


    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const [selectedId, setSelectedId] = useState(null);
    const toggleModal = (id) => {
        setSelectedId(id); // Store the selected item's _id
        setIsModalOpen(!isModalOpen);
    };


    // useEffect(() => {
    //     const fetchmodules = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get('/api/banner');
    //             console.log(response);

    //             setBanner(response.data.data)
    //             // Assuming the API sends total items
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchmodules();
    // }, []);


    // console.log(banner)



    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            //console.log("url are", URL);
            const res = await axios.post(`${URL}:5000/api/upload`, data);
            setImages((oldImages) => {
                return [...oldImages, res.data.fileUrl];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }

    async function saveimage() {
        const data = {
            imageURL: images[0]
        }
        //console.log("url are", URL);
        const res = await axios.post('/api/banner', data);
        setImages([]);
        setIsOpen(false);
        window.location.reload()
    }



    const generateCoolId = (id) => {
        // Select a part of the original ID, for example, the first 4 and last 4 characters
        const prefix = "IGB-"; // You can add a prefix if needed
        const shortId = `${id.slice(0, 4)}-${id.slice(-4)}`; // Taking first 4 and last 4 characters
        return `${prefix}${shortId}`;
    };



    const ImageModal = ({ open, onClose, imageUrl }) => {
        if (!open) return null; // If modal is not open, return nothing

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-xl w-full">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                    <img
                        src={imageUrl}
                        alt="Full Size"
                        className="max-h-screen w-full object-contain rounded-lg"
                    />
                </div>
            </div>
        );
    };


    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const closeModal2 = () => {
        setModalOpen(false);
        setSelectedImage('');
    };




    const handleDelete = async () => {
        try {
            // Make a delete request to your API with the selectedId
            await axios.delete(`/api/banner?id=${selectedId}`);
            console.log(`Banner with id ${selectedId} deleted successfully.`);
            setIsModalOpen(false);
            window.location.reload()
            // Optionally refresh the data or redirect user
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };


    return (
        <Layout>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex gap-2 justify-between">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Banner</h2>
                    <button onClick={closeModal}><IoMdClose /></button>

                </div>

                <div>Upload Banner Image <span className="font-semibold">(1000 X 695)</span></div>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable
                        list={images}
                        className="flex flex-wrap gap-1"
                        setList={updateImagesOrder}
                    >
                        {!!images?.length &&
                            images.map((link) => (
                                <div
                                    key={link}
                                    className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                                >
                                    <img src={link} alt="" className="rounded-lg" height={100} width={100} />

                                </div>
                            ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                        </svg>
                        <div>Add image</div>
                        <input type="file" accept="image/*" onChange={uploadImages} className="hidden" />
                    </label>

                </div>
                <div>
                    <button onClick={saveimage} className="bg-green-700 text-white p-1 font-serif rounded-md mt-6">Save</button>
                </div>
            </Modal>
            <h1 className="font-serif">Banner Page</h1>
            <div className="flex justify-end ">
                <button className="font-serif bg-black p-2 text-white rounded-md mt-4 float-right " onClick={openModal}>Add New Banner</button>
            </div>
            <div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="border border-gray-200 md:rounded-lg overflow-auto">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                #ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Banner
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="3" className="text-center py-6">
                                                    <span className="text-gray-500">Loading...</span>
                                                </td>
                                            </tr>
                                        ) : (
                                            banner?.map((module, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition ease-in-out duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {generateCoolId(module._id)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">

                                                            <img
                                                                src={module.images}
                                                                alt="Banner"
                                                                className="h-auto w-16 max-h-16 object-cover rounded-lg shadow-sm"
                                                                onClick={() => handleImageClick(module.images)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex space-x-4">
                                                            <button
                                                                className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-blue-300 rounded-md"
                                                                title="Edit"
                                                            >
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-red-300 rounded-md"
                                                                title="Delete"
                                                                onClick={() => toggleModal(module._id)}
                                                            >
                                                                <Trash2Icon className="w-5 h-5" />
                                                            </button>

                                                            {isModalOpen && (
                                                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                                                    <div className="bg-white rounded-lg shadow-xl p-6">
                                                                        <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
                                                                        <p className="text-sm text-gray-600">Are you sure you want to delete this?</p>
                                                                        <div className="mt-4 flex space-x-4">
                                                                            <button
                                                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
                                                                                onClick={handleDelete}
                                                                            >
                                                                                Yes, Delete
                                                                            </button>
                                                                            <button
                                                                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                                                                                onClick={toggleModal}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                <ImageModal open={modalOpen} onClose={closeModal2} imageUrl={selectedImage} />
            </div>
        </Layout>
    )
}



// Server-side function to fetch products


const SECRET_KEY = process.env.NEXTAUTH_SECRET;
export async function getServerSideProps(context) {
    const { req } = context;

    // Retrieve cookies from the incoming request
    const cookies = req.headers.cookie;

    const url = process.env.PUBLIC_URL;
    const response = await fetch(`${url}/api/banner`, {
        headers: {
            "Content-Type": "application/json",
            // Pass the cookies along with the request for authentication
            Cookie: cookies,
        },
    }); // Replace with your API endpoint
    // console.log(response);

    const result = await response.json();

   
// console.log("result",result);


    let initialProducts = [];


    // console.log("hellow",serverIP)


    // if (result.success) {
        // Decrypt the encrypted data
        // const decryptedData = (result);
        // const stores = JSON.parse(decryptedData);

        initialProducts = result; // Extract the actual data from the decrypted object
    // }

    // console.log("initialProducts: ", initialProducts);
    return {
        props: {
            initialProducts,

        },
    };
}


