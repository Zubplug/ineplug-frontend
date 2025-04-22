import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/admin/services/all")
      .then(res => setServices(res.data));
  }, []);

  const getChildren = (parentId) => services.filter(s => s.parent_id === parentId);

  const renderLevel = (service, level = 0) => {
    const indent = { paddingLeft: `${level * 24}px` };
    const children = getChildren(service.id);
    const color = level === 0 ? "text-blue-800 font-bold" : level === 1 ? "text-green-700" : "text-gray-600";

    return (
      <div key={service.id}>
        <div className={`flex items-center justify-between border-b py-2 ${color}`} style={indent}>
          <span>{service.name}</span>
          <div className="flex gap-2">
            {level < 2 && (
              <button
                onClick={() => navigate(`/admin/forms/edit/${service.slug}?add=${level === 0 ? 'sub' : 'sub-sub'}`)}
                className="text-blue-700 hover:underline text-sm"
              >
                + Add {level === 0 ? "Subcategory" : "Sub-sub"}
              </button>
            )}
            <button onClick={() => navigate(`/admin/forms/edit/${service.slug}`)} className="text-green-600 hover:text-green-800"><Pencil size={16} /></button>
            <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
          </div>
        </div>
        {children.map(child => renderLevel(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Services Manager</h2>
          <Link
            to="/admin/forms/edit/new"
            className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={16} /> New Service
          </Link>
        </div>

        <div className="bg-white rounded shadow p-4">
          {services.filter(s => !s.parent_id).map(service => renderLevel(service))}
          {services.length === 0 && (
            <div className="text-gray-500 text-center py-6">No services available.</div>
          )}
        </div>
      </main>
    </div>
  );
}
