import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
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
  subcategory: assignedSubcategory,
  property: assignedProperty,
  sku: existingSku,
  shortDescriptionPoints: existingShortDescriptionPoints,
  type: existingtype,
  id: existingid,
  custom: existingcustom,
  tags: existingtags,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [stockQuantity, setStockQuantity] = useState(existingStock || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [shortDescriptionPoints, setShortDescriptionPoints] = useState(
    existingShortDescriptionPoints || []
  ); // State for short description points
  const [type, setType] = useState(existingtype || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [subcategory, setSubcategory] = useState(assignedSubcategory || "");
  const [productProperty, setProductProperty] = useState(
    assignedProperty || {}
  );

  const [price, setPrice] = useState(existingPrice || "");
  const [discountedPrice, setDiscountedPrice] = useState(
    existingDiscountedPrice || ""
  );
  const [images, setImages] = useState(existingImages || []);
  const [sku, setSku] = useState(existingSku || "");
  const [id, setId] = useState(existingid || "");
  const [custom, setCustom] = useState(existingcustom || false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState(existingtags || []);
  const router = useRouter();

  console.log("productProperties", productProperties);

  console.log("productProperties", productProperties);

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/subcategories").then((result) => {
      setSubCategories(result.data);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      stockQuantity,
      description,
      shortDescriptionPoints,
      type, // Include short description points in the data
      price,
      discountedPrice,
      images,
      category,
      properties: productProperties,
      subcategory,
      property: productProperty,
      sku,
      id,
      custom,
      tags
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
  const removeImage = (link) => {
    const updatedImages = images.filter((img) => img !== link);
    updateImagesOrder(updatedImages); // Update the images array
  };

  function setProductProp(propName, value) {
    setProductProperty((prev) => {
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

  const propertyToFill = [];
  if (subcategories.length > 0 && subcategory) {
    let subcatInfo = subcategories.find(({ _id }) => _id === subcategory);
    propertyToFill.push(...subcatInfo.property);
    while (subcatInfo?.parent?._id) {
      const subparentCat = subcategories.find(
        ({ _id }) => _id === subcatInfo?.parent?._id
      );
      propertyToFill.push(...subparentCat.property);
      subcatInfo = subparentCat;
    }
  }



  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
  
      const tagsToAdd = newTag
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
  
      if (tagsToAdd.length > 0) {
        setTags((prevTags) => [...prevTags, ...tagsToAdd]);
        setNewTag(""); // Clear the input
      }
    }
  };


  
const removeField = (index) => {
  const updatedTags = [...tags];
  updatedTags.splice(index, 1);
  setTags(updatedTags);
};
  

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
        placeholder="id"
        value={id}
        onChange={(ev) => setId(ev.target.value)}
      />

      <label>Group SKU</label>
      <input
        type="text"
        placeholder="SKU"
        value={sku}
        onChange={(ev) => setSku(ev.target.value)}
      />
      <label>Customization available</label>
      <input
        type="checkbox"
        checked={custom} // `true` or `false` value
        onChange={(ev) => setCustom(ev.target.checked)} // `.checked` gives boolean value
      />

      <label>Stock Quantity</label>
      <input
        type="number"
        placeholder="stock quantity"
        value={stockQuantity}
        onChange={(ev) => setStockQuantity(ev.target.value)}
      />
      <label>Type</label>
      <select value={type} onChange={(ev) => setType(ev.target.value)}>
        <option value="NewArrival">New Arrival</option>
        <option value="BestSeller">Best Seller</option>
        <option value="MonthlyBestSell">Monthly Best Sell</option>
      </select>

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

      <select
        value={productProperties}
        onChange={(ev) => setProductProperties(ev.target.value)}
      >
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
      </select>

      {/* {propertiesToFill.length > 0 &&
        propertiesToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))} */}

      <label>Subcategory</label>
      <select
        value={subcategory}
        onChange={(ev) => setSubcategory(ev.target.value)}
      >
        <option value="">Uncategorized</option>
        {subcategories.length > 0 &&
          subcategories.map((sc) => (
            <option key={sc._id} value={sc._id}>
              {sc.name}
            </option>
          ))}
      </select>

      {propertyToFill.length > 0 &&
        propertyToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={productProperty[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

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
                className="relative h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 cursor-pointer"
                onClick={() => removeImage(link)}  // Remove image on click
              >
                <img src={link} alt="" className="rounded-lg" />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent triggering remove on div click
                    removeImage(link);
                  }}
                >
                  X
                </button>
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
      <label>Description</label>
      {/* <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      /> */}

      <div>
        <label>Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Enter description..."
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              [{ align: [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['link', 'image', 'blockquote', 'code-block'],
              ['clean'] // remove formatting button
            ]
          }}
          formats={[
            'header', 'font', 'list', 'bullet',
            'bold', 'italic', 'underline', 'strike',
            'align', 'color', 'background', 'link', 'image', 'blockquote', 'code-block'
          ]}
        />
      </div>

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
        <button
          type="button"
          onClick={addPoint}
          className="btn-secondary mb-4 btn-primary "
        >
          Add Point
        </button>
      </div>


      <div className="mb-4 w-1/2 max-md:w-full">
              <label className="block text-sm font-medium">Tags</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  placeholder="Add tags separated by commas"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => handleTagInput(e)}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className=" items-center align-middle m-2  mb-2 border rounded bg-green-200/50 italic"
                >
                  <span className="p-2 ">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeField("tags", index)}
                    className="ml-2 text-red-500"
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECElEQVR4nO2Y21IaWRiFeYB4B2JLBLRBGwwedqONCgooB+UghxiNOjd5APVu5jmnOCggSIhBoHezUXByYdWe6gsMM1H7QKMzVayq727/618L7YbaKtVQQw011P9G7aM4gb9ERwblj79ER/gdAzH/cZw8uf8t+fDX8Ue2c5xklPbvHCcZ3pvf8eNo71RZ86P42f1hAnfpfI63Okdxh2L+hzH6/jDB9e64/5z4Qxnzg92zzkEM/8J+rNX51H+JzmGM7uzHuKd2tPdj/ZW424uetj9F8fNEUOcgKvvfqXMQZXiPl3bc7UVPZJm34wHiNhl6uPsYxi+SDKNWckdyCX7mLhlGQv58hvbezpjkAo1odOQ2sc3eJnawIPEdSSX4s/zMrRjvxDZb29t4p5KjZjwAWrtB2IoFsSC7QdSKBwWfCRTz061YgFPS80U1wwHQjPggivixIGE/akW2nl2IQn4aRXycEl6SS3ChLdgM+bAIEBv8dTEfngttcf149KVmwAvgthdy25tYGO8/AqCQh4bBTU7OrKKqB7yADbghDHiwEGzAjdjghqPh99Cs38NJmVENUqzPzTR864j1bWAh+HNSzrI+t+I/UZ5U3esCda8LNjZdWAnqXidi3c7XCd9bouZeg3XPGu6HmnsNVV87/GMJlwPU1ldgbX0Fy+HGtYKqTuZtwnd17XKAG+cyvHEyWArVNebtw3d17aBBddUOq6tLWAzfV5dQ1Un/N8Lz+s4A+pqxc9cOOxYJqiyDwb4upYT/tgS4b8sAS2Px7UuUAaAr9gWuYl/A8phHFfBGJcrARn9dnOO+Ls7hvliwoQqwvW6Jss1Gl+dnufL8B6wIc7OoZHulEsU5C3P1wYqubFYsCH9OwtninGWwb6ayjaKL1hmuNEthQawUKloszBVFgeLsDBQ7U6KowfwlChRFX1JmrmiZxiJARYv58dO8okhwSZmh2NkSZVK2RIEi6cK0ibucMWERoKL5Z/iu8hQJCtMkFOtRUqpEgSTpvJnkCmYSC5E3k+jiifCPJUgS5E0kFOuVM/VZgg+fm5rk8lOTWIjclBFdGI2CD2Ge1IP81CQU65kzGOSVyM7MjOSMBjZnNGAhLgx6UeG74s/yMzkR3jmDoZGyaqRfq2T0euJcP/FwoZ/AL3E+8R5d6HSSX3/8zDk/K+Svn3hIGQzSL7Z4ZXW6k/P3OvwcWd24rPC9JbK6cfTyDl1/N9UZgjjLjhP432QIAqV12r6/eDIEAbLEGHxmhzI31Bli9CwzpsVd0mNalNb2H763REY7Cnt3ZLTa31VKKq1Wn6Y0moeUWt1QMnxXvGdKrWb5HWm1Wt6NtJD+HB3VpjQy3ggildJo3qU0GnkP7FBDDTWU6i30N4TdCC3jWDERAAAAAElFTkSuQmCC"
                      width={15}
                    />
                  </button>
                </span>
              ))}
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
