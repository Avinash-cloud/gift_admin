import React, { useState, useEffect} from 'react';
import { signIn } from "next-auth/react";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [loading, SetLoading] = useState(false)

    const handleSubmit = async (e) => {
        SetLoading(true)
        e.preventDefault();
        // Add your login logic here
        if (!email || !password) {
            setError('Please fill in both fields.');
            SetLoading(false)
            return;
        }
        
       
            // Simulate backend authentication (replace with actual backend call)
            // For demonstration purposes, assume login is successful
            ////console.log('Username:', username);
            // //console.log('Password:', password);

            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            //console.log(res);


            if (res?.error) {

                // alert("Something Went Wrong! Invalid Email or Password")
                setError("Something Went Wrong! Invalid Email or Password");
                SetLoading(false)
                setRedirectToHome(false);
            } else {

                // alert on successful registration
                alert("Login Succesful!")
                // Set state to trigger redirection
                SetLoading(false)
                setRedirectToHome(true);
            }

            // Simulate successful login
            // alert("Login Successful!");


        
    };

    useEffect(() => {
        if (redirectToHome) {
            // Redirect to home page after successful login
            window.location.href = '/'; // Replace with your desired URL
        }
    }, [redirectToHome]);
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md rounded-lg bg-white shadow-xl p-6 space-y-8">
                    <img src="/favicon.ico" alt="Admin Logo" height={80} width={80} className="mx-auto" />

                    <h2 className="text-center text-3xl font-bold text-gray-800">Admin Portal</h2>
                    <p className="text-center text-sm text-gray-500">Sign in with your admin credentials</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <p className="text-center text-red-500 text-sm">{error}</p>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Admin Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full p-3 rounded-md font-semibold transition ease-in-out duration-150 ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                                } text-white`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
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
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                'Sign In as Admin'
                            )}
                        </button>

                        <div className="text-center text-sm text-gray-500">
                            <p>Not an admin? <a href="http://internationalgift.in/" className="text-red-600 hover:underline">Go back to Home</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}