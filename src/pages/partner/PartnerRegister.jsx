import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    referral_code: "",
    transaction_pin: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Registering...");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success("🎉 Registration successful!");
        localStorage.setItem("partnerToken", result.token); // ✅ Token stored correctly
        setTimeout(() => navigate("/partner/dashboard"), 1000); // ✅ Redirect to partner dashboard
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((msg) => toast.error(msg[0]));
        } else {
          toast.error(result.message || "Registration failed.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-center" />
      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-center text-blue-800 mb-4">Partner Staff Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="first_name" placeholder="First Name" required value={form.first_name} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="middle_name" placeholder="Middle Name" value={form.middle_name} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="last_name" placeholder="Last Name" required value={form.last_name} onChange={handleChange} className="border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange} className="border p-2 rounded" />
          <select name="gender" value={form.gender} onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="date" name="dob" required value={form.dob} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="referral_code" placeholder="Referral Code (Optional)" value={form.referral_code} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="transaction_pin" placeholder="Transaction PIN" required maxLength="6" value={form.transaction_pin} onChange={handleChange} className="border p-2 rounded" />
          <input type="password" name="password" placeholder="Password" required value={form.password} onChange={handleChange} className="border p-2 rounded" />
          <input type="password" name="password_confirmation" placeholder="Confirm Password" required value={form.password_confirmation} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="address" rows={3} placeholder="Residential Address" required value={form.address} onChange={handleChange} className="border p-2 rounded md:col-span-2" />

          <button type="submit" disabled={loading} className="bg-blue-700 text-white py-2 rounded font-semibold mt-2 md:col-span-2">
            {loading ? "Submitting..." : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
