'use client'
import Layout from '@/components/Layout'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EditIcon } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // import the styles
import 'react-date-range/dist/theme/default.css'; // import the theme

const Index = () => {
    const [blog, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState({
        startDate: new Date('2024-01-01'),
        endDate: new Date(),
        key: 'selection'
    });

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            // Simulated data from an API
            const res = await fetch(`/api/blogs`);
            const result = await res.json();
            if (result.success) {
                setBlogs(result.data);
                setFilteredBlogs(result.data);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter blog based on search term and date range
        const filtered = blog
            .filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
            .filter(blog => {
                const blogDate = new Date(formatDate(blog.createdAt)); // Assuming `date` is a field in your blog data
                return blogDate >= dateRange.startDate && blogDate <= dateRange.endDate;
            });
        setFilteredBlogs(filtered);
    }, [search, dateRange, blog]);


    const truncateTitle = (title) => {
        if (title.length > 20) {
            return title.substring(0, 20) + '...';
        }
        return title;
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleShowAll = () => {
        setDateRange({
            startDate: new Date('2024-01-01'),
            endDate: new Date(),
            key: 'selection'
        });
        setSearch('');
    };

    const pageCount = Math.ceil(filteredBlogs.length / rowsPerPage);
    const displayedBlogs = filteredBlogs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <Layout>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 w-auto mt-10">
                <div>
                    <h2 className=" font-semibold text-3xl">Blog</h2>
                    <p className="mt-1 text-sm text-gray-700">
                        This is a list of all Blog. You can add new Blog, edit or delete existing ones.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link className="w-60 justify-center bg-green-600 text-white rounded-md text-center my-auto p-3" href={'/blog/new'}>Add new Blog</Link>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by title"
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                    <button
                        onClick={handleShowAll}
                        className="rounded-md bg-green-500  text-sm text-white hover:bg-green-600 w-40"
                    >
                        Show All
                    </button>
                </div>
            </div>

            <section className="px-4 py-4">
                <div className="mt-6 p-4 overflow-x-auto">
                    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="p-4 m-4 w-11/12 flex justify-center border border-gray-200 md:rounded-lg">
                                <table className="w-11/12 divide-y divide-gray-200 table-fixed max-md:table-auto">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                <span>Card / Background image</span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                Author
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                            >
                                                View
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {displayedBlogs.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-500">
                                                    No data available
                                                </td>
                                            </tr>
                                        ) : (
                                            displayedBlogs.map((blog) => (
                                                <tr key={blog.title} className="divide-x divide-gray-200">
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={blog.cardImage}
                                                                    alt=""
                                                                />
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900">
                                                            {blog.title.length > 15 ? blog.title.slice(0, 15) + '...' : blog.title}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        Admin
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                                        <div className="text-sm text-gray-900">
                                                            <Link href={'/blog/view/' + blog.title}>{truncateTitle(blog.title)}</Link>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium flex justify-evenly">
                                                        <Link href={'/blog/edit/' + blog.url} className="text-gray-500 text-indigo-700 hover:text-indigo-300 flex justify-evenly">
                                                            <EditIcon className="mr-2" />
                                                            Edit
                                                        </Link>
                                                        <Link href={'/blog/delete/' + blog.url} className="text-gray-500 text-red-700 hover:text-red-300 flex">
                                                            <MdDelete size={20} className="mr-2" />
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <label htmlFor="rowsPerPage" className="mr-2 w-52">Rows per page:</label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-md bg-gray-300 px-3 py-2 text-sm"
                        >
                            Previous
                        </button>
                        <span className="mx-2">{currentPage} / {pageCount}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pageCount}
                            className="rounded-md bg-gray-300 px-3 py-2 text-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <DateRangePicker
                        ranges={[dateRange]}
                        onChange={(item) => setDateRange(item.selection)}
                        months={1}
                        direction="horizontal"
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm float float-end w-full gap-96"
                    />
                </div>
            </section>


        </Layout>
    )
}

export default Index
