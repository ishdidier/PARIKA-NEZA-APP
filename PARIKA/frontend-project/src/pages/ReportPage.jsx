import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportPage() {
    const [reportType, setReportType] = useState("daily");
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchReport = async (type) => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/report/${type}`);
            setReportData(response.data);
        } catch (error) {
            console.error("Error fetching report:", error);
            setReportData([]);
            setError("Unable to load report data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport(reportType);
    }, [reportType]);

    const handleChange = (e) => {
        setReportType(e.target.value);
    };

    const renderPeriod = (item) => {
        switch (reportType) {
            case "daily":
                return item.Period || "Daily";
            case "weekly":
                return item.Week ? `Week ${item.Week}, ${item.Year}` : "Weekly";
            case "monthly":
                return item.Month ? `Month ${item.Month}, ${item.Year}` : "Monthly";
            case "yearly":
                return item.Year || "Yearly";
            default:
                return "N/A";
        }
    };

    const totalServices = reportData.reduce((acc, item) => acc + Number(item.TotalServices || 0), 0);
    const totalRevenue = reportData.reduce((acc, item) => acc + Number(item.TotalRevenue || 0), 0).toFixed(2);

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Service Report</h2>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                    <p className="text-slate-600 max-w-2xl">
                        Select the report period below to review service volume and revenue performance over time.
                    </p>
                    <select
                        value={reportType}
                        onChange={handleChange}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="daily">Daily Report</option>
                        <option value="weekly">Weekly Report</option>
                        <option value="monthly">Monthly Report</option>
                        <option value="yearly">Yearly Report</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-slate-700">
                        <thead className="bg-slate-50 text-slate-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Period</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Total Services</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-4 py-6 text-center text-slate-500">Loading report...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="3" className="px-4 py-6 text-center text-red-600">{error}</td>
                                </tr>
                            ) : reportData.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-4 py-6 text-center text-slate-500">No data found for the selected period.</td>
                                </tr>
                            ) : (
                                reportData.map((item, idx) => (
                                    <tr key={idx} className="even:bg-slate-50">
                                        <td className="px-4 py-4">{renderPeriod(item)}</td>
                                        <td className="px-4 py-4">{item.TotalServices || 0}</td>
                                        <td className="px-4 py-4">FRW {Number(item.TotalRevenue || 0).toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {reportData.length > 0 && (
                    <div className="mt-8 rounded-3xl bg-slate-50 p-6">
                        <h3 className="text-xl font-semibold text-slate-900 mb-3">Summary</h3>
                        <div className="grid gap-4 md:grid-cols-2 text-slate-700">
                            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500">Total Services</p>
                                <p className="mt-2 text-2xl font-semibold">{totalServices}</p>
                            </div>
                            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                                <p className="text-sm text-slate-500">Total Revenue</p>
                                <p className="mt-2 text-2xl font-semibold">FRW {totalRevenue}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportPage;
