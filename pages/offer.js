import Layout from "@/components/Layout";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import TopCollection from "@/components/TopCollection";
import BestSell from "@/components/BestSell";

function Offer() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const [productsid1, setProductsid1] = useState("");
  const [productsid2, setProductsid2] = useState("");

  useEffect(() => {
    axios.get("/api/feature").then((response) => {
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
          console.error("Error fetching products:", error);
        });
    }
  }, [productsid1, productsid2]);

  console.log(productsid1, productsid2);

  const [products2, setProducts2] = useState([]);
  useEffect(() => {
    axios.get("/api/limited").then((response) => {
      setProducts2(response.data);
    });
  }, []);

  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSelectChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const [selectedProduct1, setSelectedProduct1] = useState("");

  const handleSelectChange1 = (e) => {
    setSelectedProduct1(e.target.value);
  };

  const handleSubmit1 = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch("/api/feature", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: selectedProduct,
            _id: "665f07ed68d756a48f0ae612",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update offer");
        }

        alert("Product offer updated successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the offer.");
      }
    } else {
      alert("Please select a product to offer.");
    }
  };

  const handleSubmit2 = async () => {
    if (selectedProduct1) {
      try {
        const response = await fetch("/api/feature", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: selectedProduct1,
            _id: "665f07db68d756a48f0ae611",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update offer");
        }

        alert("Product offer updated successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the offer.");
      }
    } else {
      alert("Please select a product to offer.");
    }
  };

  const [AllCollections, setAllCollections] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    discount_text: "",
    discount: "",
    img_src: "",
    order_link: "",
  });
  const [editingId, setEditingId] = useState(null); // ID of the AllCollection being edited
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAllCollections();
  }, []);

  const fetchAllCollections = async () => {
    try {
      const res = await axios.get("/api/AllCollection");
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
        // Update existing AllCollection
        const res = await axios.put(
          `/api/AllCollection?id=${editingId}`,
          formData
        );
        setSuccess("AllCollection updated successfully!");
      } else {
        // Add new AllCollection
        const res = await axios.post("/api/AllCollection", formData);
        setSuccess("AllCollection added successfully!");
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

  const handleEdit = (AllCollection) => {
    setFormData(AllCollection);
    setEditingId(AllCollection._id);
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
              <div className="flex gap-5 justify-evenly p-12">
                <div>
                  Offer one product
                  <input
                    list="productList"
                    onChange={handleSelectChange}
                    placeholder="Select or type a product"
                  />
                  <datalist id="productList">
                    {products.map((item, index) => (
                      <option key={index} value={item.id} />
                    ))}
                  </datalist>
                  <button
                    onClick={handleSubmit1}
                    className=" text-white bg-blue-400 px-4 py-1 rounded-md border border-gray-200 shadow-sm"
                  >
                    Save
                  </button>
                </div>
                <div>
                  Offer two product
                  {/* <select onChange={handleSelectChange1}>
                    <option value="">No offer</option>
                    {products.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select> */}
                  <input
                    list="productList"
                    onChange={handleSelectChange1}
                    placeholder="Select or type a product"
                  />
                  <datalist id="productList">
                    {products.map((item, index) => (
                      <option key={index} value={item.id} />
                    ))}
                  </datalist>
                  <button
                    onClick={handleSubmit2}
                    className=" text-white bg-blue-400 px-4 py-1 rounded-md border border-gray-200 shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {products1?.map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      height={100}
                      width={100}
                      className="rounded-lg"
                    />
                    <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-700 mb-2">
                      Rs {product.discountedPrice}
                    </p>
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

          {/* <div className="bg-white p-4">
            <div className="container mx-auto py-8 align-center  ">
              <h1 className="text-3xl font-bold mb-4 ">Limited Time Offer</h1>
              <div className="grid grid-cols-2 gap-4 justify-center items-center">
                {products2.map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={100}
                      width={200}
                      className="rounded-lg"
                    />
                    <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-700 mb-2"> Rs {product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                    <br />
                    <Link
                      className="btn-default hover:text-blue-500"
                      href={"/limited/edit/" + product._id}
                    >
                      Edit
                    </Link>
                    &nbsp; &nbsp; &nbsp;
                    <Link
                      className="btn-red hover:text-red-500"
                      href={"/limited/delete/" + product._id}
                    >
                      Delete
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>


      <div className=" bg-green-500 h-2 "></div>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Manage AllCollection
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

          {/* List of AllCollection */}
          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6 text-center">
            Existing AllCollection
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


      <div>
        <div className=" bg-green-500 h-2 "></div>
        <TopCollection/>
      </div>

      <div>
        <div className=" bg-green-500 h-2 "></div>
        <BestSell/>
      </div>

      

      
    </Layout>
  );
}

export default Offer;
