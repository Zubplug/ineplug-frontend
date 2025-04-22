import React from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";

const TransferSuccess = () => {
  const location = useLocation();
  const {
    destinationAccountName,
    destinationAccountNumber,
    destinationBankCode,
    amount,
    fee,
    total,
    transactionReference,
  } = location.state || {};

  const generateReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Zubplug Transfer Receipt", 20, 20);

    doc.setFontSize(12);
    const details = [
      `Transaction Ref: ${transactionReference}`,
      `Account Name: ${destinationAccountName}`,
      `Account Number: ${destinationAccountNumber}`,
      `Bank Code: ${destinationBankCode}`,
      `Amount: ₦${parseFloat(amount).toLocaleString()}`,
      `Fee: ₦${fee.toLocaleString()}`,
      `Total Paid: ₦${total.toLocaleString()}`,
      `Date: ${new Date().toLocaleString()}`
    ];

    details.forEach((text, i) => {
      doc.text(text, 20, 40 + i * 10);
    });

    doc.save(`TransferReceipt_${transactionReference}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-28 px-4 pt-6 md:px-8">
      <h1 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
        Transfer Successful
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-sm text-gray-800 dark:text-gray-200 space-y-2">
        <p><strong>Account Name:</strong> {destinationAccountName}</p>
        <p><strong>Account Number:</strong> {destinationAccountNumber}</p>
        <p><strong>Bank Code:</strong> {destinationBankCode}</p>
        <p><strong>Amount:</strong> ₦{parseFloat(amount).toLocaleString()}</p>
        <p><strong>Fee:</strong> ₦{fee.toLocaleString()}</p>
        <p><strong>Total:</strong> ₦{total.toLocaleString()}</p>
        <p><strong>Transaction Ref:</strong> {transactionReference}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={generateReceipt}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Download PDF Receipt
        </button>

        <Link
          to="/dashboard"
          className="text-center py-2 border border-gray-400 dark:border-gray-700 rounded text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Return to Dashboard
        </Link>
      </div>

      {/* FOOTER */}
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

export default TransferSuccess;
