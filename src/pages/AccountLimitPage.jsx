// src/pages/AccountLimitPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

export default function AccountLimitPage() {
  const [user, setUser] = useState(null);
  const [limits, setLimits] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeId, setUpgradeId] = useState('');
  const [dob, setDob] = useState('');

  const kycLevels = {
    0: 'Level 0 – Default',
    1: 'Level 1 – NIN or BVN Verified',
    2: 'Level 2 – NIN + BVN',
    3: 'Level 3 – Address Verified (Agent)',
  };

  const fetchUser = async () => {
    try {
      const res = await api.get('/user');
      setUser(res.data);
    } catch (err) {
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchLimits = async () => {
    try {
      const res = await api.get('/kyc-limits');
      setLimits(res.data);
    } catch {
      toast.error('Failed to load transaction limits');
    }
  };

  const handleUpgrade = async () => {
    if (!upgradeId || !dob) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      const endpoint = user.bvn ? '/verify-nin' : '/verify-bvn';
      await api.post(endpoint, {
        value: upgradeId,
        dob: dob
      });
      toast.success('Verification successful. You are now Level 2.');
      setShowUpgradeModal(false);
      fetchUser();
    } catch (err) {
      toast.error('Verification failed. Please check details.');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchLimits();
  }, []);

  if (loading || !user) return <div className="p-4 text-center">Loading...</div>;

  const currentLimit = limits[user.kyc_level];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-blue-800 mb-4">KYC & Account Limit</h2>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-blue-700 mb-1">Account Status</h3>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>KYC Level:</strong> {kycLevels[user.kyc_level] || 'N/A'}</p>
        <p><strong>Address Verified:</strong> {user.address_verified ? 'Yes' : 'No'}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-blue-700 mb-1">Transaction Limits</h3>
        {currentLimit ? (
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
            <li>Max Per Transaction: ₦{parseInt(currentLimit.max).toLocaleString()}</li>
            <li>Daily Limit: ₦{parseInt(currentLimit.daily).toLocaleString()}</li>
            <li>Lifetime Limit: ₦{parseInt(currentLimit.lifetime).toLocaleString()}</li>
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Unlimited or not set</p>
        )}
      </div>

      {user.kyc_level < 2 && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-4 mb-6">
          <p>You need to complete both BVN and NIN verification to upgrade to Level 2.</p>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upgrade to Level 2
          </button>
        </div>
      )}

      {user.kyc_level === 2 && !user.address_verified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-blue-700 mb-2">Upgrade to Level 3 (Agent)</h4>
          <p className="mb-3 text-sm">Submit your address and document for manual verification to become an agent.</p>
          <Link
            to="/address-verification"
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            Verify Address
          </Link>
        </div>
      )}

      {user.kyc_level === 3 && (
        <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4">
          <p>Your account is fully verified and you're eligible for agent-level benefits.</p>
        </div>
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-3">Upgrade to Level 2</h3>
            <p className="text-sm mb-2">Please enter your {user.bvn ? 'NIN' : 'BVN'} and Date of Birth.</p>

            <input
              type="text"
              maxLength="11"
              placeholder={`Enter ${user.bvn ? 'NIN' : 'BVN'}`}
              value={upgradeId}
              onChange={(e) => setUpgradeId(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpgrade}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-sm text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
