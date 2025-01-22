import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import axios from "axios";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { id } = req.body;

      // Find the order by ID
      const order = await Order.findById(id);
      if (!order) {
        console.log(`No order found with ID: ${id}`);
        return res.status(404).json({ error: "Order not found" });
      }

      // Update stock quantities for each product in the cart
      for (const item of order.cart) {
        const product = await Product.findById(item._id);
        if (product) {
          if (product.stockQuantity >= item.quantity) {
            product.stockQuantity -= item.quantity;
      
            // Ensure custom field is cast to boolean before saving
            product.custom = Boolean(product.custom); 
      
            await product.save();
          } else {
            return res.status(400).json({
              error: `Insufficient stock for product: ${product.title}`,
            });
          }
        } else {
          return res.status(404).json({
            error: `Product not found for ID: ${item._id}`,
          });
        }
      }

      // Update the order status to "Delivered"
      // order.status = "Delivered";
      // await order.save();

      const updatedOrder = await Order.updateOne(
        { _id: id },
        { $set: { status: "Delivered" } }
      );

      if (!updatedOrder) {
        console.log(`No order found with order_id: ${id}`);
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Order updated successfully:", order);

      // Send the final response
      res.status(200).json({
        message: "Order status updated to Delivered, and stock adjusted.",
      });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
