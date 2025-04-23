import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const CreatePinScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(formData.password)) {
      toast.error('Password must be 8+ chars with uppercase, lowercase, number & symbol');
      return;
    }

    if (pin.length !== 4 || isNaN(pin)) {
      toast.error('Enter a valid 4-digit PIN');
      return;
    }

    if (pin !== confirmPin) {
      toast.error("PINs don't match");
      return;
    }

    const finalPayload = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      address: formData.address,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      referralCode: formData.referralCode,
      transactionPin: pin,
    };

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('✅ Registration Successful! Redirecting...');
        setShowConfetti(true);
        localStorage.setItem('token', result.token);
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('❌ Server error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-10 relative">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={400} />}
      <Toaster position="top-center" />

      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create Transaction PIN</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Your 4-digit PIN will secure wallet transfers and sensitive actions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Enter 4-digit PIN</label>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border rounded px-3 py-2"
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm PIN</label>
            <input
              type="password"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full border rounded px-3 py-2"
              inputMode="numeric"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded font-semibold`}
          >
            {loading ? 'Submitting...' : 'Finish Registration'}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreatePinScreen;
