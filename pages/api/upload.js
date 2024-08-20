import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dbconnect from '../../lib/dbConnect';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await dbconnect();

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];
  for (const file of files.file) {
    const ext = path.extname(file.originalFilename);
    const newFilename = Date.now() + ext;
    const tempFilePath = path.join('./', newFilename);

    fs.renameSync(file.path, tempFilePath);

    try {
      const response = await cloudinary.uploader.upload(tempFilePath, {
        folder: process.env.CLOUDINARY_FOLDER, // Optional: specify a folder in Cloudinary
      });

      links.push(response.secure_url);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
    } finally {
      fs.unlinkSync(tempFilePath);
    }
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
