import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp, User) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER,
    subject: "Your OTP for Password Reset",
    html: `<p>Hi ${User},</p>

      <p>Your OTP to reset your password is: ${otp}</p>

      <p>This code is valid for 10 minutes. If you didn’t request this, please ignore this message.</p>

      <p>Best regards,  </p>
      <p>Internatioanl Gift</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendJoiEmail = async (email, User) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER,
    subject: "New User",
    html: `<p>Hi ${User},</p>    

      <p>Thank you for registering on International Gift ! .</p>

      <p>Best regards,  </p>
      <p>Internatioanl Gift</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// export const orderConfermation =async(email , orderid,cart)=>{
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Order Confirmation',
//     text: `Your order has been confirmed with order ID: ${orderid}`,
//   };

//   await transporter.sendMail(mailOptions);
// }

export const orderConfermation = async (email, orderid, cart, type) => {
  const cartItemsHtml = cart
    .map((item) => {
      return `
      <tr style="text-align: center;">
        <td>${orderid}</td>
        <td>${item.id}</td>
        <td><img src="${item.images[0]}" alt="${
        item.title
      }" style="width: 50px; height: 50px;" /></td>
        <td>${item.title}</td>
        <td>${item.sku}</td>
        <td>₹${item.discountedPrice}</td>
        <td>${item.quantity}</td>
        <td>₹${(item.discountedPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `;
    })
    .join("");

  const totalPrice = cart
    .reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
    .toFixed(2);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER,
    subject: "Order Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Customer,</p>
        <p>Thank you for shopping with us! We are excited to confirm that we have received your order.</p>
        
        <h3>Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; text-align: center;">
              <th>Order ID</th>
              <th>Order Name</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px; font-weight: bold;">Order Total: ₹${totalPrice}</p>
        <p style="margin-top: 20px; font-weight: bold;">Payment Status: ${type}</p>

        <p>You can track your order status on our website by <a href="https://internationalgift.in/user-history" style="color: blue;">logging into your account</a>.</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:internationalgift2024@gmail.com" style="color: blue;">internationalgift2024@gmail.com</a>.</p>
        <p>Thank you for choosing [International Gift]!</p>

        <p>Best Regards,<br/>[International Gift]</p>
      
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const orderCancelation = async (email, orderid, cart, User) => {
  const cartItemsHtml = cart
    .map((item) => {
      return `
      <tr style="text-align: center;">
        <td>${orderid}</td>
        <td>${item.id}</td>
        <td><img src="${item.images[0]}" alt="${
        item.title
      }" style="width: 50px; height: 50px;" /></td>
        <td>${item.title}</td>
        <td>${item.sku}</td>
        <td>₹${item.discountedPrice}</td>
        <td>${item.quantity}</td>
        <td>₹${(item.discountedPrice * item.quantity).toFixed(2)}</td>
      </tr>
    `;
    })
    .join("");

  const totalPrice = cart
    .reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
    .toFixed(2);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER,
    subject: "Order Cancelation",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear ${User},</p>
        <p>We are sorry to inform you that your order has been canceled From our Side. Below are the details of the canceled order.</p>
        
        <h3>Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2; text-align: center;">
              <th>Order ID</th>
              <th>Order Name</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            ${cartItemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px; font-weight: bold;">Order Total: ₹${totalPrice}</p>
        <p style="margin-top: 20px; font-weight: bold;">Payment Status - Canceled</p>

        <p>You will receive a refund within the next 5-7 business days. If you have any questions regarding this cancellation or refund process, feel free to contact us at:</p>
       <p>For any queries, feel free to contact us at <a href="mailto:Internationalgift2024@gmail.com">Internationalgift2024@gmail.com</a> or call us at <a href="tel:+918076361433">+91 8076 361 433</a>.</p>

    <p>Thank you for choosing International Gift.</p>

    <p>Best Regards,<br>International Gift</p>

    <p><a href="https://internationalgift.in/">Website Link</a> | Contact No. <a href="tel:+918076361433">+91 8076 361 433</a> | Email: <a href="mailto:Internationalgift2024@gmail.com">Internationalgift2024@gmail.com</a></p>
      
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
