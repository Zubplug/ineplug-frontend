import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const IneplugTransfer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ recipient: "", amount: "", note: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.recipient || !form.amount) return setError("Fill all fields");
    if (parseFloat(form.amount) <= 0) return setError("Amount must be greater than 0");

    setError("");
    navigate("/enter-transfer-pin", {
      state: {
        ...form,
        type: "INEPLUG",
        fee: 0,
        total: parseFloat(form.amount),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-6 pb-28 md:px-8">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Ineplug Wallet Transfer</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Recipient Phone or User ID"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          value={form.recipient}
          onChange={(e) => setForm({ ...form, recipient: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount (₦)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <textarea
          placeholder="Note (optional)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          rows={3}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Proceed
        </button>

        <Link
          to="/dashboard"
          className="block text-center py-2 border mt-2 rounded text-gray-700 dark:text-white border-gray-400 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel & Return to Dashboard
        </Link>
      </form>

      {/* Footer Same as User Dashboard */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-2 flex justify-between text-xs text-gray-700 dark:text-gray-200 md:text-sm z-50">
        <Link to="/dashboard" className="flex flex-col items-center">
          <span>🏠</span><span>Home</span>
        </Link>
        <Link to="/transactions" className="flex flex-col items-center">
          <span>⏱</span><span>Transactions</span>
        </Link>
        <Link to="/my-requests" className="flex flex-col items-center">
          <span>📄</span><span>My Requests</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center">
          <span>⚙️</span><span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default IneplugTransfer;
