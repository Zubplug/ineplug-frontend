import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AggregatorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      toast.loading("Logging in...");

      const response = await fetch("http://127.0.0.1:8000/api/aggregator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success("✅ Login successful!");

        const token = result.token;
        const user = result.user;

        if (formData.remember) {
          localStorage.setItem("aggregatorToken", token);
          localStorage.setItem("aggregator", JSON.stringify(user));
        } else {
          sessionStorage.setItem("aggregatorToken", token);
          sessionStorage.setItem("aggregator", JSON.stringify(user));
        }

        setTimeout(() => {
          navigate("/aggregator/dashboard");
        }, 1000);
      } else {
        toast.error(result.message || "❌ Login failed");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-blue-900">Aggregator Login</h2>
          <p className="text-sm text-gray-500">Secure access to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type={formData.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="showPassword"
                checked={formData.showPassword}
                onChange={handleChange}
                className="mr-2"
              />
              Show Password
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${
              loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
            } text-white rounded-lg font-semibold`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AggregatorLogin;
