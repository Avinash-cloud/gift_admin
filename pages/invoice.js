import Layout from "@/components/Layout";
import React, { useEffect } from "react";
// import { html2pdf } from "html2pdf.js";
import generatePDF, { Options } from "react-to-pdf";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { Save } from "@mui/icons-material";
export default function Invoice() {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <div id="content2" className="pdf p-4">
        <div className="grid grid-cols-2 pb-5">
          <div>
            <img src="../../international-gift-logo-inline.png" alt="" />
            <div className="text-lg ml-36 font-semibold text-red-500">
              Corporate & Occasions Gift
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">
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
              Shop No. 5, Back Side on Ground Floor at Plot No. 337, Om, Vihar,
              Phase 1, Shankar Road, Uttam Nagar
            </div>
            <div className=" ">New Delhi, Delhi, 110059</div>
          </div>
          <div className="border-2 border-black flex flex-col items-end pr-4">
            <div className="text-xl font-bold">Billing Address: </div>
            <div className=" ">C Vasanthamalar </div>
            <div className=" ">
              Plot No 9 , Mullai Nagar, Madambakkam Chennai
            </div>
            <div className="uppercase">CHENNAI, TAMIL NADU, 600126</div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-2 border-b-2 pb-4 border-black">
          <div className="pl-4 flex flex-col items-start">
            <div className="text-xl">
              <span className="font-bold text-xl">PAN No:</span> EEJPS4486B{" "}
            </div>
            <div className="text-xl">
              <span className="font-bold text-xl">GST Registration No:</span>{" "}
              07EEJPS4486B1Z6
            </div>
          </div>
          <div className="flex flex-col items-end pr-4">
            <div className="text-xl font-bold">Shipping Address: </div>
            <div className=" ">C Vasanthamalar </div>
            
            <div className=" ">
              Plot No 9 , Mullai Nagar, Madambakkam Chennai
            </div>
            <div className="uppercase">CHENNAI, TAMIL NADU, 600126</div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-2 pb-5 pt-3">
          <div className="pl-4 flex flex-col items-start">
            <div className="text-xl">
              <span className="font-bold text-xl">Order Number:</span>{" "}
              XXXX-XXXX-XXXXXX{" "}
            </div>
            <div className="text-xl">
              <span className="font-bold text-xl">Order Date:</span> 26.09.2024
            </div>
          </div>
          <div className="flex flex-col items-end pr-4">
            <div className="text-xl font-bold">Invoice Number: XXXXX</div>
            <div className="text-xl font-bold">Invoice Date: 26.09.2024</div>
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
                <tr>
                  <td className="border-2 border-black px-4 py-2">1</td>
                  <td className="border-2 border-black px-4 py-2">
                    <div>
                      INTERNATIONAL GIFT Silver Musical Ganesh God Idol | Happy
                      Birthday Printed Box | Carry Bag
                    </div>
                    <div className="text-sm font-bold mt-4">
                      SKU : ( MUSICALGANESH/S/BIRTHDAY )
                    </div>
                    <div className="text-sm font-bold">HSN:8306</div>
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    822.2
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    -41.2
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    781.20
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    12%
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    93.75
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    874.95
                  </td>
                </tr>
                <tr>
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
                </tr>
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
                    93.75
                  </td>
                  <td className="border-2 border-black px-4 py-2 font-bold">
                    874.95
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
                Eight Hundred Seventy-four Point Nine Five only
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end pr-4">
            <div className="text-xl font-bold"> For International Gift:</div>
            <div className="text-xl font-bold">Authorized Signatory</div>
          </div>
        </div>

        <div className="grid grid-cols-4 mt-5 ">
          {/* <div className="border-2 border-black pl-4 flex flex-col items-start">
            <div className="text-xl font-bold">Payment Transaction ID: </div>
            <div className=" ">i93r2IkyRMPIb6xGStkh2JoVsOA0FyXel6H</div>
          </div> */}
          <div className="border-2 border-black pl-4 flex flex-col items-start">
            <div className="text-xl font-bold">Date & Time: </div>
            <div className=" ">26/09/2024, 08:45:57 hrs</div>
          </div>
          <div className="border-2 border-black pl-4 flex flex-col items-start">
            <div className="text-xl font-bold"> Invoice Value: </div>
            <div className=" ">874.95</div>
          </div>
          <div className="border-2 border-black pl-4 flex flex-col items-start">
            <div className="text-xl font-bold">Mode of Payment: </div>
            <div className=" ">Cod / UPI</div>
          </div>
        </div>

        <div className="pt-5 py-3 text-xl text-center border-b-2 border-black">
          Registered Address for International Gift, Om Vihar Phase 2,, NEW
          DELHI - 110059, DELHI, IN
        </div>
      </div>

      <button
        className="no-print mt-5 bg-blue-600 justify-center items-center flex"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
      <style jsx>{`
        @media print {
          @page {
            size: landscape; /* Set the page size */
            margin: 1in; /* Adjust the margin as needed */
          }

          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .printable-content {
            /* Ensure everything fits on one page */
            page-break-before: avoid;
            page-break-after: avoid;
            page-break-inside: avoid;
            overflow: hidden;
            font-size: 0.8em; /* Adjust font size to fit content */
            transform: scale(0.9); /* Scale down content to fit the page */
          }

          .no-print {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
