import React, { useState, useEffect } from "react";
import axios from "axios";

function CarServiceList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/cars-with-services")
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        setError("Unable to load car records.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100">Loading cars...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
        <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Cars and Service Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Plate Number</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Model</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Driver Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Mechanic</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Service Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cars.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-center text-slate-500">No car records available.</td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.PlateNumber || car.RecordNumber || Math.random()} className="even:bg-slate-50">
                    <td className="px-4 py-4">{car.PlateNumber || '—'}</td>
                    <td className="px-4 py-4">{car.Type || '—'}</td>
                    <td className="px-4 py-4">{car.Model || '—'}</td>
                    <td className="px-4 py-4">{car.ManufacturingYear || '—'}</td>
                    <td className="px-4 py-4">{car.DriverPhone || '—'}</td>
                    <td className="px-4 py-4">{car.MechanicName || '—'}</td>
                    <td className="px-4 py-4">
                      {car.ServiceDate ? (
                        <div className="space-y-1 text-slate-600">
                          <div><span className="font-semibold text-slate-900">Code:</span> {car.ServiceCode || '—'}</div>
                          <div><span className="font-semibold text-slate-900">Date:</span> {car.ServiceDate}</div>
                          {car.RecordNumber && <div><span className="font-semibold text-slate-900">Record:</span> {car.RecordNumber}</div>}
                        </div>
                      ) : (
                        <span className="text-slate-500">No service record</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CarServiceList;
