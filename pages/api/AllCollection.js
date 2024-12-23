import { mongooseConnect } from "@/lib/mongoose";
import AllCollection from "@/models/AllCollection";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const AllCollections = await AllCollection.find({});
      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch AllCollections" });
    }
  } else if (req.method === "POST") {
    try {
      const existingAllCollections = await AllCollection.find({});
      if (existingAllCollections.length >= 2) {
        return res.status(400).json({
          success: false,
          error: "Only two AllCollections are allowed.",
        });
      }

      const AllCollections = await AllCollection.create(req.body);
      res.status(201).json({ success: true, data: AllCollections});
    } catch (error) {
        console.log(error);
        
      res.status(400).json({ success: false, error: "Failed to create AllCollection" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;

    try {
      const AllCollections = await AllCollection.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!AllCollections) {
        return res
          .status(404)
          .json({ success: false, error: "AllCollection not found" });
      }

      res.status(200).json({ success: true, data: AllCollections });
    } catch (error) {
      res.status(400).json({ success: false, error: "Failed to update AllCollection" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
