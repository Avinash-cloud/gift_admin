import { mongooseConnect } from "@/lib/mongoose";
import BestSell from "@/models/BestSell";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const AllCollections = await BestSell.find({});
      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch AllCollections" });
    }
  } else if (req.method === "POST") {
    try {
      const existingAllCollections = await BestSell.find({});
      if (existingAllCollections.length >= 3) {
        return res.status(400).json({
          success: false,
          error: "Only Three BestSell are allowed.",
        });
      }

      const AllCollections = await BestSell.create(req.body);
      res.status(201).json({ success: true, data: AllCollections});
    } catch (error) {
        console.log(error);
        
      res.status(400).json({ success: false, error: "Failed to create BestSell" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;

    try {
      const AllCollections = await BestSell.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!AllCollections) {
        return res
          .status(404)
          .json({ success: false, error: "BestSell not found" });
      }

      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(400).json({ success: false, error: "Failed to update BestSell" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
