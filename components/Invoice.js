// components/Invoice.js

import React, { useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const Invoice = () => {
  const generatePDF = () => {
    const element = document.getElementById('invoice'); // Get the invoice element
    const options = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save(); // Generate and save the PDF
  };

  useEffect(() => {
    // Ensure html2pdf is only imported and used on the client side
    if (typeof window !== 'undefined') {
      // Now it's safe to use html2pdf
    }
  }, []);

  return (
    <div>
      <div id="invoice" style={{ backgroundColor: "#e1e1e1" }}>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#e1e1e1" }}>
        <tr>
          <td height="20"></td>
        </tr>
        <tr>
          <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#ffffff" }}>
              <tr className="hiddenMobile">
                <td height="40"></td>
              </tr>
              <tr className="visibleMobile">
                <td height="30"></td>
              </tr>

              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" className="col">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <h1 style={{ color: "#ff0000" }}>INTERNATIONAL GIFT</h1>
                                  <p>Corporate & Occasions Gift</p>
                                </td>
                              </tr>
                              <tr className="hiddenMobile">
                                <td height="40"></td>
                              </tr>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td>
                                  Hello, Philip Brooks.
                                  <br />
                                  Thank you for shopping from our site and for your order.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" className="col">
                            <tbody>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td height="5"></td>
                              </tr>
                              <tr>
                                <td align="right">
                                  <span style={{ fontSize: "21px", color: "#ff0000", letterSpacing: "-1px", fontFamily: "'Open Sans', sans-serif", lineHeight: "1", verticalAlign: "top" }}>Invoice</span>
                                </td>
                              </tr>
                              <tr></tr>
                              <tr className="hiddenMobile">
                                <td height="50"></td>
                              </tr>
                              <tr className="visibleMobile">
                                <td height="20"></td>
                              </tr>
                              <tr>
                                <td align="right">
                                  <small>ORDER</small> #800000025
                                  <br />
                                  <small>MARCH 4TH 2016</small>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#e1e1e1" }}>
        <tbody>
          <tr>
            <td>
              <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr></tr>
                  <tr className="hiddenMobile">
                    <td height="60"></td>
                  </tr>
                  <tr className="visibleMobile">
                    <td height="40"></td>
                  </tr>
                  <tr>
                    <td>
                      <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                        <tbody>
                          <tr>
                            <th width="52%" align="left" style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", fontWeight: "normal", lineHeight: "1", verticalAlign: "top", padding: "0 10px 7px 0" }}>
                              Item
                            </th>
                            <th align="left" style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", fontWeight: "normal", lineHeight: "1", verticalAlign: "top", padding: "0 0 7px" }}>
                              <small>SKU</small>
                            </th>
                            <th align="center" style={{ fontSize: "12px ", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", fontWeight: "normal", lineHeight: "1", verticalAlign: "top", padding: "0 0 7px" }}>
                              Quantity
                            </th>
                            <th align="right" style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", fontWeight: "normal", lineHeight: "1", verticalAlign: "top", padding: "0 10px 7px 0" }}>
                              Subtotal
                            </th>
                          </tr>
                          <tr>
                            <td height="1" colspan="4"></td>
                          </tr>
                          <tr>
                            <td height="10" colspan="4"></td>
                          </tr>
                          <tr>
                            <td className="article">
                              Beats Studio Over-Ear Headphones
                            </td>
                            <td>
                              <small>MH792AM/A</small>
                            </td>
                            <td align="center">
                              1
                            </td>
                            <td align="right">
                              $299.95
                            </td>
                          </tr>
                          <tr>
                            <td height="1" colspan="4"></td>
                          </tr>
                          <tr>
                            <td className="article">
                              Beats RemoteTalk Cable
                            </td>
                            <td>
                            <small>MHDV2G/A</small>
                          </td>
                          <td align="center">
                            1
                          </td>
                          <td align="right">
                            $29.95
                          </td>
                        </tr>
                        <tr>
                          <td height="1" colspan="4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td height="20"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>

      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#e1e1e1" }}>
        <tbody>
          <tr>
            <td>
              <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr>
                    <td>
                      <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                        <tbody>
                          <tr>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              Subtotal
                            </td>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "22px", verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                              $329.90
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              Shipping &amp; Handling
                            </td>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#646a6e", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              $15.00
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#000", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              <strong>Grand Total (Incl.Tax)</strong>
                            </td>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#000", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              <strong>$344.90</strong>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#b0b0b0", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              <small>TAX (18%)</small>
                            </td>
                            <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#b0b0b0", lineHeight: "22px", verticalAlign: "top", textAlign: "right" }}>
                              <small>$72.40</small>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#e1e1e1" }}>
        <tbody>
          <tr>
            <td>
              <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#ffffff" }}>
                <tbody>
                  <tr></tr>
                  <tr className="hiddenMobile">
                    <td height="60"></td>
                  </tr>
                  <tr className="visibleMobile">
                    <td height="40"></td>
                  </tr>
                  <tr>
                    <td>
                      <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                        <tbody>
                          <tr>
                            <td>
                              
                              <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" className="col">
                              <tbody>
                                <tr>
                                  <td style={{ fontSize: "11px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "1", verticalAlign: "top" }}>
                                    <strong>BILLING INFORMATION</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "20px", verticalAlign: "top" }}>
                                    Philip Brooks
                                    <br />
                                    Public Wales, Somewhere
                                    <br />
                                    New York NY
                                    <br />
                                    4468, United States
                                    <br />
                                    T: 202-555-0133
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" className="col">
                              <tbody>
                                <tr className="visibleMobile">
                                  <td height="20"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "11px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "1", verticalAlign: "top" }}>
                                    <strong>PAYMENT METHOD</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "20px", verticalAlign: "top" }}>
                                    COD
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                      <tbody>
                        <tr>
                          <td>
                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" className="col">
                              <tbody>
                                <tr className="hiddenMobile">
                                  <td height="35"></td>
                                </tr>
                                <tr className="visibleMobile">
                                  <td height="20"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "11px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "1", verticalAlign: "top" }}>
                                    <strong>SHIPPING INFORMATION</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "20px", verticalAlign: "top" }}>
                                    Sup Inc
                                    <br />
                                    Another Place, Somewhere
                                    <br />
                                    New York NY
                                    <br />
                                    4468, United States
                                    <br />
                                    T: 202-555-0171
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" className="col">
                              <tbody>
                                <tr className="hiddenMobile">
                                  <td height="35"></td>
                                </tr>
                                <tr className="visibleMobile">
                                  <td height="20"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "11px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "1", verticalAlign: "top" }}>
                                    <strong>Sold By</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="100%" height="10"></td>
                                </tr>
                                <tr>
                                  <td style={{ fontSize: "12px", fontFamily: "'Open Sans', sans-serif", color: "#5b5b5b", lineHeight: "20px", verticalAlign: "top" }}>
                                    <p>
                                      <strong>International Gift</strong>
                                      <br />
                                      Shop No. 5, Back Side on Ground Floor at
                                      Plot No. 337,
                                        <br />
                                        Om Vihar, Phase 1, Shankar Road, Uttam Nagar
                                        <br />
                                        New Delhi, Delhi, 110059
                                      </p>
                                      <p>PAN No: EEJPS4486B</p>
                                      <p>
                                        GST Registration No: 07EEJPS4486B1Z6
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr className="hiddenMobile">
                    <td height="60"></td>
                  </tr>
                  <tr className="visibleMobile">
                    <td height="30"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#e1e1e1" }}>
        <tr>
          <td>
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" className="fullTable" style={{ backgroundColor: "#ffffff", borderRadius: "0 0 10px 10px" }}>
              <tr>
                <td>
                  <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" className="fullPadding">
                    <tbody>
                      <tr>
                        <td style={{ fontSize: "12px", color: "#5b5b5b", fontFamily: "'Open Sans', sans-serif", lineHeight: "18px", verticalAlign: "top", textAlign: "left" }}>
                          Have a nice day.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="spacer">
                <td height="50"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="20"></td>
        </tr>
      </table>
      </div>
      <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Download Invoice as PDF
      </button>
    </div>
  );
};

export default Invoice;
