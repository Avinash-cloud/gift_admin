import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import axios from "axios";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    try {
      // Destructure the required fields from req.body
      const { id } = req.body;

      // const authResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      //   email: "rakeshtest@internationalgift.in",
      //   password: "Rakesh@123",
      // });

      // const token = authResponse.data.token;

      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
      // };

      // const orderResponse = await axios.post(
      //   'https://apiv2.shiprocket.in/v1/external/orders/cancel',
      //   { id },
      //   {
      //     headers: headers,
      //   }
      // );

      // Extract the order_id from the response if needed
      // const { order_id } = orderResponse.data;
      // const { order_id } = id


      // Update the order status to "canceled" in MongoDB where order_id matches
      const updatedOrder = await Order.updateOne(
        { _id: id },
        { $set: { status: "Delivered" } }
      );
      
      if (!updatedOrder) {
        console.log(`No order found with order_id: ${id}`);
        return res.status(404).json({ error: "Order not found" });
      }
      
      console.log("Updated Order:", updatedOrder);
      

      // Send the final response with order data
      res.status(200).json({ order: "ordered canceled" });

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message, error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
