import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/payments')
      .then(response => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
        setError('Failed to load payments.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100">Loading payments...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100"><p className="text-red-600">{error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
        <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">All Payments</h2>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-slate-200 text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount Paid</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Plate Number</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Service Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payments.map((payment, index) => (
                <tr key={payment.PaymentNumber || index} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{payment.PaymentNumber || index + 1}</td>
                  <td className="px-4 py-4">FRW {payment.AmountPaid}</td>
                  <td className="px-4 py-4">{payment.PaymentDate}</td>
                  <td className="px-4 py-4">{payment.PlateNumber || '—'}</td>
                  <td className="px-4 py-4">{payment.ServiceCode || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentsList;
