// components/NewUsers.jsx
import { useEffect, useState } from 'react';

const NewUsers = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust the API endpoint as needed
        const users = await response.json();

        let todayUserCount = 0;
        let weekUserCount = 0;
        let monthUserCount = 0;

        const today = new Date();
        const startOfWeek = new Date();
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        users.forEach((user) => {
          const userDate = new Date(user.createdAt);

          // Today's user count
          if (
            userDate.getDate() === today.getDate() &&
            userDate.getMonth() === today.getMonth() &&
            userDate.getFullYear() === today.getFullYear()
          ) {
            todayUserCount++;
          }

          // Weekly user count
          if (userDate >= startOfWeek && userDate <= today) {
            weekUserCount++;
          }

          // Monthly user count
          if (userDate >= startOfMonth && userDate <= today) {
            monthUserCount++;
          }
        });

        setTodayCount(todayUserCount);
        setWeeklyCount(weekUserCount);
        setMonthlyCount(monthUserCount);
      } catch (error) {
        console.error('Failed to fetch new users:', error);
      }
    };

    fetchNewUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-100 p-4 rounded shadow-md text-center">
          <h2 className="text-xl font-bold">Today &apos; s New Users</h2>
          <p className="text-2xl">{todayCount}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded shadow-md text-center">
          <h2 className="text-xl font-bold">This Week &apos; s New Users</h2>
          <p className="text-2xl">{weeklyCount}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow-md text-center">
          <h2 className="text-xl font-bold">This Month &apos; s New Users</h2>
          <p className="text-2xl">{monthlyCount}</p>
        </div>
      </div>
    </div>
  );
};

export default NewUsers;
