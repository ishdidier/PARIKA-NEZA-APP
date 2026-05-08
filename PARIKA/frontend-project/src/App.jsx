import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import AddService from './pages/Addservice';
import Home from './pages/Home';
import GiveServiceForm from './pages/Giveservice';
import ServiceList from './pages/ServiceList';
import PayPage from "./pages/PayPage";
import ReportPage from "./pages/ReportPage";
import Protect from './pages/Protect';
import Update from './pages/UpdateService';
import PaymentsList from './pages/Payment';
import CarServiceList from './pages/Car';

axios.defaults.baseURL = "http://localhost:2005";
axios.defaults.withCredentials = true;

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/", { replace: true });
    }
  };

  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 transition ${isActive ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-100"}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-600 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">CRPMS</h1>
          <p className="text-sm text-blue-100">Car service management, payments, and reports in one place.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-white text-blue-600 px-4 py-2 font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          Sign Out
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-72 bg-white border-t border-b md:border-r md:border-b-0 border-slate-200 p-6">
          <nav className="space-y-2">
            <NavLink to="/home" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/cars" className={navLinkClass}>Cars</NavLink>
            <NavLink to="/car-record" className={navLinkClass}>Service Records</NavLink>
            <NavLink to="/add-service" className={navLinkClass}>Service Catalog</NavLink>
            <NavLink to="/payments" className={navLinkClass}>Payments</NavLink>
            <NavLink to="/report" className={navLinkClass}>Reports</NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <Protect>
              <DashboardLayout />
            </Protect>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/car-record" element={<ServiceList />} />
          <Route path="/update-service/:serviceCode" element={<Update />} />
          <Route path="/give/:serviceCode" element={<GiveServiceForm />} />
          <Route path="/pay/:serviceCode/:price/:plateNumber" element={<PayPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/cars" element={<CarServiceList />} />
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/dashboard" element={<Home />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
              <div className="max-w-md bg-white p-8 rounded-lg shadow-md border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Page not found</h2>
                <p className="text-slate-700 mb-6">The page you requested does not exist. Use the navigation to continue.</p>
                <NavLink to="/home" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Back to Dashboard
                </NavLink>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
