import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import AddServiceModal from "../../components/modals/AddServiceModal";
import ConfirmDialog from "../../components/modals/ConfirmDialog";
import EditServiceModal from "../../components/modals/EditServiceModal";
import axios from "axios";

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // ✅ Load services from backend using adminToken
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin token not found. Please login.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/admin/services/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load services. Check your admin login.");
      });
  }, []);

  const toggleStatus = (item) => {
    item.status = item.status === "active" ? "inactive" : "active";
    setServices([...services]);
  };

  const deleteItem = (level, serviceId, subId = null, subsubId = null) => {
    let updated = [...services];

    if (level === "main") {
      updated = updated.filter((s) => s.id !== serviceId);
    } else if (level === "sub") {
      const main = updated.find((s) => s.id === serviceId);
      main.subcategories = main.subcategories.filter((s) => s.id !== subId);
    } else if (level === "subsub") {
      const main = updated.find((s) => s.id === serviceId);
      const sub = main.subcategories.find((s) => s.id === subId);
      sub.subsub = sub.subsub.filter((s) => s.id !== subsubId);
    }

    setServices(updated);
    setConfirmDialog(null);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Services Manager</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Service
          </button>
        </div>

        <div className="bg-white shadow rounded p-4">
          {services.map((service) => (
            <div key={service.id} className="mb-8">
              <div className="flex justify-between bg-gray-100 p-3 rounded items-center">
                <div>
                  <h2 className="font-bold text-blue-800">{service.name}</h2>
                  <p className="text-xs text-gray-500">Status: {service.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditModal(service)}
                    className="text-blue-600 text-xs flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(service)}
                    className="text-green-600 text-xs flex items-center gap-1"
                  >
                    {service.status === "active" ? (
                      <>
                        <XCircle size={14} /> Deactivate
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} /> Activate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDialog({ level: "main", id: service.id })
                    }
                    className="text-red-600 text-xs flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              {/* Subcategories */}
              {service.subcategories?.map((sub) => (
                <div key={sub.id} className="ml-6 mt-4 border-l pl-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{sub.name}</h3>
                      <p className="text-xs text-gray-500">Status: {sub.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowEditModal(sub)}
                        className="text-blue-500 text-xs"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(sub)}
                        className="text-green-500 text-xs"
                      >
                        {sub.status === "active" ? <XCircle size={14} /> : <CheckCircle size={14} />}
                      </button>
                      <button
                        onClick={() =>
                          setConfirmDialog({
                            level: "sub",
                            id: service.id,
                            subId: sub.id,
                          })
                        }
                        className="text-red-500 text-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Sub-subcategories */}
                  {sub.subsub?.map((ss) => (
                    <div
                      key={ss.id}
                      className="ml-6 mt-3 flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium text-sm">{ss.name}</p>
                        <p className="text-xs text-gray-500">
                          Price: ₦{ss.price} | Type: {ss.type} | Status: {ss.status}
                        </p>
                        <p className="text-xs text-gray-500">
                          Commission - Partner: ₦{ss.commissions?.partner}, Agent: ₦{ss.commissions?.agent}, Aggregator: ₦{ss.commissions?.aggregator}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setShowEditModal(ss)}
                          className="text-blue-600 text-xs"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => toggleStatus(ss)}
                          className="text-green-500 text-xs"
                        >
                          {ss.status === "active" ? <XCircle size={14} /> : <CheckCircle size={14} />}
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDialog({
                              level: "subsub",
                              id: service.id,
                              subId: sub.id,
                              subsubId: ss.id,
                            })
                          }
                          className="text-red-500 text-xs"
                        >
                          <Trash2 size={14} />
                        </button>
                        <a
                          href={`/admin/forms/edit/${ss.slug || ss.name.toLowerCase().replace(/\s+/g, "-")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 text-xs underline"
                        >
                          Form
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {showAddModal && <AddServiceModal onClose={() => setShowAddModal(false)} />}
      {showEditModal && (
        <EditServiceModal
          service={showEditModal}
          onClose={() => setShowEditModal(null)}
        />
      )}
      {confirmDialog && (
        <ConfirmDialog
          onConfirm={() =>
            deleteItem(
              confirmDialog.level,
              confirmDialog.id,
              confirmDialog.subId,
              confirmDialog.subsubId
            )
          }
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
};

export default AdminServicesPage;
