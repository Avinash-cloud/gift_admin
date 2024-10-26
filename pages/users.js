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
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
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
    product.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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

  const generateCoolId = (id) => {
    // Select a part of the original ID, for example, the first 4 and last 4 characters
    const prefix = "IGU-"; // You can add a prefix if needed
    const shortId = `${id.slice(0, 4)}-${id.slice(-4)}`; // Taking first 4 and last 4 characters
    return `${prefix}${shortId}`;
};

  return (
    <Layout>
      

      <div className="flex flex-col md:flex-row md:justify-center md:space-x-14 m-4 overflow-x-auto">

<div className="flex items-center mb-4 md:mb-0">
  <label htmlFor="" className="mx-4 font-semibold">
    Search
  </label>
  <input
    type="search"
    placeholder="Search by title"
    value={searchTerm}
    onChange={handleSearch}
    className="border px-2 py-1 rounded w-full md:w-48"
  />
</div>

<div className="flex space-x-2 mb-4 md:mb-0">
  <CSVLink
    data={products}
    headers={headers}
    filename={"products.csv"}
    className="flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap"
  >
    Export to CSV
  </CSVLink>

  <ReactHTMLTableToExcel
    id="test-table-xls-button"
    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 whitespace-nowrap"
    table="products-table"
    filename="users"
    sheet="tablexls"
    buttonText="Export to Excel"
  />
  
  <a
    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
      JSON.stringify(products)
    )}`}
    download="products.txt"
    className="flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap"
  >
    Export to Text
  </a>
</div>

<div className="flex items-center mb-4 md:mb-0">
  <label className="mr-2">Show</label>
  <select
    id="itemsPerPage"
    value={itemsPerPage}
    onChange={handleItemsPerPageChange}
    className="border px-2 py-1 rounded h-9"
  >
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
    <option value={100}>100</option>
    <option value={250}>250</option>
  </select>
</div>
</div>


      <div className="overflow-auto ">
      <table id="products-table" className="border-black  w-full">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              <span>ID</span>
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              <span>First Name</span>
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-12 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Email
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Phone Number
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Country
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Address
            </th>
            <th
              scope="col"
              className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500"
            >
              Region
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentPageData.map((product) => (
            <tr key={product._id} className="divide-x divide-gray-200">
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">
                {generateCoolId(product._id)}
              </td>
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">
                {product.firstName}
              </td>
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">
                {product.lastName}
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">
                  <a href={`mailto:${product.email}`}>{product.email}</a>
                  </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">
                  <a href={`tel:+${product.phoneNumber}`}>{product.phoneNumber}</a>                  
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {product.country}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                <div><span className="font-semibold">Address :</span>{product.address
                }</div>
                <div><span className="font-semibold">Postal Code : </span>{product.postalCode
                }</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {product.region}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        className="flex mt-10 space-x-10 float-right overflow-auto w-4/5"
      />
    </Layout>
  );
}
