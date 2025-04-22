import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateTransferReceipt = async (transferDetails) => {
  const receipt = document.createElement("div");
  receipt.style.padding = "20px";
  receipt.style.width = "400px";
  receipt.innerHTML = `
    <h2 style="text-align:center;">Ineplug Transfer Receipt</h2>
    <hr />
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    <p><strong>Receiver:</strong> ${transferDetails.receiverUsername}</p>
    <p><strong>Amount:</strong> ₦${transferDetails.amount}</p>
    <p><strong>Status:</strong> Successful</p>
    <p><strong>Transaction ID:</strong> ${transferDetails.transactionId}</p>
    <p style="margin-top: 20px; font-size: 12px;">Thank you for using Ineplug!</p>
  `;

  document.body.appendChild(receipt);
  const canvas = await html2canvas(receipt);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 10, 10);
  pdf.save("ineplug_transfer_receipt.pdf");
  document.body.removeChild(receipt);
};
