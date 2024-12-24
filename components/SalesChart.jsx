// components/SalesChart.jsx
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const [todaySales, setTodaySales] = useState(0);
    const [weeklySales, setWeeklySales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(0);

    const [todayCount, setTodayCount] = useState(0);
    const [weeklyCount, setWeeklyCount] = useState(0);
    const [monthlyCount, setMonthlyCount] = useState(0);

    // Canceled sales data
    const [canceledTodaySales, setCanceledTodaySales] = useState(0);
    const [canceledWeeklySales, setCanceledWeeklySales] = useState(0);
    const [canceledMonthlySales, setCanceledMonthlySales] = useState(0);

    const [canceledCount, setCanceledCount] = useState(0);

    // Net sales data (Overall - Canceled)
    const [netTodaySales, setNetTodaySales] = useState(0);
    const [netWeeklySales, setNetWeeklySales] = useState(0);
    const [netMonthlySales, setNetMonthlySales] = useState(0);

    const [netTodayCount, setNetTodayCount] = useState(0);
    const [netWeeklyCount, setNetWeeklyCount] = useState(0);
    const [netMonthlyCount, setNetMonthlyCount] = useState(0);

    // Order status counts
    const [deliveredCount, setDeliveredCount] = useState(0);

    // Sales data for chart
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch('/api/orders'); // Adjust the API endpoint as needed
                const orders = await response.json();

                // Initialize variables for calculations
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

                let canceledTodayTotal = 0;
                let canceledWeekTotal = 0;
                let canceledMonthTotal = 0;

                let canceledOrderCountTotal = 0;

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

                    // Process only the orders from the current year
                    if (orderDate.getFullYear() === currentYear) {
                        const month = orderDate.getMonth(); // 0 - 11
                        order.cart.forEach((item) => {
                            const orderValue = item.discountedPrice * item.quantity;

                            // Monthly sales calculation
                            monthlySales[month] += orderValue;

                            // Sales calculations for overall data
                            if (
                                orderDate.getDate() === today.getDate() &&
                                orderDate.getMonth() === today.getMonth() &&
                                orderDate.getFullYear() === today.getFullYear()
                            ) {
                                todayTotal += orderValue;
                                todayOrderCount++;
                            }

                            if (orderDate >= startOfWeek && orderDate <= today) {
                                weekTotal += orderValue;
                                weekOrderCount++;
                            }

                            if (orderDate >= startOfMonth && orderDate <= today) {
                                monthTotal += orderValue;
                                monthOrderCount++;
                            }

                            // Sales calculations for canceled orders
                            if (order.status === 'canceled') {
                                if (
                                    orderDate.getDate() === today.getDate() &&
                                    orderDate.getMonth() === today.getMonth() &&
                                    orderDate.getFullYear() === today.getFullYear()
                                ) {
                                    canceledTodayTotal += orderValue;
                                    canceledOrderCountTotal++;
                                }

                                if (orderDate >= startOfWeek && orderDate <= today) {
                                    canceledWeekTotal += orderValue;
                                }

                                if (orderDate >= startOfMonth && orderDate <= today) {
                                    canceledMonthTotal += orderValue;
                                }
                            }
                        });
                    }
                });

                // Set the state values
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

                // Setting overall and net sales data
                setTodaySales(todayTotal);
                setWeeklySales(weekTotal);
                setMonthlySales(monthTotal);

                setTodayCount(todayOrderCount);
                setWeeklyCount(weekOrderCount);
                setMonthlyCount(monthOrderCount);

                setDeliveredCount(deliveredOrderCount);
                setCanceledCount(canceledOrderCount);

                // Setting canceled sales data
                setCanceledTodaySales(canceledTodayTotal);
                setCanceledWeeklySales(canceledWeekTotal);
                setCanceledMonthlySales(canceledMonthTotal);

                // Net sales calculations (Overall - Canceled)
                setNetTodaySales(todayTotal - canceledTodayTotal);
                setNetWeeklySales(weekTotal - canceledWeekTotal);
                setNetMonthlySales(monthTotal - canceledMonthTotal);

                // Net order counts (Overall - Canceled)
                setNetTodayCount(todayOrderCount - canceledOrderCountTotal);
                setNetWeeklyCount(weekOrderCount - canceledOrderCountTotal);
                setNetMonthlyCount(monthOrderCount - canceledOrderCountTotal);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {/* Card for Today's Sales */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">Today&apos;s Sales</h2>
                <p className="text-3xl font-bold text-gray-800">Total ₹{todaySales}</p>
                <p className="text-xl text-red-500 mt-1">Canceled ₹{canceledTodaySales}</p>
                <p className="text-xl text-green-500 mt-1">Net ₹{netTodaySales}</p>
                <p className="text-sm text-gray-600 mt-2">Count: {todayCount}</p>
            </div>

            {/* Card for Weekly Sales */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-green-600 mb-2">Weekly Sales</h2>
                <p className="text-3xl font-bold text-gray-800">Total ₹{weeklySales}</p>
                <p className="text-xl text-red-500 mt-1">Canceled ₹{canceledWeeklySales}</p>
                <p className="text-xl text-green-500 mt-1">Net ₹{netWeeklySales}</p>
                <p className="text-sm text-gray-600 mt-2">Count: {weeklyCount}</p>
            </div>

            {/* Card for Monthly Sales */}
            <div className="bg-yellow-50 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Monthly Sales</h2>
                <p className="text-3xl font-bold text-gray-800">Total ₹{monthlySales}</p>
                <p className="text-xl text-red-500 mt-1">Canceled ₹{canceledMonthlySales}</p>
                <p className="text-xl text-green-500 mt-1">Net ₹{netMonthlySales}</p>
                <p className="text-sm text-gray-600 mt-2">Count: {monthlyCount}</p>
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
