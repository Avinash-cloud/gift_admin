// components/SalesChart.jsx
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const [salesData, setSalesData] = useState(null);
    const [todaySales, setTodaySales] = useState(0);
    const [weeklySales, setWeeklySales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(0);

    const [todayCount, setTodayCount] = useState(0);
    const [weeklyCount, setWeeklyCount] = useState(0);
    const [monthlyCount, setMonthlyCount] = useState(0);

    const [deliveredCount, setDeliveredCount] = useState(0);
    const [canceledCount, setCanceledCount] = useState(0);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch('/api/orders'); // Adjust the API endpoint as needed
                const orders = await response.json();

                // Process data to get monthly, today's, and weekly sales
                const monthlySales = new Array(12).fill(0);
                const currentYear = new Date().getFullYear();
                let todayTotal = 0;
                let weekTotal = 0;
                let monthTotal = 0;

                let todayOrderCount = 0;
                let weekOrderCount = 0;
                let monthOrderCount = 0;

                let deliveredOrderCount = 0;
                let canceledOrderCount = 0;

                const today = new Date();
                const startOfWeek = new Date();
                startOfWeek.setDate(today.getDate() - today.getDay());
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

                orders.forEach((order) => {
                    const orderDate = new Date(order.createdAt);

                    if (order.status === 'Delivered') {
                        deliveredOrderCount++;
                    } else if (order.status === 'canceled') {
                        canceledOrderCount++;
                    }

                    if (orderDate.getFullYear() === currentYear) {
                        const month = orderDate.getMonth(); // 0 - 11
                        order.cart.forEach((item) => {
                            const orderValue = item.discountedPrice * item.quantity;

                            // Monthly sales calculation
                            monthlySales[month] += orderValue;

                            // Today's sales calculation
                            if (
                                orderDate.getDate() === today.getDate() &&
                                orderDate.getMonth() === today.getMonth() &&
                                orderDate.getFullYear() === today.getFullYear()
                            ) {
                                todayTotal += orderValue;
                                todayOrderCount++;
                            }

                            // Weekly sales calculation
                            if (orderDate >= startOfWeek && orderDate <= today) {
                                weekTotal += orderValue;
                                weekOrderCount++;
                            }

                            // Monthly sales calculation
                            if (orderDate >= startOfMonth && orderDate <= today) {
                                monthTotal += orderValue;
                                monthOrderCount++;
                            }
                        });
                    }
                });

                setSalesData({
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Monthly Sales (in ₹)',
                            data: monthlySales,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                setTodaySales(todayTotal);
                setWeeklySales(weekTotal);
                setMonthlySales(monthTotal);

                setTodayCount(todayOrderCount);
                setWeeklyCount(weekOrderCount);
                setMonthlyCount(monthOrderCount);

                setDeliveredCount(deliveredOrderCount);
                setCanceledCount(canceledOrderCount);
            } catch (error) {
                console.error('Failed to fetch sales data:', error);
            }
        };

        fetchSalesData();
    }, []);;


    if (!salesData) {
        return <p>Loading...</p>;
    }

    return (<>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded shadow-md text-center">
                <h2 className="text-xl font-bold">Today &apos;s Sales</h2>
                <p className="text-2xl">₹{todaySales}</p>
                <p className="text-sm">Count: {todayCount}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow-md text-center">
                <h2 className="text-xl font-bold">Weekly Sales</h2>
                <p className="text-2xl">₹{weeklySales}</p>
                <p className="text-sm">Count: {weeklyCount}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow-md text-center">
                <h2 className="text-xl font-bold">Monthly Sales</h2>
                <p className="text-2xl">₹{monthlySales}</p>
                <p className="text-sm">Count: {monthlyCount}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-teal-100 p-4 rounded shadow-md text-center">
                <h2 className="text-xl font-bold">Delivered Orders</h2>
                <p className="text-2xl">{deliveredCount}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow-md text-center">
                <h2 className="text-xl font-bold">Canceled Orders</h2>
                <p className="text-2xl">{canceledCount}</p>
            </div>
        </div>

        <Bar data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />

    </>);
};

export default SalesChart;
