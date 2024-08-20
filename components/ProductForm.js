import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  stockQuantity: existingStock,
  description: existingDescription,
  price: existingPrice,
  discountedPrice: existingDiscountedPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
  sku: existingSku,
  shortDescriptionPoints: existingShortDescriptionPoints, // New prop for short description points
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [stockQuantity, setStockQuantity] = useState(existingStock || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [shortDescriptionPoints, setShortDescriptionPoints] = useState(
    existingShortDescriptionPoints || []
  ); // State for short description points
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [discountedPrice, setDiscountedPrice] = useState(
    existingDiscountedPrice || ""
  );
  const [images, setImages] = useState(existingImages || []);
  const [sku, setSku] = useState(existingSku || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      stockQuantity,
      description,
      shortDescriptionPoints, // Include short description points in the data
      price,
      discountedPrice,
      images,
      category,
      properties: productProperties,
      sku,
    };
    console.log(data);
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  function addPoint() {
    setShortDescriptionPoints((prev) => [...prev, ""]);
  }

  function updatePoint(index, value) {
    setShortDescriptionPoints((prev) => {
      const newPoints = [...prev];
      newPoints[index] = value;
      return newPoints;
    });
  }

  const [selectedProperty, setSelectedProperty] = useState('');

const handlePropertyChange = (propertyName) => {
  setSelectedProperty(propertyName);
};

  function removePoint(index) {
    setShortDescriptionPoints((prev) => prev.filter((_, i) => i !== index));
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label>SKU</label>
      <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(ev) => setSku(ev.target.value)}
      />

      <label>Stock Quantity</label>
      <input
        type="number"
        placeholder="stock quantity"
        value={stockQuantity}
        onChange={(ev) => setStockQuantity(ev.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {propertiesToFill.length > 0 && (
  <div className="">
    <label>Select Property</label>
    <div>
      <select
        value={selectedProperty}
        onChange={(ev) => handlePropertyChange(ev.target.value)}
      >
        {propertiesToFill.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name[0].toUpperCase() + p.name.substring(1)}
          </option>
        ))}
      </select>
    </div>
  </div>
)}


      <label>Photos</label>
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
                <img src={link} alt="" className="rounded-lg" />
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
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label>Short Description Points</label>
      {shortDescriptionPoints.map((point, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Point"
            value={point}
            onChange={(ev) => updatePoint(index, ev.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="button"
            onClick={() => removePoint(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
      <button type="button" onClick={addPoint} className="btn-secondary mb-4 btn-primary ">
        Add Point
      </button>

      </div>
      

      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <label>Discounted Price (in USD)</label>
      <input
        type="number"
        placeholder="discounted price"
        value={discountedPrice}
        onChange={(ev) => setDiscountedPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
