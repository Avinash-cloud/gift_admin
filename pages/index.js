import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SalesChart from "../components/SalesChart";
import NewUsers from "@/components/NewUsers";
import LatestUsers from '@/components/LatestUsers';
export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex flex-col">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Sales Data</h1>
          <div className="w-full h-96">
            <SalesChart />
          </div>
        </div>

        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Users</h1>
          <NewUsers />
        </div>

        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">New users</h1>
          <LatestUsers />
        </div>
      </div>
    </Layout>
  );
}
