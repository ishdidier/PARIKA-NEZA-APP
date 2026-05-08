import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const [loading, setLoading] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const { serviceCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/update-service/${serviceCode}`)
      .then((response) => {
        setServiceName(response.data.ServiceName || '');
        setServicePrice(response.data.ServicePrice || '');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to load service data.");
        setMessageType('error');
        setLoading(false);
      });
  }, [serviceCode]);

  const handleUpdateService = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/update-service/${serviceCode}`, {
        ServiceName: serviceName,
        ServicePrice: Number(servicePrice),
      });
      setMessage("Service updated successfully.");
      setMessageType('success');
      setTimeout(() => {
        navigate("/add-service", { replace: true });
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update service.");
      setMessageType('error');
    }
  };

  if (loading) {
    return <h2 className="min-h-screen flex items-center justify-center">Loading service data...</h2>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Update Service {serviceCode}</h2>
        <form onSubmit={handleUpdateService} className="space-y-4">
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
            className="w-full rounded-2xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
        {message && (
          <p className={`mt-5 text-center font-medium ${messageType === 'error' ? 'text-red-600' : 'text-emerald-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Update;
