import React, { useState } from "react";
import toast from "react-hot-toast";
import FooterNav from "../../../components/FooterNav";

const AirtimeScreen = () => {
  const [network, setNetwork] = useState("mtn");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/airtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          request_id: `airtime-${Date.now()}`,
          serviceID: network,
          amount,
          phone,
        }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (data.code === "000") toast.success("Airtime purchase successful");
      else toast.error(data.response_description || "Transaction failed");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="p-4">
        <h1 className="text-xl font-bold text-blue-700 mb-4">Buy Airtime</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="mtn">MTN</option>
            <option value="glo">GLO</option>
            <option value="etisalat">9mobile</option>
            <option value="airtel">Airtel</option>
          </select>

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
            {loading ? "Processing..." : "Buy Airtime"}
          </button>
        </form>
      </div>

      <FooterNav />
    </div>
  );
};

export default AirtimeScreen;
