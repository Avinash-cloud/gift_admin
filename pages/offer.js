import Layout from '@/components/Layout'
import React from 'react'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Image from 'next/image';



function Offer() {


    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });
    }, []);



    const [productsid1, setProductsid1] = useState('');
    const [productsid2, setProductsid2] = useState('');

    useEffect(() => {
        axios.get('/api/feature').then(response => {
            setProductsid1(response.data[0].productId);
            setProductsid2(response.data[1].productId);
        });
    }, []);

    const [products1, setproducts1] = useState([]);
    useEffect(() => {
        if (productsid1 && productsid2) {
          axios
            .get(`/api/products?ids=${productsid1},${productsid2}`)
            .then((response) => {
                setproducts1(response.data);
            })
            .catch((error) => {
              console.error('Error fetching products:', error);
            });
        }
      }, [productsid1, productsid2]);


    console.log(productsid1,productsid2)

    const [products2, setProducts2] = useState([]);
    useEffect(() => {
        axios.get('/api/limited').then(response => {
            setProducts2(response.data);
        });
    }, []);


    
        const [selectedProduct, setSelectedProduct] = useState('');
      
        const handleSelectChange = (e) => {
          setSelectedProduct(e.target.value);
        };
      
        const [selectedProduct1, setSelectedProduct1] = useState('');
      
        const handleSelectChange1 = (e) => {
          setSelectedProduct1(e.target.value);
        };


        const handleSubmit1 = async () => {
            if (selectedProduct) {
              try {
                const response = await fetch('/api/feature', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ productId: selectedProduct,_id:"665f07ed68d756a48f0ae612" }),
                });
        
                if (!response.ok) {
                  throw new Error('Failed to update offer');
                }
        
                alert('Product offer updated successfully!');
              } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the offer.');
              }
            } else {
              alert('Please select a product to offer.');
            }
          };

          const handleSubmit2 = async () => {
            if (selectedProduct) {
              try {
                const response = await fetch('/api/feature', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ productId: selectedProduct1,_id:"665f07db68d756a48f0ae611" }),
                });
        
                if (!response.ok) {
                  throw new Error('Failed to update offer');
                }
        
                alert('Product offer updated successfully!');
              } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while updating the offer.');
              }
            } else {
              alert('Please select a product to offer.');
            }
          };
        
    
    

    return (
        <Layout>



            <br /> <br />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">Offer section</h1>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4">
                        <div className="container mx-auto py-8">
                            <h1 className="text-3xl font-bold mb-4">Feature items</h1>
                            <div className='flex gap-5 justify-evenly p-12' >
                                <div>
                                    Offer one product
                                    <select onChange={handleSelectChange}>
                                        <option value="">No offer</option>
                                        {products.map((item, index) => (
                                            <option key={index} value={item._id}>{item.title}</option>
                                        ))}
                                    </select>

                                    <button onClick={handleSubmit1} className=" text-white bg-blue-400 px-4 py-1 rounded-md border border-gray-200 shadow-sm" >Save</button>
                                </div>
                                <div>
                                    Offer two product
                                    <select onChange={handleSelectChange1}>
                                        <option value="">No offer</option>
                                        {products.map((item, index) => (
                                            <option key={index} value={item._id}>{item.title}</option>
                                        ))}
                                    </select>

                                    <button onClick={handleSubmit2} className=" text-white bg-blue-400 px-4 py-1 rounded-md border border-gray-200 shadow-sm" >Save</button>
                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-4">

                                {products1?.map(product => (

                                    <div key={product.id} className="border p-4 rounded-lg">

                                        <Image src={product.images[0]} alt={product.name} height={100} width={100} className='rounded-lg' />
                                        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                                        <p className="text-gray-700 mb-2">Rs {product.discountedPrice
                                        }</p>
                                        <p className="text-gray-600">{product.description}</p>
                                        <br />
                                        {/* <Link className="btn-default hover:text-blue-500" href={'/feature/edit/' + product._id}>
                                            Edit
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <Link className="btn-red hover:text-red-500" href={'/feature/delete/' + product._id}>
                                            Delete
                                        </Link> */}
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    <div className="bg-white p-4">
                        <div className="container mx-auto py-8 align-center  ">
                            <h1 className="text-3xl font-bold mb-4 ">Limited Time Offer</h1>
                            <div className="grid grid-cols-2 gap-4 justify-center items-center">
                                {products2.map(product => (
                                    <div key={product.id} className="border p-4 rounded-lg">
                                        <Image src={product.image} alt={product.name} height={100} width={200} className='rounded-lg' />
                                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                        <p className="text-gray-700 mb-2"> Rs {product.price}</p>
                                        <p className="text-gray-600">{product.description}</p>
                                        <br />
                                        <Link className="btn-default hover:text-blue-500" href={'/limited/edit/' + product._id}>
                                            Edit
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <Link className="btn-red hover:text-red-500" href={'/limited/delete/' + product._id}>
                                            Delete
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>


                </div>
            </div>

        </Layout>
    )
}

export default Offer
