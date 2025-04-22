import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../../../components/FooterNav";

const BettingScreen = () => {
  const [bettingServices, setBettingServices] = useState([]);
  const [platform, setPlatform] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "YOUR_API_KEY"; // 🔐 Replace with your actual key

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          "https://vtu.gladtidingsdata.com/api/service-variations?serviceID=betting",
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const result = await response.json();
        setBettingServices(result.content?.variations || []);
      } catch (error) {
        alert("Failed to load betting platforms.");
      }
    };

    fetchPlatforms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!platform || !accountNumber || !amount) return alert("All fields are required.");

    setLoading(true);

    try {
      const res = await fetch("https://vtu.gladtidingsdata.com/api/betting", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          biller_code: platform,
          account: accountNumber,
          amount,
        }),
      });

      const result = await res.json();
      alert(result.message || "Betting top-up successful!");
    } catch (err) {
      alert("Transaction failed.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 px-4 pt-6 md:px-8">
      <Link to="/services/vtu" className="text-sm text-blue-600 hover:underline block mb-4">
        ← Back to VTU
      </Link>

      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Fund Betting Account
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Betting Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select Betting Platform</option>
          {bettingServices.map((s, i) => (
            <option key={i} value={s.variation_code}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Fund Account"}
        </button>
      </form>

      <FooterNav />
    </div>
  );
};

export default BettingScreen;
