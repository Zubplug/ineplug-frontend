import React, { useState } from "react";

const RequestFormModal = ({ isOpen, onClose, serviceName }) => {
  const [selectedSub, setSelectedSub] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    document: null,
  });

  const isSubService = serviceName?.isSubService;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      service: isSubService ? selectedSub?.name : serviceName?.title,
      price: isSubService ? selectedSub?.price : serviceName?.price,
    };
    console.log("Submitted Request:", payload);
    onClose(); // Optional: replace with actual API call
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-[90%] max-w-xl p-6 overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-white">
          Request: {serviceName?.title}
        </h3>

        {/* Step 1: If sub-service, show options first */}
        {isSubService && !selectedSub ? (
          <>
            <p className="text-sm mb-3 text-gray-700 dark:text-white">Select a service type:</p>
            <div className="space-y-2">
              {serviceName.subServices.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSub(item)}
                  className="w-full text-left p-3 rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  <strong>{item.name}</strong> — ₦{item.price}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-6 text-sm text-red-500 hover:underline block text-center"
            >
              Cancel
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summary */}
            <div className="text-sm text-gray-700 dark:text-white">
              Service: <strong>{isSubService ? selectedSub?.name : serviceName?.title}</strong><br />
              Price: <strong>₦{isSubService ? selectedSub?.price : serviceName?.price}</strong>
            </div>

            {/* Form Inputs */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Any instructions or delivery details?"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="block text-sm dark:text-white"
            />

            <div className="flex justify-between pt-3">
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestFormModal;
