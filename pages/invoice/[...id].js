import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { toWords } from "number-to-words";

export default function EditProductPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/orders?id=" + id).then((response) => {
      setOrders(response.data);
    });
  }, [id]);

  const handleDownloadPDF = () => {
    window.print();
  };
  console.log(orders);

  const totalDiscountedPrice =
    orders.length > 0 && orders[0].cart
      ? orders[0].cart.reduce((total, item) => {
        return total + item.discountedPrice;
      }, 0)
      : 0;

  const totalTaxPrice =
    orders.length > 0 && orders[0].cart
      ? orders[0].cart?.reduce((total, item) => {
        return (
          total +
          Math.round(
            (parseFloat(item.property.Tax) / 100) * item.discountedPrice
          )
        );
      }, 0)
      : 0;

  const totalDiscountedPriceInWords = toWords(totalDiscountedPrice);
  return (
    <>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <div key={index} id="content2" className=" printable-content p-4">
            <div className="grid grid-cols-2 pb-5">
              <div>
                <img
                  src="../../international-gift-logo-inline.png"
                  alt=""
                  height={250}
                  width={250}
                />
                <div className="text-sm ml-9 font-semibold text-red-500">
                  Corporate & Occasions Gift
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-lg font-bold">
                  Tax Invoice/Bill of Supply/Cash Memo
                </div>
                <div className="text-xl font-normal"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-5">
              <div className="border-2 border-black pl-4 flex flex-col items-start">
                <div className="text-xl font-bold">Sold By: </div>
                <div className=" ">International Gift </div>
                <div className=" ">
                  Shop No. 5, Back Side on Ground Floor at Plot No. 337, Om,
                  Vihar, Phase 1, Shankar Road, Uttam Nagar
                </div>
                <div className=" ">New Delhi, Delhi, 110059</div>
              </div>
              <div className="border-2 border-black flex flex-col items-end pr-4">
                <div className="text-xl font-bold">Billing Address: </div>
                <div className=" ">{order.buyer_name} </div>
                <div className=" ">
                  {order.address} , {order.city},{order.region}
                </div>
                <div className="uppercase">
                  {order.city}, {order.country}, {order.postalCode}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2 border-b-2 pb-4 border-black">
              <div className="pl-4 flex flex-col items-start">
                <div className="text-xl">
                  <span className="font-bold text-xl">PAN No:</span> EEJPS4486B{" "}
                </div>
                <div className="text-xl">
                  <span className="font-bold text-xl">
                    GST Registration No:
                  </span>{" "}
                  07EEJPS4486B1Z6
                </div>
              </div>
              <div className="flex flex-col items-end pr-4">
                <div className="text-xl font-bold">Shipping Address: </div>
                <div className=" ">{order.buyer_name} </div>

                <div className=" ">
                  {order.address} , {order.city},{order.region}
                </div>
                <div className="uppercase">
                  {order.city}, {order.country}, {order.postalCode}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2 pb-5 pt-3">
              <div className="pl-4 flex flex-col items-start">
                <div className="text-xl">
                  <span className="font-bold text-xl">Order Number:</span>{" "}
                  {order.order_id}{" "}
                </div>
                <div className="text-xl">
                  <span className="font-bold text-xl">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="flex flex-col items-end pr-4">
                <div className="text-xl font-bold">
                  Invoice Number: {order._id}
                </div>
                <div className="text-xl font-bold">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300">
                  <thead className="">
                    <tr>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Sr.No
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold w-1/4">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Discount
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Net Amount
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Tax Rate
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Tax Amount
                      </th>
                      <th className="px-4 py-2 text-left text-lg border-2 border-black font-bold">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.cart.map((item, index) => (
                      <tr key={index} item={item} index={index}>
                        <td className="border-2 border-black px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border-2 border-black px-4 py-2">
                          <div>{item.title}</div>
                          <div className="text-sm font-bold mt-4">
                            SKU : ({item.id})
                          </div>
                          <div className="text-sm font-bold">
                            HSN: {item.property.HSN}
                          </div>
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          {item.price}
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          ₹{item.discountedPrice - item.price} {""}(
                          {Math.round(
                            ((item.price - item.discountedPrice) / item.price) *
                            100
                          )}
                          %)
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          {item.discountedPrice -
                            Math.round(
                              (parseFloat(item.property.Tax) / 100) *
                              item.discountedPrice
                            )}
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          {item.property.Tax}
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          {Math.round(
                            (parseFloat(item.property.Tax) / 100) *
                            item.discountedPrice
                          )}
                        </td>
                        <td className="border-2 border-black px-4 py-2 font-bold">
                          {item.discountedPrice}
                        </td>
                      </tr>
                    ))}

                    {/* <tr>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        Shipping Charge
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        35.71
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        -35.71
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        00.00
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        12%
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        00.00
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        00.00
                      </td>
                    </tr> */}
                    <tr>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        Total
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold"></td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        {totalTaxPrice}
                      </td>
                      <td className="border-2 border-black px-4 py-2 font-bold">
                        {totalDiscountedPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-2 pb-5 pt-3">
              <div className="pl-4 flex flex-col items-start">
                <div className="text-xl">
                  <span className="font-bold text-xl">Amount in Words:</span>{" "}
                </div>
                <div className="text-xl">
                  <span className="font-bold text-xl">
                    {" "}
                    {totalDiscountedPriceInWords} only
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end pr-4">
                <div className="text-xl font-bold">
                  {" "}
                  For International Gift:
                </div>
                <div className="text-xl font-bold">Authorized Signatory</div>
              </div>
            </div>

            <div className=" printable-content grid grid-cols-4 mt-5 ">
              {/* <div className="border-2 border-black pl-4 flex flex-col items-start">
                    <div className="text-xl font-bold">Payment Transaction ID: </div>
                    div className=" ">i93r2IkyRMPIb6xGStkh2JoVsOA0FyXel6H</div>
                  </div> */}
              <div className="border-2 border-black pl-4 flex flex-col items-start">
                <div className="text-xl font-bold">Date & Time: </div>
                <div className=" ">26/09/2024, 08:45:57 hrs</div>
              </div>
              <div className="border-2 border-black pl-4 flex flex-col items-start">
                <div className="text-xl font-bold"> Invoice Value: </div>
                <div className=" ">{totalDiscountedPrice}</div>
              </div>
              <div className="border-2 border-black pl-4 flex flex-col items-start">
                <div className="text-xl font-bold">Payment States: </div>
                <div className=" ">
                  {order.paid ? (
                    <p>Status: Paid</p>
                  ) : (
                    <div>
                      <p>Status: Cash on Delivery (COD)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5 py-3 text-xl text-center border-b-2 border-black">
              Registered Address for International Gift, Om Vihar Phase 2,, NEW
              DELHI - 110059, DELHI, IN
            </div>
          </div>
        ))}

      <div className="flex justify-center mt-5">
        <button
          className="no-print bg-blue-600 text-white rounded-md p-2"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
      <style jsx>{`
        @media print {
          @page {
            size: A4; /* Set the page size */
            margin: 1in; /* Adjust the margin as needed */
          }

          body {
            margin: 20px;
            padding: 40px;
            box-sizing: border-box;
            transform: scale(0.77);
            transform-origin: top left;
          }

          .printable-content {
            /* Ensure everything fits on one page */
            page-break-before: avoid;
            page-break-after: avoid;
            page-break-inside: avoid;
            overflow: auto;
            font-size: 0.8em; /* Adjust font size to fit content */
            transform: scale(0.9); /* Scale down content to fit the page */
          }

          table {
    width: 100%;
    border-collapse: collapse; /* To avoid borders breaking */
}

tr {
    page-break-inside: avoid; /* Prevent row from breaking between pages */
}

td, th {
    border: 1px solid black; /* Example border */
    padding: 8px;
}

          .no-print {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
