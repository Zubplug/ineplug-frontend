import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XCircle } from "lucide-react";
import api from "../../utils/api"; // Axios instance

export default function AddServiceModal({ onClose }) {
  const [level, setLevel] = useState("main");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("manual");
  const [feeType, setFeeType] = useState("naira");
  const [price, setPrice] = useState("");
  const [icon, setIcon] = useState(null);
  const [mainServices, setMainServices] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [commission, setCommission] = useState({
    partner: "",
    agent: "",
    aggregator: ""
  });

  // Fetch options dynamically later if needed (you can use useEffect)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("level", level);
    formData.append("name", name);
    formData.append("status", status === "active" ? 1 : 0);

    if (level === "main") {
      if (icon) formData.append("icon", icon);
    } else {
      formData.append("type", type);
      formData.append("fee_type", feeType);
      formData.append("price", price);
      formData.append("commission_partner", commission.partner);
      formData.append("commission_agent", commission.agent);
      formData.append("commission_aggregator", commission.aggregator);

      if (level === "subcategory") {
        formData.append("main_service_id", selectedMain);
      } else if (level === "subsubcategory") {
        formData.append("subcategory_id", selectedSub);
      }
    }

    try {
      const res = await api.post("/admin/services/create", formData);
      alert("Service created successfully ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating service. Check console.");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white max-w-xl w-full p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">Add New Service</Dialog.Title>
            <button onClick={onClose}><XCircle size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Level</label>
              <select value={level} onChange={e => setLevel(e.target.value)} className="w-full border rounded p-2">
                <option value="main">Main Service</option>
                <option value="subcategory">Subcategory</option>
                <option value="subsubcategory">Sub-subcategory</option>
              </select>
            </div>

            {(level === "subcategory") && (
              <div>
                <label className="block text-sm font-medium">Main Service</label>
                <select onChange={e => setSelectedMain(e.target.value)} className="w-full border rounded p-2">
                  <option value="">-- Select Main --</option>
                  {mainServices.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
            )}

            {level === "subsubcategory" && (
              <div>
                <label className="block text-sm font-medium">Subcategory</label>
                <select onChange={e => setSelectedSub(e.target.value)} className="w-full border rounded p-2">
                  <option value="">-- Select Subcategory --</option>
                  {subcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2" required />
            </div>

            {level === "main" && (
              <div>
                <label className="block text-sm font-medium">Upload Icon</label>
                <input type="file" onChange={e => setIcon(e.target.files[0])} className="w-full" />
              </div>
            )}

            {level !== "main" && (
              <>
                <div>
                  <label className="block text-sm font-medium">Service Type</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="w-full border rounded p-2">
                    <option value="manual">Manual</option>
                    <option value="api">API</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Price</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Fee Type</label>
                  <select value={feeType} onChange={e => setFeeType(e.target.value)} className="w-full border rounded p-2">
                    <option value="naira">₦ Naira</option>
                    <option value="percent">% Percent</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="number" placeholder="Partner Commission" value={commission.partner} onChange={e => setCommission({ ...commission, partner: e.target.value })} className="border p-2 rounded" />
                  <input type="number" placeholder="Agent Commission" value={commission.agent} onChange={e => setCommission({ ...commission, agent: e.target.value })} className="border p-2 rounded" />
                  <input type="number" placeholder="Aggregator Commission" value={commission.aggregator} onChange={e => setCommission({ ...commission, aggregator: e.target.value })} className="border p-2 rounded" />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded p-2">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-700 text-white py-2 mt-4 rounded">
              Save Service
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
