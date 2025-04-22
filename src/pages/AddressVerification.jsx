// src/pages/AddressVerification.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AddressVerification() {
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !file) {
      toast.error('Please fill all fields and upload a document.');
      return;
    }

    const formData = new FormData();
    formData.append('address', address);
    formData.append('document', file);

    setLoading(true);
    try {
      await api.post('/user/address-verification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Verification submitted successfully.');
      navigate('/settings');
    } catch (err) {
      toast.error('Error submitting verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Address Verification</h2>
      <p className="text-sm text-gray-600 mb-3">Make sure the uploaded document address matches your entered address.</p>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">Your Address</label>
        <textarea
          rows={3}
          className="w-full border rounded p-2 mb-4 text-sm"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your full residential address"
        />

        <label className="block mb-2 text-sm font-medium">Upload Document</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="w-full mb-4 text-sm"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
}
