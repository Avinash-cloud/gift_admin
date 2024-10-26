import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const headers = [
    { label: "SKU ID", key: "sku" },
    { label: "Image", key: "images[0]" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Stock", key: "stockQuantity" },
    { label: "Price", key: "price" },
    { label: "Discounted Price", key: "discountedPrice" },
  ];

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const response = await axios.post("/api/csvupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to upload file");
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  // Handle checkbox toggle
  const handleCheckboxChange = (productId) => {
    setSelectedProducts(
      (prevSelected) =>
        prevSelected.includes(productId)
          ? prevSelected.filter((id) => id !== productId) // Deselect if already selected
          : [...prevSelected, productId] // Select if not already selected
    );
  };

  // Handle delete button click
  const deleteSelectedProducts = async () => {
    try {
      if (selectedProducts.length === 0) {
        alert("Please select products to delete.");
        return;
      }

      // Confirm deletion with the user
      if (
        confirm(
          `Are you sure you want to delete ${selectedProducts.length} products?`
        )
      ) {
        // Send DELETE request to the backend with the selected product IDs
        await axios.delete(`/api/products?ids=${selectedProducts.join(",")}`);

        // Perform necessary actions after deletion (e.g., refreshing the product list)
        alert("Selected products deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      const allProductIds = currentPageData.map((product) => product._id);
      setSelectedProducts(allProductIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <Layout>
      <div className="mb-14 overflow-x-auto h-10">
        <Link
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          href={"/products/new"}
        >
          Add new product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 overflow-x-auto h-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 justify-center items-center"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4 sm:mb-0"
          />
          <button
            type="submit"
            className="w-full sm:w-44 rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Upload via CSV
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="" className="font-semibold">
            Search
          </label>
          <input
            type="search"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
            className="border px-2 py-1 rounded w-full sm:w-48"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <CSVLink
            data={products}
            headers={headers}
            filename={"products.csv"}
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-full sm:w-auto"
          >
            Export to CSV
          </CSVLink>

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-full sm:w-auto"
            table="products-table"
            filename="products"
            sheet="tablexls"
            buttonText="Export to Excel"
          />

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              JSON.stringify(products, null, 2)
            )}`}
            download="products.txt"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-full sm:w-auto"
          >
            Export to Text
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label className="mr-2">Show</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border px-2 py-1 rounded h-9 w-full sm:w-auto"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={deleteSelectedProducts}
          disabled={selectedProducts.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-x-auto">
        <table id="products-table" className="border-collapse w-full mt-11">
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={handleSelectAll}
              >
                <span className="flex cursor-pointer">
                  {" "}
                  Select   <input className="cursor-pointer" type="checkbox" />
                </span>
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                <span>SKU ID</span>
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                <span>Group SKU ID</span>
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                <span>Image</span>
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-12 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                Title
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                Stock
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                Price
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                Discounted Price
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentPageData.map((product) => (
              <tr key={product._id} className="divide-x divide-gray-200">
                <td className="whitespace-nowrap px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleCheckboxChange(product._id)}
                  />
                </td>
                <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900 overflow-auto max-h-2 w-52">
                  <div className="overflow-auto max-h-24">{product.id}</div>
                </td>
                <td className="px-1 py-1 text-sm text-gray-900">
                  {product.sku}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-1 py-1 text-sm text-gray-900 overflow-auto max-h-2 w-52">
                  <a
                    target="_blank"
                    href={`https://www.internationalgift.in/product/${product._id}`}
                    rel="noopener noreferrer"
                  >
                    <div className="overflow-auto max-h-24">
                      {product.title}
                    </div>
                  </a>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-500">
                    {product.stockQuantity}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                  {product.discountedPrice}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium space-x-2">
                  <Link
                    className="text-blue-500 hover:text-blue-600"
                    href={`/products/edit/${product._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="text-red-500 hover:text-red-600"
                    href={`/products/delete/${product._id}`}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete button */}
      </div>

      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          className="flex space-x-2"
        />
      </div>
    </Layout>
  );
}
