// components/LatestUsers.jsx
import { useEffect, useState } from 'react';

const LatestUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust the API endpoint as needed
        const allUsers = await response.json();
        
        // Sorting users by creation date and selecting the latest 5 users
        const latestUsers = allUsers
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setUsers(latestUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md overflow-auto">
      <h2 className="text-xl font-bold mb-4">Latest 5 Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Avatar</th>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-200 text-blue-600 font-bold rounded-full">
                  {user.firstName && user.firstName.charAt(0).toUpperCase()}
                </div>
              </td>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestUsers;
