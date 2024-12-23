import nodemailer from "nodemailer";
import { connectToDatabase } from "@/lib/mongodb copy";
import adminotps from "@/models/adminotps";



const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email provider you prefer
    auth: {
      user: process.env.EMAIL_USER, // Your email (e.g., your email address)
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // List of recipients
    subject: "Your OTP for Admin Panel", // Email subject
    text: `Your OTP is: ${otp}`, // OTP message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending OTP");
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body; // Get email from the request body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
        const { db } = await connectToDatabase();
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Send the OTP via email
      await sendOtpEmail(email, otp);

      // Respond with the OTP (in real implementation, save it in session or database)
      res.status(200).json({ message: "OTP sent successfully" });
      await adminotps.create({otp})
    //   await db.collection('adminotps').insertOne({otp});
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ message: "Failed to send OTP" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
