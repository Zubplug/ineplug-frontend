// src/pages/admin/Settings.jsx
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaCog, FaSlidersH } from 'react-icons/fa';

export default function Settings() {
  const [kycLimits, setKycLimits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const levels = [0, 1, 2, 3];

  useEffect(() => {
    api.get('/admin/kyc-limits')
      .then(res => setKycLimits(res.data))
      .catch(() => toast.error('Failed to load KYC limits'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (level, field, value) => {
    const numericValue = value.replace(/\D/g, '');
    const updated = kycLimits.map(l =>
      l.kyc_level === level ? { ...l, [field]: numericValue } : l
    );
    setKycLimits(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/admin/kyc-limits/update', { limits: kycLimits });
      toast.success('KYC limits saved successfully.');
    } catch (err) {
      toast.error('Failed to save limits');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
        <span className="inline-block bg-blue-100 text-blue-600 p-2 rounded-full">
          <FaSlidersH />
        </span>
        KYC Level Transaction Limits
      </h2>

      <p className="text-gray-600 mb-4">
        Set the daily, monthly, and lifetime transaction limits for each KYC level. These limits apply globally across all services.
      </p>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="p-3 text-left">KYC Level</th>
              <th className="p-3">Daily Limit (₦)</th>
              <th className="p-3">Monthly Limit (₦)</th>
              <th className="p-3">Lifetime Limit (₦)</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {levels.map(level => {
              const row = kycLimits.find(l => l.kyc_level === level) || {
                kyc_level: level,
                daily_limit: '',
                monthly_limit: '',
                lifetime_limit: ''
              };
              return (
                <tr key={level} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-blue-900">Level {level}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-blue-500"
                      value={row.daily_limit !== undefined && row.daily_limit !== null ? row.daily_limit.toString() : ''}
                      onChange={(e) => handleChange(level, 'daily_limit', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-blue-500"
                      value={row.monthly_limit !== undefined && row.monthly_limit !== null ? row.monthly_limit.toString() : ''}
                      onChange={(e) => handleChange(level, 'monthly_limit', e.target.value)}
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-blue-500"
                      value={row.lifetime_limit !== undefined && row.lifetime_limit !== null ? row.lifetime_limit.toString() : ''}
                      onChange={(e) => handleChange(level, 'lifetime_limit', e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
