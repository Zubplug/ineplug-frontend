import React from "react";
import {
  BarChart, Users, Wallet, FileText, LifeBuoy, Megaphone, Settings, LogOut
} from "lucide-react";

export default function DashboardSidebar({ active }) {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-blue-800 mb-8">Ineplug Admin</h1>
        <nav className="space-y-2 text-sm text-blue-800 font-medium">
          <a href="/admin" className={`flex items-center gap-2 ${active === 'dashboard' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><BarChart size={18} /> Dashboard</a>
          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Management</p>
          <a href="/admin/users" className={`flex items-center gap-2 ${active === 'users' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Users size={18} /> Users</a>
          <a href="/admin/partners" className={`flex items-center gap-2 ${active === 'partners' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Users size={18} /> Partner Staff</a>
          <a href="/admin/aggregators" className={`flex items-center gap-2 ${active === 'aggregators' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Users size={18} /> Aggregators</a>
          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">Finance</p>
          <a href="/admin/transactions" className={`flex items-center gap-2 ${active === 'transactions' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Wallet size={18} /> Transactions</a>
          <a href="/admin/services" className={`flex items-center gap-2 ${active === 'services' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><FileText size={18} /> Services Manager</a>
          <p className="text-xs text-gray-500 mt-4 mb-1 uppercase">System</p>
          <a href="/admin/settings" className={`flex items-center gap-2 ${active === 'settings' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Settings size={18} /> Settings</a>
          <a href="/admin/broadcast" className={`flex items-center gap-2 ${active === 'broadcast' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><Megaphone size={18} /> Broadcast</a>
          <a href="/admin/faq" className={`flex items-center gap-2 ${active === 'faq' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><LifeBuoy size={18} /> Support</a>
          <a href="/admin/logs" className={`flex items-center gap-2 ${active === 'logs' ? 'text-blue-700 font-bold' : 'hover:text-blue-600'}`}><FileText size={18} /> Admin Logs</a>
        </nav>
      </div>

      <div>
        <hr className="my-4 border-gray-200" />
        <a href="/" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
          <LogOut size={16} /> Logout
        </a>
      </div>
    </aside>
  );
}
