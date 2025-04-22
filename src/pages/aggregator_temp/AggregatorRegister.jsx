import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AggregatorRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    referral_code: '',
    transaction_pin: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Registering Aggregator...");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/aggregator/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success("✅ Registration successful!");
        localStorage.setItem("aggregatorToken", result.token);
        setTimeout(() => navigate("/aggregator/dashboard"), 1000);
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((msg) => toast.error(msg[0]));
        } else {
          toast.error(result.message || "Registration failed.");
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-center text-blue-800 mb-4">Aggregator Registration</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="middle_name" placeholder="Middle Name" value={form.middle_name} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border p-2 rounded" required />
          <select name="gender" value={form.gender} onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="referral_code" placeholder="Referral Code (Optional)" value={form.referral_code} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="transaction_pin" placeholder="Transaction PIN" value={form.transaction_pin} onChange={handleChange} maxLength={6} className="border p-2 rounded" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 rounded" required />
          <input type="password" name="password_confirmation" placeholder="Confirm Password" value={form.password_confirmation} onChange={handleChange} className="border p-2 rounded" required />
          <textarea name="address" placeholder="Residential Address" value={form.address} onChange={handleChange} className="border p-2 rounded md:col-span-2" rows={3} required></textarea>

          <button type="submit" disabled={loading} className="bg-blue-700 text-white py-2 rounded font-semibold mt-2 md:col-span-2">
            {loading ? "Submitting..." : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AggregatorRegister;
