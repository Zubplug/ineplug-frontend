// ✅ File: src/pages/Transfer/EnterTransferPIN.jsx

import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const EnterTransferPIN = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    type,
    recipient,
    accountNumber,
    bankCode,
    accountName,
    amount,
    fee,
    total,
    note
  } = location.state || {};

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!pin || pin.length !== 4) return alert("Enter valid 4-digit PIN");
    setLoading(true);

    try {
      if (type === "INEPLUG") {
        const res = await fetch("http://localhost:8000/api/ineplug-transfer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ recipient, amount, pin, note }),
        });

        const result = await res.json();

        if (res.ok) {
          navigate("/transfer-success", {
            state: {
              destinationAccountName: result.recipient_name,
              destinationAccountNumber: recipient,
              destinationBankCode: "Ineplug Wallet",
              amount,
              fee,
              total,
              transactionReference: result.reference,
            },
          });
        } else {
          navigate("/transfer-failure", { state: { message: result.message } });
        }
      } else {
        // Default to bank transfer via Monnify
        const res = await fetch("https://api.monnify.com/api/v2/disbursements/single", {
          method: "POST",
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            reference: `INEPLUG-${Date.now()}`,
            narration: "Bank Transfer",
            bankCode: bankCode,
            accountNumber: accountNumber,
            currency: "NGN",
            sourceAccountNumber: "YOUR_MONNIFY_WALLET_ACCOUNT",
          }),
        });

        const result = await res.json();

        if (result.requestSuccessful) {
          navigate("/transfer-success", {
            state: {
              ...result.responseBody,
              total,
              accountName,
            },
          });
        } else {
          navigate("/transfer-failure", {
            state: { message: result.responseMessage },
          });
        }
      }
    } catch (error) {
      alert("Transfer failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-6 pb-24 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Enter Transaction PIN</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 text-sm">
        <p>To: <strong>{type === "INEPLUG" ? recipient : accountName}</strong></p>
        <p>Amount: ₦{parseFloat(amount).toLocaleString()}</p>
        <p>Fee: ₦{fee.toLocaleString()}</p>
        <p>Total: <strong>₦{total.toLocaleString()}</strong></p>
      </div>

      <form onSubmit={handleTransfer} className="space-y-4">
        <input
          type="password"
          placeholder="Enter 4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          className="w-full px-4 py-2 border rounded text-center text-lg tracking-widest dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Transferring..." : "Confirm Transfer"}
        </button>
      </form>

      <div className="mt-4">
        <Link
          to="/dashboard"
          className="block text-center py-2 border border-gray-400 dark:border-gray-700 rounded text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel & Return to Dashboard
        </Link>
      </div>

      {/* Footer Navigation */}
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

export default EnterTransferPIN;
