import {mongooseConnect} from "@/lib/mongoose";// Utility for connecting to MongoDB
import Contact from "@/models/contact"; // Import the model

export default async function handler(req, res) {
  await mongooseConnect(); // Ensure database connection

  if (req.method === 'POST') {
    try {
      const { firstname, lastname, username, phone, message } = req.body;

      // Validate input
      if (!firstname || !lastname || !username || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Create a new contact document
      const newContact = new Contact({
        firstname,
        lastname,
        username,
        phone,
        message,
      });

      // Save the contact in the database
      const savedContact = await newContact.save();
      return res.status(201).json({ message: 'Contact saved successfully!', contact: savedContact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const contacts = await Contact.find(); // Fetch all contacts from the database
      return res.status(200).json({ contacts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle non-POST, non-GET methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
