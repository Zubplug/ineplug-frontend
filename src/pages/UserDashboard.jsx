import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(0);
  const [user, setUser] = useState(null);
  const [identityType, setIdentityType] = useState("bvn");
  const [identityValue, setIdentityValue] = useState("");
  const [showIdModal, setShowIdModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        if (!res.data.virtual_account_number) {
          setTimeout(() => setShowPromptModal(true), 1000);
        }
      })
      .catch(() => navigate("/login"));

    setWallet(73000);

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [navigate]);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  };

  const handleSubmitIdentity = async () => {
    if (!identityValue || identityValue.length !== 11) {
      toast.error("Enter a valid 11-digit " + identityType.toUpperCase());
      return;
    }

    try {
      setLoadingAccount(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/generate-account",
        { type: identityType, value: identityValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );

      toast.success("Virtual Account Generated!");
      const account = res.data.account;
      setUser(prev => ({
        ...prev,
        virtual_account_number: account.accountNumber,
        bank_name: account.bankName,
      }));
      setShowIdModal(false);
      setShowPromptModal(false);
      setIdentityValue("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating account");
    } finally {
      setLoadingAccount(false);
    }
  };

  if (!user) return <div className="p-6 text-center text-sm">Loading dashboard...</div>;

  return (
    <DashboardLayout>
      {/* Prompt modal after login */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Welcome!</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              To enjoy wallet funding, transfers, and seamless services, kindly generate your virtual account now.
            </p>
            <button
              onClick={() => {
                setShowIdModal(true);
                setShowPromptModal(false);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded text-sm"
            >
              Generate Virtual Account
            </button>
          </div>
        </div>
      )}

      {/* Main ID input modal */}
      {showIdModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-md font-semibold mb-2 text-gray-700 dark:text-white">Generate Virtual Account</h2>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Choose ID Type</label>
            <select
              value={identityType}
              onChange={(e) => setIdentityType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm mb-3"
            >
              <option value="bvn">BVN</option>
              <option value="nin">NIN</option>
            </select>

            <input
              type="text"
              maxLength="11"
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm mb-3"
              placeholder={`Enter 11-digit ${identityType.toUpperCase()}`}
              value={identityValue}
              onChange={(e) => setIdentityValue(e.target.value)}
            />

            <button
              onClick={handleSubmitIdentity}
              disabled={loadingAccount}
              className="w-full bg-blue-600 text-white py-2 rounded text-sm flex items-center justify-center"
            >
              {loadingAccount ? "Processing..." : "Submit"}
            </button>
            <button onClick={() => setShowIdModal(false)} className="w-full mt-2 text-sm text-red-500">Cancel</button>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-300">Good morning,</h2>
          <h1 className="text-xl font-bold text-blue-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">({user.role})</p>
        </div>
        <div className="flex gap-4 items-center">
          <a href="/notifications" className="relative">
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">3</span>
            <svg className="w-6 h-6 text-blue-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A2 2 0 0118 14v-3a6 6 0 00-4-5.7V4a2 2 0 00-4 0v1.3A6 6 0 006 11v3c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </a>
          <button onClick={toggleTheme} className="text-xs border px-2 py-1 rounded dark:text-white text-gray-800 dark:border-gray-500 border-gray-300">
            Toggle Theme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-900 text-white p-4 rounded-xl shadow">
          <h4 className="text-xs">Wallet Balance</h4>
          <p className="text-2xl font-bold mt-1">₦{wallet.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border shadow border-gray-200 dark:border-gray-600">
          <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-1">Virtual Account</h4>
          {user.virtual_account_number ? (
            <>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{user.virtual_account_number}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{user.virtual_account_bank}</span>
                <button onClick={() => navigator.clipboard.writeText(user.virtual_account_number)} className="text-blue-700 hover:underline">Copy</button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowIdModal(true)}
              className="bg-blue-600 text-white px-3 py-2 mt-2 text-xs rounded"
            >
              Generate Virtual Account
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Transfer</h4>
        <div className="flex gap-3 flex-col md:flex-row">
          <Link to="/bank-transfer" className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Transfer to Bank</Link>
          <Link to="/ineplug-transfer" className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Ineplug Transfer</Link>
        </div>
      </div>

      <div className="mb-20">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Services</h4>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[
            { name: 'VTU', icon: '📱', link: '/services/vtu' },
            { name: 'CAC', icon: '📄', link: '/services/cac' },
            { name: 'BVN', icon: '🔍', link: '/services/bvn' },
            { name: 'NIMC', icon: '🪪', link: '/services/nimc' },
            { name: 'Food', icon: '🍔', link: '/services/food' },
            { name: 'Banking', icon: '🏦', link: '/services/banking' },
            { name: 'Compliance', icon: '✅', link: '/services/compliance' },
            { name: 'Services', icon: '🛠️', link: '/services/general' },
            { name: 'More', icon: '➕', link: null },
          ].map((service, index) => {
            const card = (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 text-center hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-300 transform hover:scale-105 cursor-pointer">
                <div className="text-xl mb-1">{service.icon}</div>
                <p className="text-xs text-blue-900 dark:text-white font-semibold">{service.name}</p>
              </div>
            );
            return (
              <div key={index}>
                {service.link ? <Link to={service.link}>{card}</Link> : card}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-2 flex justify-between text-xs text-gray-700 dark:text-gray-200 md:text-sm z-50">
        <Link to="/dashboard" className="flex flex-col items-center">
          <span>🏠</span><span>Home</span>
        </Link>
        <Link to="/transactions" className="flex flex-col items-center">
          <span>⏱</span><span>Transactions</span>
        </Link>
        <Link to="/my-requests" className="flex flex-col items-center">
          <span>📄</span><span>My Requests</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center">
          <span>⚙️</span><span>Settings</span>
        </Link>
      </div>
    </DashboardLayout>
  );
}
