import { mongooseConnect } from "@/lib/mongoose";
import TopCollection from "@/models/TopCollection";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const AllCollections = await TopCollection.find({});
      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch AllCollections" });
    }
  } else if (req.method === "POST") {
    try {
      const existingAllCollections = await TopCollection.find({});
      if (existingAllCollections.length >= 4) {
        return res.status(400).json({
          success: false,
          error: "Only four TopCollections are allowed.",
        });
      }

      const AllCollections = await TopCollection.create(req.body);
      res.status(201).json({ success: true, data: AllCollections});
    } catch (error) {
        console.log(error);
        
      res.status(400).json({ success: false, error: "Failed to create TopCollection" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;

    try {
      const AllCollections = await TopCollection.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!AllCollections) {
        return res
          .status(404)
          .json({ success: false, error: "TopCollection not found" });
      }

      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(400).json({ success: false, error: "Failed to update TopCollection" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
