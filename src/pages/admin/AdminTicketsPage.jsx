import React, { useState } from 'react';
import { Users, Wallet, LifeBuoy, FileText } from 'lucide-react';

export default function AdminTicketsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');

  const filters = ['All', 'Open', 'In Progress', 'Escalated', 'Closed'];

  const tickets = [
    {
      id: 'TCK001',
      subject: 'BVN Request Issue',
      user: 'Grace Smith',
      status: 'Open',
      priority: 'High',
      date: '2025-04-15',
      tags: 'BVN,Verification',
    },
    {
      id: 'TCK002',
      subject: 'NIN Not Validating',
      user: 'Uche Samuel',
      status: 'Escalated',
      priority: 'Medium',
      date: '2025-04-14',
      tags: 'NIN',
    },
    {
      id: 'TCK003',
      subject: 'Login Failed',
      user: 'Inemesit Akpan',
      status: 'Closed',
      priority: 'Low',
      date: '2025-04-13',
      tags: 'Login',
    },
  ];

  const filteredTickets =
    activeFilter === 'All' ? tickets : tickets.filter((t) => t.status === activeFilter);

  const stats = [
    { label: 'Total Tickets', value: tickets.length, icon: <Users size={22} />, color: 'bg-blue-100' },
    { label: 'Open Tickets', value: tickets.filter((t) => t.status === 'Open').length, icon: <LifeBuoy size={22} />, color: 'bg-blue-100' },
    { label: 'Escalated', value: tickets.filter((t) => t.status === 'Escalated').length, icon: <FileText size={22} />, color: 'bg-blue-100' },
    { label: 'Closed', value: tickets.filter((t) => t.status === 'Closed').length, icon: <Wallet size={22} />, color: 'bg-blue-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md hidden md:block">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Filter Tickets</h2>
        <nav className="space-y-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeFilter === f
                  ? 'bg-blue-100 text-blue-800 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Support Tickets</h1>
          <a href="/admin" className="text-sm text-blue-600 hover:underline">
            ← Back to Admin Dashboard
          </a>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
              <div className={`p-2 rounded-full ${item.color} text-blue-700`}>{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-lg font-bold text-blue-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ticket Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Ticket ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                  <td className="p-2 font-medium text-blue-900">{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.user}</td>
                  <td>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        ticket.status === 'Open'
                          ? 'bg-green-100 text-green-700'
                          : ticket.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : ticket.status === 'Escalated'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.tags}</td>
                  <td>
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
              <h2 className="text-xl font-bold text-blue-800 mb-4">
                Ticket: {selectedTicket.subject}
              </h2>
              <p><strong>User:</strong> {selectedTicket.user}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>
              <p className="text-sm text-gray-600 mb-4">Submitted on {selectedTicket.date}</p>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border rounded mb-3"
                rows={4}
              />
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Internal note (admin only)"
                className="w-full p-3 border rounded mb-3"
                rows={2}
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-3"
              />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma separated)"
                className="w-full p-2 border rounded mb-3"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              >
                <option value="">Assign to...</option>
                <option value="Partner Staff">Partner Staff</option>
                <option value="Company Staff">Company Staff</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setSelectedTicket(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => {
                    alert('Ticket closed.');
                    setSelectedTicket(null);
                  }}
                >
                  Close
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => {
                    alert(`Escalated to ${assignTo || 'Partner Staff'}`);
                    setSelectedTicket(null);
                  }}
                >
                  Escalate
                </button>
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                  onClick={() => {
                    alert('Reply sent.');
                    setSelectedTicket(null);
                  }}
                >
                  Send Reply
                </button>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
