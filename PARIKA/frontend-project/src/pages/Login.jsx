import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/login", { name, password });
            setErrorMsg("");
            navigate("/home", { replace: true });
        } catch (error) {
            if (error.response && error.response.data.error) {
                setErrorMsg(error.response.data.error);
            } else {
                setErrorMsg("Login failed. Please check your credentials and try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
                <h2 className="text-3xl font-semibold mb-6 text-slate-900 text-center">Sign in to CRPMS</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="name"
                        autoComplete="username"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mb-4 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-5 text-center text-slate-600">
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 underline">
                        Create a new account
                    </Link>
                </div>
                {errorMsg && (
                    <p className="text-red-600 mt-5 text-center font-medium" id="message">
                        {errorMsg}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
