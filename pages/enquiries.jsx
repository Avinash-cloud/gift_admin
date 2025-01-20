import Layout from '@/components/Layout'
import { useEffect, useState } from "react";
import axios from "axios";
const Enquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        setContacts(response.data.contacts);
      } catch (err) {
        setError("Failed to load contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  return (
    <Layout>
       <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="border px-4 py-2">{contact.firstname}</td>
                <td className="border px-4 py-2">{contact.lastname}</td>
                <td className="border px-4 py-2">{contact.username}</td>
                <td className="border px-4 py-2">{contact.phone}</td>
                <td className="border px-4 py-2">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        
    </Layout>
  )
}

export default Enquiries
