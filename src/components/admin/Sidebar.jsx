import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  Users,
  Wallet,
  FileText,
  LifeBuoy,
  Megaphone,
  Settings,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-2 py-1 rounded hover:text-blue-600 ${
      location.pathname.includes(path) ? "bg-blue-100 text-blue-900 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-8">Ineplug Admin</h1>
        <nav className="space-y-2 text-sm text-blue-800 font-medium">
          <Link to="/admin" className={linkClass("/admin")}>
            <BarChart size={18} /> Dashboard
          </Link>

          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Management</p>
          <Link to="/admin/users" className={linkClass("/users")}>
            <Users size={18} /> Users
          </Link>
          <Link to="/admin/partners" className={linkClass("/partners")}>
            <Users size={18} /> Partner Staff
          </Link>
          <Link to="/admin/aggregators" className={linkClass("/aggregators")}>
            <Users size={18} /> Aggregators
          </Link>

          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Finance</p>
          <Link to="/admin/transactions" className={linkClass("/transactions")}>
            <Wallet size={18} /> Transactions
          </Link>
          <Link to="/admin/services" className={linkClass("/services")}>
            <FileText size={18} /> Services Manager
          </Link>

          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">System</p>
          <Link to="/admin/settings" className={linkClass("/settings")}>
            <Settings size={18} /> Settings
          </Link>
          <Link to="/admin/broadcast" className={linkClass("/broadcast")}>
            <Megaphone size={18} /> Broadcast
          </Link>
          <Link to="/admin/faq" className={linkClass("/faq")}>
            <LifeBuoy size={18} /> Support
          </Link>
          <Link to="/admin/logs" className={linkClass("/logs")}>
            <FileText size={18} /> Admin Logs
          </Link>
        </nav>
      </div>

      <div>
        <hr className="my-4 border-gray-200" />
        <Link
          to="/"
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </Link>
      </div>
    </aside>
  );
}
