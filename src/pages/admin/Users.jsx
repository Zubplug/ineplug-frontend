import React, { useEffect, useState } from "react";
import {
  Eye, Edit, X, Check, Slash, Download, ArrowLeft, Search,
  User as UserIcon, Users as UsersIcon, Briefcase, Wallet, KeyRound
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState(null);
  const [filterRole, setFilterRole] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => toast.error("Failed to load users"));
  }, []);

  const updateUser = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setSelected(updated);
  };

  const togglePND = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${selected.id}/pnd`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pnd: !selected.pnd }),
      });
      const updated = await res.json();
      toast.success(`PND ${selected.pnd ? "removed" : "placed"} successfully`);
      updateUser(updated);
    } catch {
      toast.error("Failed to update PND");
    }
  };

  const toggleStatus = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${selected.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: selected.status === "Inactive" ? "Active" : "Inactive" }),
      });
      const updated = await res.json();
      toast.success(`User ${updated.status === "Active" ? "activated" : "deactivated"}`);
      updateUser(updated);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const resetPin = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`http://127.0.0.1:8000/api/admin/users/${selected.id}/reset-pin`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("PIN reset successfully");
    } catch {
      toast.error("Failed to reset PIN");
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Wallet", "Role", "KYC", "Status", "Joined"],
      ...users.map((u) => [
        u.name, u.email, u.phone, u.wallet_balance || 0, u.role,
        `Level ${u.kyc_level}`, u.status || "Active", u.created_at?.substring(0, 10) || "",
      ]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ineplug_users.csv";
    a.click();
  };

  const badgeStyle = (role) => {
    switch (role) {
      case "Admin": return "bg-yellow-100 text-yellow-700";
      case "Agent": return "bg-blue-100 text-blue-700";
      case "Aggregator": return "bg-purple-100 text-purple-700";
      case "Partner": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const kycStyle = (level) => {
    if (level === 0) return "bg-red-100 text-red-700";
    if (level === 1) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />

      <button onClick={() => navigate("/admin")} className="text-blue-700 text-sm mb-4 flex items-center gap-1">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-gray-500 flex items-center gap-3">
          <UsersIcon size={32} className="text-gray-600" />
          <div>
            <h4 className="text-sm text-gray-500">Total Users</h4>
            <p className="text-xl font-bold text-gray-800">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600 flex items-center gap-3">
          <UserIcon size={32} className="text-blue-600" />
          <div>
            <h4 className="text-sm text-gray-500">Users</h4>
            <p className="text-xl font-bold text-blue-700">
              {users.filter(u => u.role === "user").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-600 flex items-center gap-3">
          <UsersIcon size={32} className="text-yellow-600" />
          <div>
            <h4 className="text-sm text-gray-500">Agents</h4>
            <p className="text-xl font-bold text-yellow-700">
              {users.filter(u => u.role === "Agent").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-600 flex items-center gap-3">
          <Briefcase size={32} className="text-purple-600" />
          <div>
            <h4 className="text-sm text-gray-500">Partners & Aggregators</h4>
            <p className="text-sm font-semibold text-purple-700">
              {users.filter(u => u.role === "Partner").length} Partners,{" "}
              {users.filter(u => u.role === "Aggregator").length} Aggregators
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-600 flex items-center gap-3">
          <Wallet size={32} className="text-green-600" />
          <div>
            <h4 className="text-sm text-gray-500">Total Wallet</h4>
            <p className="text-xl font-bold text-green-700">
              ₦{users.reduce((acc, u) => acc + (parseFloat(u.wallet_balance) || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">User Management</h1>
        <button onClick={exportCSV} className="flex items-center bg-blue-700 text-white text-sm px-4 py-2 rounded">
          <Download size={16} className="mr-1" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        >
          {["All", "Admin", "Agent", "Aggregator", "Partner", "user"].map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
        <div className="flex items-center border px-2 rounded w-full md:w-1/2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            className="w-full p-2 focus:outline-none"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Wallet</th>
              <th>Role</th>
              <th>KYC</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((u) => {
              const roleMatch = filterRole === "All" || u.role === filterRole;
              const searchMatch =
                u.name?.toLowerCase().includes(search.toLowerCase()) ||
                u.email?.toLowerCase().includes(search.toLowerCase());
              return roleMatch && searchMatch;
            }).map((u, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>₦{parseFloat(u.wallet_balance || 0).toLocaleString()}</td>
                <td><span className={`px-2 py-1 rounded text-xs font-medium ${badgeStyle(u.role)}`}>{u.role}</span></td>
                <td><span className={`px-2 py-1 rounded text-xs font-medium ${kycStyle(u.kyc_level)}`}>Level {u.kyc_level}</span></td>
                <td className="text-center text-xs">
                  <button onClick={() => setSelected(u)} className="text-blue-700 hover:underline">
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Name:</strong> {selected.name}</li>
              <li><strong>Email:</strong> {selected.email}</li>
              <li><strong>Phone:</strong> {selected.phone}</li>
              <li><strong>Role:</strong> {selected.role}</li>
              <li><strong>KYC:</strong> Level {selected.kyc_level}</li>
              <li><strong>Wallet:</strong> ₦{parseFloat(selected.wallet_balance || 0).toLocaleString()}</li>
              {selected.virtual_account_number && (
                <>
                  <li><strong>VA Number:</strong> {selected.virtual_account_number}</li>
                  <li><strong>Bank:</strong> {selected.virtual_account_bank}</li>
                </>
              )}
              <li><strong>Joined:</strong> {selected.created_at?.substring(0, 10)}</li>
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button onClick={() => setEditData(selected)} className="bg-indigo-600 text-white py-2 px-3 rounded text-sm">
                <Edit size={14} className="inline mr-1" /> Edit
              </button>
              <button onClick={() => toast("Transactions clicked")} className="bg-blue-600 text-white py-2 px-3 rounded text-sm">
                <Wallet size={14} className="inline mr-1" /> Transactions
              </button>
              <button onClick={togglePND} className="bg-orange-500 text-white py-2 px-3 rounded text-sm">
                <Slash size={14} className="inline mr-1" /> {selected.pnd ? "Remove PND" : "Place PND"}
              </button>
              <button onClick={toggleStatus} className={`py-2 px-3 rounded text-sm text-white ${selected.status === "Inactive" ? "bg-green-600" : "bg-red-600"}`}>
                {selected.status === "Inactive" ? (
                  <><Check size={14} className="inline mr-1" /> Activate</>
                ) : (
                  <><X size={14} className="inline mr-1" /> Deactivate</>
                )}
              </button>
              <button onClick={resetPin} className="bg-gray-700 text-white py-2 px-3 rounded text-sm">
                <KeyRound size={14} className="inline mr-1" /> Reset PIN
              </button>
              <button onClick={() => toast("Request history clicked")} className="bg-teal-600 text-white py-2 px-3 rounded text-sm">
                <Search size={14} className="inline mr-1" /> Request History
              </button>
            </div>
            <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-red-500 text-lg font-bold">×</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const token = localStorage.getItem("adminToken");
                try {
                  const res = await fetch(`http://127.0.0.1:8000/api/admin/users/${editData.id}/update`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      email: editData.email,
                      phone: editData.phone,
                      dob: editData.dob,
                      address: editData.address,
                    }),
                  });
                  const updated = await res.json();
                  toast.success("User updated successfully");
                  updateUser(updated);
                  setEditData(null);
                } catch {
                  toast.error("Update failed");
                }
              }}
              className="space-y-4 text-sm text-gray-700"
            >
              <div>
                <label>Email</label>
                <input value={editData.email || ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full border p-2 rounded mt-1" />
              </div>
              <div>
                <label>Phone</label>
                <input value={editData.phone || ""} onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full border p-2 rounded mt-1" />
              </div>
              <div>
                <label>Date of Birth</label>
                <input type="date" value={editData.dob || ""} onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
                  className="w-full border p-2 rounded mt-1" />
              </div>
              <div>
                <label>Address</label>
                <input value={editData.address || ""} onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full border p-2 rounded mt-1" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setEditData(null)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
