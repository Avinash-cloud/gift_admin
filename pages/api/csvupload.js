// pages/api/upload.js

import multiparty from 'multiparty';
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

// MongoDB configuration
const uri = 'mongodb://localhost:27017/'; // replace with your connection string
const dbName = 'csvss_import';
const collectionName = 'csvdatas';

export const config = {
  api: { bodyParser: false },
};

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send('Error parsing form data.');
    }

    const file = files.csv[0];
    const filePath = file.path;

    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const results = [];
      let headers = [];

      // Use a Promise to handle the CSV parsing
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('headers', (headerList) => {
            headers = headerList;
          })
          .on('data', (data) => {
            const document = {};
            const images = [];
            const shortDescriptionPoints = [];
            const properties = {};

            for (const key of headers) {
              if (key.startsWith('images') && data[key]) {
                images.push(data[key]);
              } else if (key.startsWith('shortDescriptionPoints') && data[key]) {
                shortDescriptionPoints.push(data[key]);
              } else if (key.startsWith('property.') && data[key]) {
                const propertyKey = key.split('.')[1];
                properties[propertyKey] = data[key];
              } else if (data[key]) {
                // Convert specific fields to numbers
                if (['price', 'discountedPrice', 'stockQuantity'].includes(key)) {
                  document[key] = Number(data[key]);
                } else {
                  document[key] = data[key];
                }
              }
            }

            if (images.length > 0) {
              document.images = images;
            }
            if (shortDescriptionPoints.length > 0) {
              document.shortDescriptionPoints = shortDescriptionPoints;
            }
            if (Object.keys(properties).length > 0) {
              document.properties = properties;
            }

            results.push(document);
          })
          .on('end', () => {
            resolve(results);
          })
          .on('error', (error) => {
            reject(error);
          });
      });

      // Insert data into MongoDB
      await collection.insertMany(results);
      console.log('Data imported successfully!');
      res.status(200).send('File uploaded and import started.');

    } catch (error) {
      console.error('Error importing data:', error);
      res.status(500).send('Error importing data.');
    } finally {
      await client.close();
      fs.unlinkSync(filePath); // Delete the uploaded file after processing
    }
  });
};
