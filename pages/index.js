import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SalesChart from "../components/SalesChart";
import NewUsers from "@/components/NewUsers";
import LatestUsers from "@/components/LatestUsers";
import axios from "axios";
export default function Home() {
  const { data: session } = useSession();

  const [latestOrders, setLatestOrders] = useState([]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        const sortedOrders = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt
          .slice(0, 5); // Get the latest 5 orders
        setLatestOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="text-blue-900 flex flex-col">
        <h2 className="text-lg md:text-xl lg:text-2xl">
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <div className="container mx-auto p-4">
          <h1 className="text-xl md:text-2xl font-bold">Sales Data</h1>
          <div className="w-full h-64 max-sm:mb-28">
            <SalesChart />
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-6 mt-12 md:mt-96 lg:mt-96">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 mt-28 ">Users</h1>
          <NewUsers />
        </div>
        

        <div className="container mx-auto p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">New Users</h1>
          <LatestUsers />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Latest 5 Orders</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.buyer_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
