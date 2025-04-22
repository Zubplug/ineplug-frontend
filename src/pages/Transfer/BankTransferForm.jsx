// ✅ FULL UPDATED BankTransferForm.jsx with footer & cancel link

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const BankTransferForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountNumber: "",
    bankCode: "",
    amount: "",
  });

  const [banks, setBanks] = useState([]);
  const [transferFee, setTransferFee] = useState(35);
  const [accountName, setAccountName] = useState("");
  const [verifying, setVerifying] = useState(false);

  const apiKey = "YOUR_MONNIFY_API_KEY";

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer YOUR_PAYSTACK_KEY`,
          },
        });
        const result = await res.json();
        setBanks(result.data || []);
      } catch (err) {
        alert("Failed to fetch banks.");
      }
    };
    fetchBanks();
  }, []);

  const verifyAccount = async () => {
    if (!form.accountNumber || !form.bankCode) return;
    setVerifying(true);
    try {
      const res = await fetch(
        `https://api.monnify.com/api/v1/disbursements/account/validate?accountNumber=${form.accountNumber}&bankCode=${form.bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const result = await res.json();
      setAccountName(result.responseBody?.accountName || "Unknown");
    } catch {
      setAccountName("Invalid account");
    }
    setVerifying(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.accountNumber || !form.bankCode || !form.amount) {
      return alert("All fields required.");
    }
    const total = parseFloat(form.amount) + transferFee;
    navigate("/enter-transfer-pin", {
      state: {
        ...form,
        accountName,
        fee: transferFee,
        total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-6 pb-28 md:px-8">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Bank Transfer</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="number"
          placeholder="Account Number"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          value={form.accountNumber}
          onChange={(e) => {
            setForm({ ...form, accountNumber: e.target.value });
            setAccountName("");
          }}
          onBlur={verifyAccount}
        />

        <select
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          value={form.bankCode}
          onChange={(e) => {
            setForm({ ...form, bankCode: e.target.value });
            setAccountName("");
          }}
          onBlur={verifyAccount}
        >
          <option value="">Select Bank</option>
          {banks.map((bank, i) => (
            <option key={i} value={bank.code}>{bank.name}</option>
          ))}
        </select>

        {accountName && (
          <p className="text-sm text-green-700 dark:text-green-400">Account Name: {verifying ? "Verifying..." : accountName}</p>
        )}

        <input
          type="number"
          placeholder="Amount (₦)"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>Transfer Fee: ₦{transferFee.toLocaleString()}</p>
          <p>Total: ₦{form.amount ? (parseFloat(form.amount) + transferFee).toLocaleString() : "0"}</p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Proceed
        </button>
      </form>

      <div className="mt-4">
        <Link
          to="/dashboard"
          className="text-center block py-2 border border-gray-400 dark:border-gray-600 rounded text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel Transfer
        </Link>
      </div>

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

export default BankTransferForm;
