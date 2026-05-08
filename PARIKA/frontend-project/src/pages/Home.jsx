import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Welcome to CRPMS</h2>
                    <p className="text-slate-700 leading-7">
                        Manage cars, track service records, handle payments, and view reports from a single consolidated dashboard.
                        The application delivers clear workflows for service scheduling, payment confirmation, and performance review.
                    </p>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
                <Link
                    to="/cars"
                    className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Car Registry</h3>
                    <p className="text-slate-600">Review vehicle details, service history, and ownership data for all managed cars.</p>
                </Link>
                <Link
                    to="/car-record"
                    className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Service Records</h3>
                    <p className="text-slate-600">Track completed work and open service requests with clear action links.</p>
                </Link>
                <Link
                    to="/payments"
                    className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Payments</h3>
                    <p className="text-slate-600">Manage payments, view recent transactions, and confirm outstanding charges.</p>
                </Link>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-slate-900">Fast actions</h3>
                        <p className="text-slate-600">Use the links below to move quickly through core tasks without switching tools.</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link to="/add-service" className="rounded-xl bg-blue-600 px-4 py-3 text-white text-sm font-semibold text-center hover:bg-blue-700 transition">Add New Service</Link>
                            <Link to="/report" className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 text-sm font-semibold text-center hover:bg-slate-100 transition">View Reports</Link>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3">What you can do</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li>Maintain car profiles and service assignments.</li>
                            <li>Record service delivery details with mechanic and driver information.</li>
                            <li>Capture payments and inspect revenue performance.</li>
                            <li>Generate daily, weekly, monthly, and yearly service summaries.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
