import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FooterNav from "../../../components/FooterNav";

const EducationScreen = () => {
  const [provider, setProvider] = useState("waec-registration");
  const [variation, setVariation] = useState("");
  const [variations, setVariations] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/vtu/variations/${provider}`)
      .then((res) => res.json())
      .then((data) => setVariations(data.content?.variations || []))
      .catch(() => toast.error("Failed to load education plans"));
  }, [provider]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const selected = variations.find((v) => v.variation_code === variation);
    const amt = selected?.amount || amount;

    if (!variation) return toast.error("Select an education service");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          request_id: `education-${Date.now()}`,
          serviceID: provider,
          variation_code: variation,
          amount: amt,
          phone: "08000000000"
        }),
      });
      const data = await res.json();
      console.log("API response:", data);

      if (data.code === "000") toast.success("Education PIN purchase successful");
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
        <h2 className="text-xl font-bold text-blue-700 mb-4">Buy Education PIN</h2>
        <form onSubmit={handlePayment} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow">
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full border p-2 rounded">
            <option value="waec-registration">WAEC</option>
            <option value="jamb-registration">JAMB</option>
            <option value="neco-registration">NECO</option>
          </select>

          <select value={variation} onChange={(e) => setVariation(e.target.value)} className="w-full border p-2 rounded">
            <option value="">Select Service</option>
            {variations.map((v, i) => (
              <option key={i} value={v.variation_code}>
                {v.name} - ₦{v.amount}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white p-2 rounded"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </form>
      </div>
      <FooterNav />
    </div>
  );
};

export default EducationScreen;
