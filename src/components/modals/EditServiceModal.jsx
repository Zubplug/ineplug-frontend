import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const EditServiceModal = ({ service, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    fee_type: "naira",
    partner: "",
    agent: "",
    aggregator: "",
    type: "manual",
    status: "active",
  });

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name || "",
        price: service.price || "",
        fee_type: service.fee_type || "naira",
        partner: service.commissions?.partner || "",
        agent: service.commissions?.agent || "",
        aggregator: service.commissions?.aggregator || "",
        type: service.type || "manual",
        status: service.status || "active",
      });
    }
  }, [service]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Updated successfully (demo only)");
    onClose();
  };

  return (
    <Dialog open={!!service} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
            <X size={20} />
          </button>
          <Dialog.Title className="text-lg font-bold mb-4 text-blue-800">
            Edit: {form.name}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Service Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="border p-2 rounded"
              />
              <select
                value={form.fee_type}
                onChange={(e) => handleChange("fee_type", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="naira">₦ Naira</option>
                <option value="percent">% Percent</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                placeholder="Partner Commission"
                value={form.partner}
                onChange={(e) => handleChange("partner", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Agent Commission"
                value={form.agent}
                onChange={(e) => handleChange("agent", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Aggregator Commission"
                value={form.aggregator}
                onChange={(e) => handleChange("aggregator", e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="manual">Manual</option>
                <option value="api">API</option>
              </select>

              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditServiceModal;
