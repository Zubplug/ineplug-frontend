import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const VtuServicesManager = () => {
  const [serviceId, setServiceId] = useState("mtn");
  const [services, setServices] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchServices();
  }, [serviceId]);

  const fetchBalance = async () => {
    try {
      const res = await api.get("/admin/vtu/balance");
      setBalance(res.data.balance);
    } catch (err) {
      toast.error("Failed to fetch VTpass balance");
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/vtu/services/${serviceId}`);
      setServices(res.data.customized || []);
    } catch (err) {
      toast.error("Failed to fetch VTU services");
    } finally {
      setLoading(false);
    }
  };

  const syncServices = async () => {
    try {
      const res = await api.post("/admin/vtu/sync");
      toast.success(res.data.message || "Services synced");
      fetchServices();
    } catch (err) {
      toast.error("Sync failed");
    }
  };

  const handleUpdate = (id, field, value) => {
    const updated = services.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setServices(updated);
  };

  const saveService = async (svc) => {
    try {
      await api.post("/admin/vtu/services/update", svc);
      toast.success("Updated successfully");
    } catch {
      toast.error("Failed to update service");
    }
  };

  const toggleService = async (id) => {
    try {
      const res = await api.post("/admin/vtu/services/toggle", { id });
      const updated = services.map((s) =>
        s.id === id ? { ...s, active: res.data.active } : s
      );
      setServices(updated);
    } catch {
      toast.error("Failed to toggle status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">VTU Services Management</h1>
        <button
          onClick={syncServices}
          className="bg-indigo-700 text-white px-4 py-2 rounded text-sm"
        >
          Sync VTU Services
        </button>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <select
          className="border p-2 rounded"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="mtn">Airtime - MTN</option>
          <option value="airtel">Airtime - Airtel</option>
          <option value="gotv">Cable TV - GOTV</option>
          <option value="dstv">Cable TV - DSTV</option>
          <option value="abuja-electric">Electricity - Abuja</option>
          <option value="waec">Education - WAEC</option>
          <option value="bet9ja">Betting - Bet9ja</option>
        </select>

        <div className="px-4 py-2 bg-green-100 text-green-800 rounded">
          Wallet Balance: ₦{balance || "..."}
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th>Variation</th>
              <th>Price</th>
              <th>Agent Comm.</th>
              <th>Aggregator Comm.</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center p-4">Loading...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan="7" className="text-center p-4">No services found</td></tr>
            ) : (
              services.map((svc) => (
                <tr key={svc.id || svc.variation_code} className="border-t">
                  <td className="p-2 font-medium">{svc.name}</td>
                  <td>{svc.variation_code}</td>
                  <td>
                    <input
                      type="number"
                      value={svc.price !== undefined && svc.price !== null ? svc.price : ""}
                      onChange={(e) => handleUpdate(svc.id, "price", e.target.value)}
                      className="border px-2 py-1 w-24 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={svc.agent_commission !== undefined && svc.agent_commission !== null ? svc.agent_commission : 0}
                      onChange={(e) => handleUpdate(svc.id, "agent_commission", e.target.value)}
                      className="border px-2 py-1 w-20 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={svc.aggregator_commission !== undefined && svc.aggregator_commission !== null ? svc.aggregator_commission : 0}
                      onChange={(e) => handleUpdate(svc.id, "aggregator_commission", e.target.value)}
                      className="border px-2 py-1 w-20 rounded"
                    />
                  </td>
                  <td>
                    <span className={`text-xs px-2 py-1 rounded ${svc.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {svc.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => saveService(svc)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >Save</button>
                    <button
                      onClick={() => toggleService(svc.id)}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-xs"
                    >Toggle</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VtuServicesManager;
