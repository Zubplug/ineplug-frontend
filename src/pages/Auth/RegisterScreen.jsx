import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') evaluatePasswordStrength(value);
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length < 6) strength = 'Too short';
    else if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) strength = 'Strong';
    else if (password.match(/[a-zA-Z]/) && password.match(/[0-9]/)) strength = 'Medium';
    setPasswordStrength(strength);
  };

  const nextStep = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (let field of requiredFields) {
      if (!formData[field]) return toast.error(`Please fill out ${field}`);
    }
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const goToCreatePin = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
    if (passwordStrength === 'Too short' || passwordStrength === 'Weak') return toast.error('Password is not strong enough');

    setLoading(true);
    setTimeout(() => {
      navigate('/create-pin', { state: { formData } });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-2">Create Your Ineplug Account</h2>
        <p className="text-sm text-red-500 text-center mb-6">Ensure all details match your BVN and NIN. KYC verification will be required.</p>
        <form onSubmit={goToCreatePin} className="space-y-4">
          {step === 1 && (
            <>
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="middleName" placeholder="Middle Name (optional)" value={formData.middleName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <button type="button" onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold mt-2">Next</button>
              <p className="text-sm text-center mt-4">Already have an account? <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
            </>
          )}

          {step === 2 && (
            <>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="date" name="dob" value={formData.dob} max={new Date().toISOString().split("T")[0]} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border rounded px-3 py-2" required />

              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-sm text-blue-500 cursor-pointer">{showPassword ? 'Hide' : 'Show'}</span>
              </div>
              {formData.password && (
                <p className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>Password Strength: {passwordStrength}</p>
              )}

              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              <input name="referralCode" placeholder="Referral Code (optional)" value={formData.referralCode} onChange={handleChange} className="w-full border rounded px-3 py-2" />

              <div className="flex justify-between mt-6">
                <button type="button" onClick={prevStep} className="bg-gray-200 text-black px-6 py-2 rounded">Back</button>
                <button type="submit" disabled={loading} className={`px-6 py-2 rounded font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>{loading ? 'Loading...' : 'Continue'}</button>
              </div>
              <p className="text-sm text-center mt-4">Already have an account? <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
