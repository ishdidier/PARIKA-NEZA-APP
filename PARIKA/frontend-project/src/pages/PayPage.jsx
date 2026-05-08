import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PayPage() {
    const { serviceCode, price, plateNumber } = useParams();
    const [paymentDate, setPaymentDate] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/payments", {
                AmountPaid: Number(price),
                PaymentDate: paymentDate,
                PlateNumber: plateNumber,
                ServiceCode: serviceCode,
            });

            setMessage("Payment recorded successfully.");
            setMessageType("success");
            setTimeout(() => {
                navigate("/payments", { replace: true });
            }, 1200);
        } catch (error) {
            console.error("Payment failed:", error);
            setMessage("Failed to record payment. Please try again.");
            setMessageType("error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Confirm Payment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-700 mb-2">Service Code</label>
                        <input
                            type="text"
                            value={serviceCode}
                            disabled
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 mb-2">Price</label>
                        <input
                            type="text"
                            value={`FRW ${price}`}
                            disabled
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 mb-2">Plate Number</label>
                        <input
                            type="text"
                            value={plateNumber}
                            disabled
                            className="w-full rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 mb-2">Payment Date</label>
                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white p-3"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Confirm Payment
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

export default PayPage;
