import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const transactions = [
  {
    id: 1,
    type: 'Wallet Top-up',
    amount: 5000,
    status: 'Success',
    date: new Date('2025-04-14T10:00:00'),
  },
];

const ReceiptView = () => {
  const { id } = useParams();
  const tx = transactions.find((t) => t.id.toString() === id);

  if (!tx) return <div>Transaction not found</div>;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Receipt - Ineplug', 20, 20);
    doc.text(`Type: ${tx.type}`, 20, 40);
    doc.text(`Amount: ₦${tx.amount.toLocaleString()}`, 20, 50);
    doc.text(`Status: ${tx.status}`, 20, 60);
    doc.text(`Date: ${format(tx.date, 'dd MMM yyyy • hh:mm a')}`, 20, 70);
    doc.save(`receipt-${tx.id}.pdf`);
  };

  const share = () => {
    alert(`Type: ${tx.type}\n₦${tx.amount}\nStatus: ${tx.status}`);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Transaction Receipt</h2>
      <p><strong>Type:</strong> {tx.type}</p>
      <p><strong>Amount:</strong> ₦{tx.amount.toLocaleString()}</p>
      <p><strong>Status:</strong> {tx.status}</p>
      <p><strong>Date:</strong> {format(tx.date, 'dd MMM yyyy • hh:mm a')}</p>

      <button onClick={downloadPDF} style={{ marginRight: 10 }}>Download PDF</button>
      <button onClick={share}>Share</button>
    </div>
  );
};

export default ReceiptView;
