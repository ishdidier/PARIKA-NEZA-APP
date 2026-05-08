import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchServices = async () => {
        try {
            const response = await axios.get("/service-record");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
            setError("Unable to load service records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                    <h3 className="text-3xl font-semibold text-slate-900 mb-4">Service Records</h3>
                    <p className="text-slate-600 mb-6">Review all recorded service activity, including payment and vehicle linkage.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-slate-700">
                            <thead className="bg-slate-50 text-slate-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Plate Number</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-slate-500">Loading service records...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-red-600">{error}</td>
                                    </tr>
                                ) : services.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-6 text-center text-slate-500">No service records available.</td>
                                    </tr>
                                ) : (
                                    services.map((service) => (
                                        <tr key={service.ServiceCode}>
                                            <td className="px-4 py-4">{service.ServiceCode}</td>
                                            <td className="px-4 py-4">{service.ServiceName || "N/A"}</td>
                                            <td className="px-4 py-4">{service.PlateNumber || "—"}</td>
                                            <td className="px-4 py-4">FRW {service.ServicePrice}</td>
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/pay/${service.ServiceCode}/${service.ServicePrice}/${service.PlateNumber || ""}`}
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Pay
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

export default ServiceList;
