import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FooterNav from "../../../components/FooterNav";

const ElectricityScreen = () => {
  const [provider, setProvider] = useState("ikeja-electric");
  const [meterType, setMeterType] = useState("prepaid");
  const [meterNumber, setMeterNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyMeter = async () => {
    if (!meterNumber) return toast.error("Enter meter number");
    setVerifying(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/electricity/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billersCode: meterNumber,
          serviceID: provider,
          type: meterType
        }),
      });
      const data = await res.json();
      console.log("Verification response:", data);
      if (data.content?.Customer_Name) {
        setCustomerName(data.content.Customer_Name);
        toast.success("Meter verified");
      } else {
        toast.error(data.response_description || "Verification failed");
      }
    } catch (e) {
      toast.error("Error verifying meter");
    } finally {
      setVerifying(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!customerName) return toast.error("Please verify meter first");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/electricity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          request_id: `electricity-${Date.now()}`,
          serviceID: provider,
          billersCode: meterNumber,
          variation_code: meterType,
          amount,
          phone
        }),
      });

      const data = await res.json();
      console.log("API response:", data);
      if (data.code === "000") toast.success("Electricity token purchase successful");
      else toast.error(data.response_description || "Transaction failed");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Pay Electricity Bill</h2>
        <form onSubmit={handlePayment} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow">
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full border p-2 rounded">
            <option value="ikeja-electric">Ikeja Electric</option>
            <option value="eko-electric">Eko Electric</option>
            <option value="abuja-electric">Abuja Electric</option>
            <option value="ibadan-electric">Ibadan Electric</option>
            <option value="kaduna-electric">Kaduna Electric</option>
          </select>

          <select value={meterType} onChange={(e) => setMeterType(e.target.value)} className="w-full border p-2 rounded">
            <option value="prepaid">Prepaid</option>
            <option value="postpaid">Postpaid</option>
          </select>

          <input
            type="text"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            placeholder="Meter Number"
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="button"
            onClick={verifyMeter}
            disabled={verifying}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded"
          >
            {verifying ? "Verifying..." : "Verify Meter"}
          </button>

          {customerName && <p className="text-green-600 text-sm font-medium">Customer: {customerName}</p>}

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
      <FooterNav />
    </div>
  );
};

export default ElectricityScreen;
