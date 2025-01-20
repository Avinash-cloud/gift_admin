import Layout from "@/components/Layout";
import axios from "axios";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";


export default function Setting() {
  const [isOtpSent, setIsOtpSent] = useState(false); // Tracks OTP sent status
  const [email, setEmail] = useState("avipurohit27@gmail.com"); // Email input
  const [otp, setOtp] = useState(""); // OTP input
  const [sentOtp, setSentOtp] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const logout = async()=> {
    await signOut({ callbackUrl: '/' });
  }

  const handleSubmit = async (e) => {
    console.log("called");
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post("/api/reset-password", {
        otp: otp,
        newPassword: newPassword,
      });
  
      if (response.status === 200) { // Ensure the API call was successful
        setMessage("Password changed successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
  
        // Call the logout function after successful password change
        await logout();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };
  

  //   const sendOtpToEmail = (email) => {
  //     console.log(`Sending OTP to ${email}`); // Simulate OTP sending
  //     return Math.floor(100000 + Math.random() * 900000); // Return a random OTP for demonstration
  //   };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("OTP sent:");
        setIsOtpSent(true);
        // Handle the OTP sent response (e.g., toggle the form or notify the user)
        setLoading(false)
      } else {
        console.error("Error:", data.message);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false)
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
          {!isOtpSent ? (
            <div>
              <button
                onClick={handleSendOtp}
                className={`w-full py-2 mt-4 rounded-md transition ${
                  loading
                    ? "bg-blue-300"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={loading} // Disables the button while loading
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.963 7.963 0 01-2-5.291H0c0 2.402.946 4.574 2.493 6.207l1.507-1.207z"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Change Password"
                )}
              </button>

              {message && (
                <p className="text-center text-sm text-red-600 mt-2">
                  {message}
                </p>
              )}
            </div>
          ) : (
            // OTP and password change form
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {message && (
                <p
                  className={`text-center text-sm ${
                    message.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
