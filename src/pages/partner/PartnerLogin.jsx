// src/pages/Partner/PartnerLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    showPassword: false,
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('partnerToken') || sessionStorage.getItem('partnerToken');
    if (token) navigate('/partner/dashboard');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      toast.loading('🔐 Logging in...');

      const response = await fetch('http://127.0.0.1:8000/api/partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const result = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success('✅ Login successful!');
        const token = result.token;
        if (formData.remember) {
          localStorage.setItem('partnerToken', token);
        } else {
          sessionStorage.setItem('partnerToken', token);
        }
        setTimeout(() => {
          navigate('/partner/dashboard');
        }, 1000);
      } else {
        toast.error(result.message || '❌ Login failed');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('❌ Server error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Partner Login" className="h-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-700">Partner Login</h2>
          <p className="text-sm text-gray-500">Log into your Partner account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email or Phone</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" name="showPassword" checked={formData.showPassword} onChange={handleChange} className="mr-2" />
              Show Password
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} className="mr-2" />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg font-semibold`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have a Partner account?{' '}
            <a href="/partner/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;
