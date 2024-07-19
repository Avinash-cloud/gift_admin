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

  useEffect(() => {
    axios.get('/api/products').then(response => {
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

  const filteredProducts = products.filter(product =>
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
    { label: "Discounted Price", key: "discountedPrice" }
  ];

  return (
    <Layout>


      <div className="mb-14">
        <Link 
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        href={'/products/new'}>Add new product</Link>
      </div>


      <div className="justify-center space-x-14 flex m-4 h-10">

        <div>
          <label htmlFor="" className="mx-4 font-semibold">Search</label>
        <input
          type="search"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-2 py-1 rounded w-48"
        />
        </div>

        <div className="flex space-x-2">
          <CSVLink 
            data={products} 
            headers={headers} 
            filename={"products.csv"} 
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Export to CSV
          </CSVLink>

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            table="products-table"
            filename="products"
            sheet="tablexls"
            buttonText="Export to Excel"
          />
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              JSON.stringify(products)
            )}`}
            download="products.txt"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Export to Text
          </a>
        </div>


        <div className="mb-4 flex">
          <label  className="mr-2">Show</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border px-2 py-1 rounded h-9"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          
        </div>
      </div>

      <table id="products-table" className="border-collapse w-full">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              <span>SKU ID</span>
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              <span>Image</span>
            </th>
            <th scope="col" className="border border-gray-300 px-12 py-3.5 text-left text-sm font-medium text-gray-500">
              Title
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Description
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Stock
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Price
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Discounted Price
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentPageData.map((product) => (
            <tr key={product.id} className="divide-x divide-gray-200">
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">{product.sku}</td>
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">{product.title}</td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">{product.description}</div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">{product.stockQuantity}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{product.price}</td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{product.discountedPrice}</td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium space-x-2">
                <Link className="btn-default hover:text-blue-500" href={'/products/edit/' + product._id}>
                  Edit
                </Link>
                <Link className="btn-red hover:text-red-500" href={'/products/delete/' + product._id}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
        className="flex mt-10 space-x-10"
      />
    </Layout>
  );
}
