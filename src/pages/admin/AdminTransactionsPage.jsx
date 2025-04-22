// AdminTransactions.jsx - Full Updated with Filters + Requery + Refund + Pagination
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Eye, RefreshCcw, RotateCcw, Download } from 'lucide-react';

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [viewTxn, setViewTxn] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const txnsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/admin/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTransactions(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearch(term);
    const q = term.toLowerCase();
    setFiltered(transactions.filter(txn =>
      txn.reference?.toLowerCase().includes(q) ||
      txn.type?.toLowerCase().includes(q) ||
      txn.status?.toLowerCase().includes(q) ||
      txn.recipient?.toLowerCase().includes(q)
    ));
    setCurrentPage(1);
  };

  const requeryTransaction = (ref) => {
    alert('Requerying: ' + ref);
    // Implement backend endpoint: /admin/transactions/requery/:reference
  };

  const refundTransaction = (ref) => {
    alert('Refunding: ' + ref);
    // Implement backend endpoint: /admin/transactions/refund/:reference
  };

  const paginated = filtered.slice((currentPage - 1) * txnsPerPage, currentPage * txnsPerPage);

  const statusClass = (status) => {
    const value = status?.toLowerCase();
    if (value === 'success') return 'text-green-700';
    if (value === 'refunded') return 'text-red-600 font-semibold';
    if (value === 'failed') return 'text-red-500 font-semibold';
    return 'text-yellow-700';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Admin Transaction Logs</h1>
      <div className="mb-4 flex items-center border px-2 rounded w-full max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          className="w-full p-2 focus:outline-none"
          placeholder="Search reference, type, status, recipient..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <p className="text-center p-4 text-gray-500">Loading transactions...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">User</th>
                <th>Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Ref</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(txn => (
                <tr key={txn.id} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-2">{txn.user?.name || 'N/A'}</td>
                  <td>{txn.type}</td>
                  <td className={statusClass(txn.status)}>{txn.status}</td>
                  <td>₦{parseFloat(txn.amount).toLocaleString()}</td>
                  <td>{new Date(txn.created_at).toLocaleString()}</td>
                  <td className="text-xs">{txn.reference}</td>
                  <td className="flex justify-center gap-2">
                    <button onClick={() => setViewTxn(txn)} className="text-blue-600 hover:underline text-xs flex items-center gap-1">
                      <Eye size={14} /> View
                    </button>
                    <button onClick={() => requeryTransaction(txn.reference)} className="text-orange-600 hover:underline text-xs flex items-center gap-1">
                      <RefreshCcw size={14} /> Requery
                    </button>
                    <button onClick={() => refundTransaction(txn.reference)} className="text-red-600 hover:underline text-xs flex items-center gap-1">
                      <RotateCcw size={14} /> Refund
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr><td colSpan="7" className="text-center py-4 text-gray-500">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(filtered.length / txnsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {viewTxn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-lg font-bold text-blue-800 mb-4">Transaction Details</h2>
            <p><strong>Reference:</strong> {viewTxn.reference}</p>
            <p><strong>Type:</strong> {viewTxn.type}</p>
            <p><strong>Status:</strong> {viewTxn.status}</p>
            <p><strong>Amount:</strong> ₦{parseFloat(viewTxn.amount).toLocaleString()}</p>
            <p><strong>Date:</strong> {new Date(viewTxn.created_at).toLocaleString()}</p>
            <p><strong>Recipient:</strong> {viewTxn.recipient || 'N/A'}</p>
            <p><strong>User:</strong> {viewTxn.user?.name || 'N/A'}</p>
            <p><strong>Gateway:</strong> {viewTxn.gateway || 'N/A'}</p>
            <p><strong>Narration:</strong> {viewTxn.narration || 'N/A'}</p>
            <button onClick={() => setViewTxn(null)} className="absolute top-2 right-3 text-red-500 hover:text-red-700">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
