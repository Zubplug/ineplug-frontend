import React from "react";
import {
  LogOut,
  Wallet,
  Users,
  BarChart3,
  Copy,
  Link as LinkIcon,
  Banknote,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AggregatorDashboard() {
  const referralLink = "https://ineplug.com/referral/aggregator123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Commission Earned',
        data: [5000, 8000, 12000, 7000, 10000],
        backgroundColor: '#3b82f6',
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2000 },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-800 mb-8">Aggregator Panel</h1>
          <nav className="space-y-4 text-sm text-blue-800 font-medium">
            <a href="/aggregator/dashboard" className="flex items-center gap-2 bg-blue-100 px-2 py-1 rounded text-blue-900 font-semibold"><BarChart3 size={18} /> Dashboard</a>
            <a href="/aggregator/users" className="flex items-center gap-2 hover:text-blue-600"><Users size={18} /> Referred Users</a>
            <a href="/aggregator/referral-tree" className="flex items-center gap-2 hover:text-blue-600"><LinkIcon size={18} /> Referral Tree</a>
          </nav>
        </div>
        <div>
          <hr className="my-4 border-gray-200" />
          <a href="/aggregator/logout" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
            <LogOut size={16} /> Logout
          </a>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Welcome, Aggregator</h2>
          <p className="text-sm text-gray-500">You are Rank #4 in your Referral Chain</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-600">Commission Wallet</p>
            <h3 className="text-2xl font-bold text-green-700 mt-1">₦152,500</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-600">Total Referred Users</p>
            <h3 className="text-2xl font-bold text-blue-700 mt-1">88</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-600">Referred Partners</p>
            <h3 className="text-2xl font-bold text-indigo-700 mt-1">23</h3>
          </div>
        </div>

        {/* Withdraw and Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Withdraw Commission</h4>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
              onClick={() => alert("Redirect to withdrawal flow")}
            >
              <Banknote size={16} /> Withdraw to Bank
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Your Referral Link</h4>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 px-4 py-2 border rounded text-sm mr-2"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-1"
              >
                <Copy size={14} /> Copy
              </button>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Earnings Overview</h4>
          <Bar data={chartData} options={chartOptions} height={200} />
        </div>

        {/* Recent Users */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Referred Users</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-600 border-b">
                <tr>
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "David Mark", email: "david@example.com", type: "User", amount: "₦500" },
                  { name: "Grace Smith", email: "grace@domain.com", type: "Partner", amount: "₦1000" },
                ].map((ref, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{ref.name}</td>
                    <td>{ref.email}</td>
                    <td className="capitalize">{ref.type}</td>
                    <td className="text-green-700 font-semibold">{ref.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
