import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import axios from "axios";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    try {
      // Destructure the required fields from req.body
      const { id } = req.body;

      const authResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: "rakeshtest@internationalgift.in",
        password: "Rakesh@123",
      });

      const token = authResponse.data.token;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const orderResponse = await axios.post(
        'https://apiv2.shiprocket.in/v1/external/orders/cancel',
        { id },
        {
          headers: headers,
        }
      );

      // Extract the order_id from the response if needed
      const { order_id } = orderResponse.data;

      // Update the order status to "canceled" in MongoDB where order_id matches
      await Order.findOneAndUpdate(
        { order_id: order_id },
        { $set: { status: "canceled" } },
        { new: true } // Returns the updated document
      );

      // Send the final response with order data
      res.status(200).json({ order: orderResponse.data });

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message, error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
