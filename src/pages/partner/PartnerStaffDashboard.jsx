import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Wallet,
  ClipboardCheck,
  BarChart3,
  LogOut,
  Upload,
  Briefcase,
  FileText,
  ChevronRight,
  Bell
} from 'lucide-react';

export default function PartnerStaffDashboard() {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Sample Stats
  const wallet = 75000;
  const commission = 15250;
  const jobsAssigned = 60;
  const jobsCompleted = 54;
  const successRate = ((jobsCompleted / jobsAssigned) * 100).toFixed(1);

  const notifications = {
    jobs: 3,
    support: 2,
  };

  const jobFeed = [
    { id: 'REQ-201', title: 'NIN Correction', user: 'David Mark' },
    { id: 'REQ-202', title: 'BVN Fix', user: 'Grace Johnson' },
    { id: 'REQ-203', title: 'CAC Update', user: 'Emeka Obi' },
  ];

  // ✅ Session Protection
  useEffect(() => {
    const token = localStorage.getItem("partnerToken") || sessionStorage.getItem("partnerToken");
    if (!token) {
      navigate("/partner/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("partnerToken");
    sessionStorage.removeItem("partnerToken");
    window.location.href = "/partner/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-blue-900 text-white w-full lg:w-64 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">Partner Panel</h1>
          <nav className="space-y-4 text-sm">
            <Link to="/partner/dashboard" className="flex items-center gap-2 hover:text-blue-200"><BarChart3 size={18} /> Dashboard</Link>
            <Link to="/partner/claim-jobs" className="flex items-center gap-2 hover:text-blue-200"><ClipboardCheck size={18} /> Claim Jobs</Link>
            <Link to="/partner/my-jobs" className="flex items-center gap-2 hover:text-blue-200"><FileText size={18} /> My Jobs</Link>
            <Link to="/partner/upload-results" className="flex items-center gap-2 hover:text-blue-200"><Upload size={18} /> Upload Results</Link>
            <Link to="/partner/transfer" className="flex items-center gap-2 hover:text-blue-200"><Wallet size={18} /> Bank Transfer</Link>
            <Link to="/partner/transactions" className="flex items-center gap-2 hover:text-blue-200"><FileText size={18} /> Transactions</Link>
            <Link to="/partner/support" className="flex items-center gap-2 hover:text-blue-200"><Briefcase size={18} /> Support</Link>
            <Link to="/partner/kyc" className="flex items-center gap-2 hover:text-blue-200"><FileText size={18} /> KYC & Verification</Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 mt-10 text-sm text-red-300 hover:text-white">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Welcome, Inemesit Akpan</h2>
            <p className="text-sm text-gray-600">(Partner Staff)</p>
          </div>
          <div className="relative">
            <Bell className="text-blue-700" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 text-center leading-5">
              {notifications.jobs + notifications.support}
            </span>
          </div>
        </div>

        {/* Wallet & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Main Wallet</p>
            <h3 className="text-2xl font-bold text-blue-800">₦{wallet.toLocaleString()}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow text-center relative">
            <p className="text-sm text-gray-600">Commission</p>
            <h3 className="text-2xl font-bold text-green-700">₦{commission.toLocaleString()}</h3>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="absolute top-3 right-3 text-xs text-blue-600 hover:underline"
            >
              Withdraw
            </button>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Jobs Completed</p>
            <h3 className="text-2xl font-bold text-indigo-700">{jobsCompleted}</h3>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-600">Success Rate</p>
            <h3 className="text-2xl font-bold text-yellow-600">{successRate}%</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-md font-bold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/partner/upload-results" className="bg-blue-50 rounded-xl p-4 shadow hover:-translate-y-1 transition-all duration-200 text-center">
              <Upload size={28} className="mx-auto text-blue-600" />
              <p className="font-medium mt-2 text-blue-800">Upload Results</p>
            </Link>
            <Link to="/partner/transfer" className="bg-green-50 rounded-xl p-4 shadow hover:-translate-y-1 transition-all duration-200 text-center">
              <Wallet size={28} className="mx-auto text-green-600" />
              <p className="font-medium mt-2 text-green-800">Bank Transfer</p>
            </Link>
            <Link to="/partner/support" className="bg-yellow-50 rounded-xl p-4 shadow hover:-translate-y-1 transition-all duration-200 text-center">
              <Briefcase size={28} className="mx-auto text-yellow-600" />
              <p className="font-medium mt-2 text-yellow-800">Support</p>
            </Link>
            <Link to="/partner/claim-jobs" className="bg-indigo-50 rounded-xl p-4 shadow hover:-translate-y-1 transition-all duration-200 text-center">
              <ClipboardCheck size={28} className="mx-auto text-indigo-600" />
              <p className="font-medium mt-2 text-indigo-800">Claim Jobs</p>
            </Link>
          </div>
        </div>

        {/* Virtual Account */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Virtual Account</h3>
          <p className="text-sm">Account Number: <span className="text-blue-800 font-medium">7030574761</span></p>
          <p className="text-sm">Bank: <span className="text-blue-800 font-medium">Moniepoint MFB</span></p>
        </div>

        {/* Job Feed */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-bold text-gray-800">Live Job Feed</h3>
            <Link to="/partner/claim-jobs" className="text-blue-700 text-sm flex items-center gap-1 hover:underline">
              View More <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x">
            {jobFeed.map((job, idx) => (
              <div key={idx} className="bg-white min-w-[220px] p-4 rounded shadow snap-start">
                <p className="text-blue-800 font-medium">{job.title}</p>
                <p className="text-sm text-gray-600">User: {job.user}</p>
                <Link to="/partner/claim-jobs" className="mt-2 inline-block text-xs text-blue-600 underline">Claim</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Withdraw Commission</h3>
              <p className="text-sm text-gray-600 mb-4">Withdraw ₦{commission.toLocaleString()} to your wallet?</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowWithdrawModal(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                <button onClick={() => { setShowWithdrawModal(false); alert('Withdrawal successful!') }} className="bg-green-600 text-white px-4 py-2 rounded">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
