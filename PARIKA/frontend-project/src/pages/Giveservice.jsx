import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function GiveServiceForm() {
    const { serviceCode } = useParams();
    const [plateNumber, setPlateNumber] = useState("");
    const [serviceDate, setServiceDate] = useState("");
    const [type, setType] = useState("");
    const [model, setModel] = useState("");
    const [manufacturingYear, setManufacturingYear] = useState("");
    const [driverPhone, setDriverPhone] = useState("");
    const [mechanicName, setMechanicName] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceDetails = {
            plateNumber,
            type,
            model,
            manufacturingYear,
            driverPhone,
            mechanicName,
            ServiceDate: serviceDate,
        };

        try {
            const response = await axios.post(`/give-service/${serviceCode}`, serviceDetails);
            setMessage(response.data.message || "Service delivery recorded successfully.");
            setMessageType("success");
            setPlateNumber("");
            setType("");
            setModel("");
            setManufacturingYear("");
            setDriverPhone("");
            setMechanicName("");
            setServiceDate("");
        } catch (error) {
            console.error("Error giving service:", error);
            setMessage("Failed to record service delivery. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 p-8 shadow-lg">
                <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">
                    Give Service for Code {serviceCode}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Plate Number"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Vehicle Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Manufacturing Year"
                        value={manufacturingYear}
                        onChange={(e) => setManufacturingYear(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Driver Phone"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mechanic Name"
                        value={mechanicName}
                        onChange={(e) => setMechanicName(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
                    >
                        Record Service
                    </button>
                </form>
                {message && (
                    <p className={`mt-5 text-center font-medium ${messageType === "error" ? "text-red-600" : "text-emerald-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default GiveServiceForm;
