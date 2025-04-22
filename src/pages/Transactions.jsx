// Updated User Transaction Page with Fixes & Improvements
import React, { useEffect, useState } from 'react';
import { Wallet, Search, Download, Eye } from 'lucide-react';
import api from "../utils/api";

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [viewTxn, setViewTxn] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/user/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filtered = transactions.filter(txn =>
    txn.type?.toLowerCase().includes(search.toLowerCase()) ||
    txn.status?.toLowerCase().includes(search.toLowerCase()) ||
    txn.reference?.toLowerCase().includes(search.toLowerCase())
  );

  const statusClass = (status) => {
    const value = status?.toLowerCase();
    if (value === 'success') return 'text-green-700';
    if (value === 'refunded') return 'text-red-600 font-semibold';
    if (value === 'failed') return 'text-red-500 font-semibold';
    return 'text-yellow-700';
  };

  const downloadReceipt = (txn) => {
    const receiptText = `Receipt\nReference: ${txn.reference}\nType: ${txn.type}\nAmount: ₦${txn.amount}\nStatus: ${txn.status}\nDate: ${new Date(txn.created_at).toLocaleString()}\nRecipient: ${txn.recipient || 'N/A'}`;
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${txn.reference}_receipt.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <Wallet size={20} /> My Transactions
        </h1>

        <div className="mb-4 flex items-center border px-2 rounded w-full">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            className="w-full p-2 focus:outline-none"
            placeholder="Search type, status, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <p className="text-center p-4 text-gray-500">Loading transactions...</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn) => (
                  <tr key={txn.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">₦{parseFloat(txn.amount).toLocaleString()}</td>
                    <td>{txn.type}</td>
                    <td className={statusClass(txn.status)}>{txn.status}</td>
                    <td>{new Date(txn.created_at).toLocaleString()}</td>
                    <td className="flex justify-center gap-2">
                      <button onClick={() => setViewTxn(txn)} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                        <Eye size={14} /> View
                      </button>
                      <button onClick={() => downloadReceipt(txn)} className="text-green-600 hover:underline text-xs flex items-center gap-1">
                        <Download size={14} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-gray-400 p-4">No transactions found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {viewTxn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
              <h2 className="text-lg font-bold text-blue-800 mb-4">Transaction Details</h2>
              <p><strong>Reference:</strong> {viewTxn.reference}</p>
              <p><strong>Type:</strong> {viewTxn.type}</p>
              <p><strong>Amount:</strong> ₦{parseFloat(viewTxn.amount).toLocaleString()}</p>
              <p><strong>Status:</strong> {viewTxn.status}</p>
              <p><strong>Date:</strong> {new Date(viewTxn.created_at).toLocaleString()}</p>
              <p><strong>Recipient:</strong> {viewTxn.recipient || 'N/A'}</p>
              <button onClick={() => setViewTxn(null)} className="absolute top-2 right-3 text-red-500 hover:text-red-700">✕</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
