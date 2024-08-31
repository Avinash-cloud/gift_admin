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

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setFilteredOrders(response.data);
    });
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const isWithinDateRange =
        (!fromDate || orderDate >= from) && (!toDate || orderDate <= to);
      return (
        isWithinDateRange &&
        order.cart[0].title.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredOrders(filtered);
  }, [search, orders, fromDate, toDate]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleExport = (format) => {
    const exportData = filteredOrders.map((order) => ({
      Date: new Date(order.createdAt).toLocaleString(),
      Paid: order.paid ? "YES" : "NO",
      Name: order.buyer_name,
      Email: order.email,
      StreetAddress: order.streetAddress,
      City: order.city,
      PostalCode: order.postalCode,
      Country: order.country,
      Products: order.cart.map((item) => item.title).join(", "),
      Quantity: order.cart.map((item) => item.quantity).join(", "),
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

  const generatePDF = async (order) => {
    const doc = new jsPDF();
    const content = `
      <div>
        <h1>Invoice</h1>
        <div><strong>Date:</strong> ${new Date(
          order.createdAt
        ).toLocaleString()}</div>
        <div><strong>Name:</strong> ${order.buyer_name}</div>
        <div><strong>Email:</strong> ${order.email}</div>
        <div><strong>Street Address:</strong> ${order.address}</div>
        <div><strong>City:</strong> ${order.city}</div>
        <div><strong>Postal Code:</strong> ${order.postalCode}</div>
        <div><strong>Country:</strong> ${order.country}</div>
        <h2>Products</h2>
        ${order.cart
          .map(
            (item) => `
          <div>
            <strong>Product:</strong> ${item.title} <br />
            <strong>Quantity:</strong> ${item.quantity}
          </div>
        `
          )
          .join("")}
      </div>
    `;

    const element = document.createElement("div");
    element.innerHTML = content;
    document.body.appendChild(element);

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 10, 10);
    doc.save(`Invoice_${order._id}.pdf`);
    document.body.removeChild(element);
  };

  const cancleOrder=async (id)=>{
    await axios.post(`/api/cancleorder/`,{id});
    
  }

  const handleResetDates = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <Layout>
      <h1>Orders</h1>

      <div className="grid mb-4 my-7 gap-5 overflow-x-auto">
        <input
          type="text"
          placeholder="Search by product title"
          value={search}
          onChange={handleSearchChange}
          className="border px-2 py-1 rounded"
        />
        <div className="flex gap-11 justify-center w-1/3">
          <button
            onClick={() => handleExport("csv")}
            className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport("excel")}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport("txt")}
            className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
          >
            Export Txt
          </button>
        </div>
        <div className="flex gap-11 justify-center w-1/3">
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            className="border px-2 py-1 rounded ml-2"
          />
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            className="border px-2 py-1 rounded ml-2"
          />
          <button
            onClick={handleResetDates}
            className="w-full ml-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
          >
            Reset Dates
          </button>
        </div>
        <select
          onChange={handleRowsPerPageChange}
          value={rowsPerPage}
          className="ml-2 border px-2 py-1 rounded"
        >
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
          <option value={100}>100 rows</option>
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
              <th className="border border-gray-300 px-4 py-2">Recipient</th>
              <th className="border border-gray-300 px-4 py-2">
                Other Information
              </th>
              <th className="border border-gray-300 px-4 py-2 w-11/12">
                Products & Quantity{" "}
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 &&
              displayOrders.map((order) => (
                <tr key={order._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={order.cart[0].images[0]}
                      alt="Product Image"
                      className="h-20 w-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paid ? "YES" : "NO"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.status || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div>Name : {order.buyer_name}</div> <br />
                    <div>Email: {order.email}</div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-2/4">
                    {order.address}, {order.city},{" "}
                    {order.postalCode}
                    <br />
                    {order.country}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="w-60">
                    {order.cart.map((item, index) => (
                      <div className="overflow-auto w-full" key={index}>
                        <div>Products : {item.title}</div>{" "}
                        <div> Quantity : {item.quantity}</div>
                        <br />
                      </div>
                    ))}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex">
                    <button
                      onClick={() => generatePDF(order)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Invoice
                    </button>
                    <button
                      onClick={() => cancleOrder(order.order_id)}
                      className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Cancle
                    </button>
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
