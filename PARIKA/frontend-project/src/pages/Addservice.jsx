import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddService() {
    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [message, setMessage] = useState("");
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        try {
            const response = await axios.get("/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
            setMessage("Unable to load services.");
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddService = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/add-services", {
                serviceName,
                servicePrice: Number(servicePrice),
            });
            setMessage("Service added successfully!");
            setServiceName("");
            setServicePrice("");
            fetchServices();
        } catch (error) {
            if (error.response && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Failed to add service.");
            }
        }
    };

    const handleDelete = async (serviceCode) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        try {
            await axios.delete(`/services/${serviceCode}`);
            setMessage("Service deleted successfully!");
            fetchServices();
        } catch (error) {
            setMessage("Failed to delete service.");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-semibold text-slate-900">Add New Service</h2>
                        <p className="text-slate-600 mt-2">Add a new service type and manage the service catalog from this page.</p>
                    </div>
                    <form onSubmit={handleAddService} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Service Name"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Service Price"
                            value={servicePrice}
                            onChange={(e) => setServicePrice(e.target.value)}
                            className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition"
                        >
                            Add Service
                        </button>
                    </form>
                    {message && (
                        <p className="text-center text-slate-700 mt-4">{message}</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Current Services</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50 text-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Service Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                                {services.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-5 text-center">No services available.</td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.ServiceCode}>
                                            <td className="px-4 py-4">{service.ServiceCode}</td>
                                            <td className="px-4 py-4">{service.ServiceName}</td>
                                            <td className="px-4 py-4">FRW {service.ServicePrice}</td>
                                            <td className="px-4 py-4 space-x-3">
                                                <button
                                                    onClick={() => handleDelete(service.ServiceCode)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                                <Link to={`/update-service/${service.ServiceCode}`} className="text-blue-600 hover:underline">
                                                    Update
                                                </Link>
                                                <Link to={`/give/${service.ServiceCode}`} className="text-green-600 hover:underline">
                                                    Give Service
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
    );
}

export default AddService;
