import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toWords } from "number-to-words";
import Invoice from "@/pages/invoice";
import Spinner from "@/components/Spinner";
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const isWithinDateRange =
        (!fromDate || orderDate >= from) && (!toDate || orderDate <= to);
      const matchesStatus =
        !statusFilter || order.status?.toLowerCase() === statusFilter;
      return (
        isWithinDateRange &&
        matchesStatus &&
        order.cart[0].title.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  }, [search, orders, fromDate, toDate, statusFilter]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  const handleExport = (format) => {
    const exportData = filteredOrders.map((order) => ({
      Date: new Date(order.createdAt).toLocaleString(),
      Paid: order.paid ? "Prepaid" : "COD",
      Bill_Number: order.order_id,
      MRP: order.cart.reduce((sum, item) => {
        return sum + item.discountedPrice * item.quantity;
      }, 0),
      Name: order.buyer_name,
      Email: order.email,
      StreetAddress: order.address,
      City: order.city,
      PostalCode: order.postalCode,
      Country: order.country,
      Products: order.cart.map((item) => item.title).join("#"),
      Quantity: order.cart.map((item) => item.quantity).join("#"),
    }));

    if (format === "csv" || format === "excel") {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Orders");
      const fileExtension = format === "csv" ? ".csv" : ".xlsx";
      XLSX.writeFile(wb, `Orders${fileExtension}`);
    } else if (format === "txt") {
      const textContent = exportData
        .map((row) => Object.values(row).join("\t"))
        .join("\n");
      const blob = new Blob([textContent], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "Orders.txt");
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
  };

  const ordersPerPage = rowsPerPage;
  const pagesVisited = pageNumber * ordersPerPage;

  const displayOrders = filteredOrders.slice(
    pagesVisited,
    pagesVisited + ordersPerPage
  );

  const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

  const cancleOrder = async (id) => {
    await axios.post(`/api/cancleorder/`, { id });
    fetchOrders();
  };

  const deleveredOrder = async (id) => {
    await axios.post(`/api/deleveredorder/`, { id });
    fetchOrders();
  };

  const handleResetDates = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <Layout>
      <h1>Orders</h1>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {/* Display spinner while loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4 my-7 gap-5 overflow-x-auto">
        <input
          type="text"
          placeholder="Search by product title"
          value={search}
          onChange={handleSearchChange}
          className="border px-2 py-1 rounded w-full"
        />

        <div className="flex gap-2 justify-center w-full">
          <button
            onClick={() => handleExport("csv")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded flex-1"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded flex-1"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport("txt")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded flex-1"
          >
            Export Txt
          </button>
        </div>

        <div className="flex gap-2 justify-center w-full">
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            className="border px-2 py-1 rounded w-full"
          />
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            className="border px-2 py-1 rounded w-full"
          />
          <button
            onClick={handleResetDates}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded flex-1"
          >
            Reset Dates
          </button>
        </div>

        <select
          onChange={handleRowsPerPageChange}
          value={rowsPerPage}
          className="border px-2 py-1 rounded w-full"
        >
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
          <option value={100}>100 rows</option>
          <option value={250}>250</option>
        </select>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="canceled">Canceled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse w-full mt-11">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Paid</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2 w-64">Recipient</th>

              {/* <th className="border border-gray-300 px-4 py-2">
                Address Information
              </th> */}
              <th className="border border-gray-300 px-4 py-2">
                Other Information
              </th>
              <th className="border border-gray-300 px-4 py-2 w-11/12">
                Products & Quantity{" "}
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Paid Amount
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Customization
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 &&
              displayOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <td className="border px-4 py-3 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <img
                      src={order.cart[0]?.images[0] || "/placeholder-image.png"}
                      alt="Product Image"
                      className="h-16 w-16 rounded-md object-cover mx-auto"
                    />
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        order.paid ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {order.paid ? "Prepaid" : "COD"}
                    </span>
                  </td>
                  <td className="border px-4 py-3 text-sm capitalize">
                    {order.status || "N/A"}
                  </td>
                  <td className="border px-4 py-3 text-sm w-2/6">
                    <div>
                      <span className="font-semibold">Name: </span>{" "}
                      {order.buyer_name}
                    </div>
                    <div>
                      <span className="font-semibold">Number: </span>{" "}
                      
                      {order.phone}
                    </div>
                    <div className="mt-2">
                      <p className="font-bold">Address:</p>
                      {order.address}, {order.city}, {order.postalCode}
                      <br />
                      {order.country}
                    </div>
                  </td>
                  
                  <td className="border px-4 py-3 text-sm">
                    <div>
                      <span className="font-semibold">Order ID: </span>{" "}
                      {order.order_id}
                    </div>
                    <div>
                      <span className="font-semibold">Order Number: </span>
                      <a
                        className="text-blue-500 hover:underline"
                        href={`https://app.shiprocket.in/seller/orders/details/${order.order_id}`}
                      >
                        {order.channel_order_id}
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold">Shipment ID: </span>{" "}
                      {order.shipment_id}
                    </div>
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    {order.cart.map((item, index) => (
                      <div key={index} className="mb-2">
                        <div>
                          <span className="font-semibold">Product: </span>
                          <a
                            href={`https://www.internationalgift.in/product/${item._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.title}
                          </a>
                        </div>
                        <div>
                          <span className="font-semibold">Quantity: </span>{" "}
                          {item.quantity}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-3 text-sm capitalize ">
                    <span className="bg-green-200 text-black p-1 rounded-xl"> 
                    Rs {order.paidAmount || "N/A"}
                    </span>
                    
                  </td>
                  <td className="border px-4 py-3 text-sm">
                    <div>
                      <span className="font-semibold">Message: </span>{" "}
                      {order.storedMessage || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Name: </span>{" "}
                      {order.storedusername || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">Number: </span>{" "}
                      {order.storednumber || "N/A"}
                    </div>
                    {order.storedImageUrl?.map((url, index) => (
                      <div
                        key={index}
                        className="mt-2 flex items-center space-x-2"
                      >
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <a
                          href={url}
                          download={`image-${index + 1}`}
                          className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <div className="flex flex-col space-y-2">
                      {order.status === "NEW" && (
                        <>
                          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                            <a href={`invoice/${order._id}`}>Invoice</a>
                          </button>
                          <button
                            onClick={() => deleveredOrder(order._id)}
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                          >
                            Ship Now
                          </button>
                          <button
                            onClick={() => cancleOrder(order._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {order.status === "canceled" && (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
                        >
                          Canceled
                        </button>
                      )}
                      {order.status === "Delivered" && (
                        <>
                          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                            <a href={`invoice/${order._id}`}>Invoice</a>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          className="flex space-x-2"
        />
      </div>
    </Layout>
  );
}
