// pages/api/videoProduct.js
import { mongooseConnect } from '@/lib/mongoose';
import VideoProduct from '@/models/VideoProduct';

export default async function handler(req, res) {
  await mongooseConnect();

  switch (req.method) {
    case 'GET':
      try {
        // Fetch all video products
        const videoProducts = await VideoProduct.find({});
        res.status(200).json({ success: true, data: videoProducts });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        // Create a new video product
        const videoProduct = await VideoProduct.create(req.body);
        res.status(201).json({ success: true, data: videoProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        // Update an existing video product by ID
        const updatedVideoProduct = await VideoProduct.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedVideoProduct) {
          return res.status(404).json({ success: false, message: 'Video product not found' });
        }

        res.status(200).json({ success: true, data: updatedVideoProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        // Delete a video product by ID
        const deletedVideoProduct = await VideoProduct.findByIdAndDelete(id);

        if (!deletedVideoProduct) {
          return res.status(404).json({ success: false, message: 'Video product not found' });
        }

        res.status(200).json({ success: true, data: deletedVideoProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
