import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FooterNav from "../../../components/FooterNav";

const CableTVScreen = () => {
  const [provider, setProvider] = useState("dstv");
  const [cardNumber, setCardNumber] = useState("");
  const [variation, setVariation] = useState("");
  const [variations, setVariations] = useState([]);
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/vtu/variations/${provider}`)
      .then((res) => res.json())
      .then((data) => setVariations(data.content?.variations || []))
      .catch(() => toast.error("Failed to load plans"));
  }, [provider]);

  const verifyCard = async () => {
    if (!cardNumber) return toast.error("Enter smart card number");
    setVerifying(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/cabletv/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billersCode: cardNumber,
          serviceID: provider,
        }),
      });
      const data = await res.json();
      console.log("Verification response:", data);
      if (data.content?.Customer_Name) {
        setCustomerName(data.content.Customer_Name);
        toast.success("Smartcard verified");
      } else {
        toast.error(data.response_description || "Verification failed");
      }
    } catch (e) {
      toast.error("Error verifying smartcard");
    } finally {
      setVerifying(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!customerName) return toast.error("Please verify smartcard first");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/vtu/cabletv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          request_id: `cabletv-${Date.now()}`,
          serviceID: provider,
          variation_code: variation,
          billersCode: cardNumber,
          amount: variations.find(v => v.variation_code === variation)?.amount || 0,
          phone: "08000000000",
        }),
      });
      const data = await res.json();
      console.log("API response:", data);

      if (data.code === "000") toast.success("Subscription successful");
      else toast.error(data.response_description || "Payment failed");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="p-4">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Pay Cable TV Subscription</h2>
        <form onSubmit={handlePayment} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow">
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full border p-2 rounded">
            <option value="dstv">DStv</option>
            <option value="gotv">GOtv</option>
            <option value="startimes">Startimes</option>
          </select>

          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Smartcard Number"
          />
          <button
            type="button"
            onClick={verifyCard}
            disabled={verifying}
            className="w-full bg-yellow-600 text-white p-2 rounded"
          >
            {verifying ? "Verifying..." : "Verify Smartcard"}
          </button>

          {customerName && (
            <p className="text-green-600 text-sm font-medium">Customer: {customerName}</p>
          )}

          <select
            value={variation}
            onChange={(e) => setVariation(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Plan</option>
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
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
      <FooterNav />
    </div>
  );
};

export default CableTVScreen;
