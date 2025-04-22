import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FooterNav from "../../../components/FooterNav";

const DataScreen = () => {
  const [network, setNetwork] = useState("mtn-data");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/vtu/variations/${network}`)
      .then((res) => res.json())
      .then((data) => setPlans(data.content?.variations || []))
      .catch(() => toast.error("Failed to load plans"));
  }, [network]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan || !phone) return toast.error("Select a plan and enter phone number");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          request_id: `data-${Date.now()}`,
          serviceID: network,
          variation_code: selectedPlan,
          phone,
        }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (data.code === "000") toast.success("Data purchase successful");
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
        <h1 className="text-xl font-bold text-blue-700 mb-4">Buy Data</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow">
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="mtn-data">MTN</option>
            <option value="glo-data">GLO</option>
            <option value="etisalat-data">9mobile</option>
            <option value="airtel-data">Airtel</option>
          </select>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Data Plan</option>
            {plans.map((plan, i) => (
              <option key={i} value={plan.variation_code}>
                {plan.name} - ₦{plan.amount}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded"
          >
            {loading ? "Processing..." : "Buy Data"}
          </button>
        </form>
      </div>

      <FooterNav />
    </div>
  );
};

export default DataScreen;
