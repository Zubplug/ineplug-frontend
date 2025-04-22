import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function DynamicFormPage() {
  const { slug } = useParams();
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/forms/${slug}`)
      .then(res => res.json())
      .then(data => {
        setFields(data.fields);
        setPrice(data.price);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Error loading form");
      });
  }, [slug]);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleFile = (e, name) => {
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id"); // Update if using context/auth

    const form = new FormData();
    form.append("service_slug", slug);
    form.append("user_id", userId);

    fields.forEach(field => {
      if (formData[field.name]) {
        form.append(`data[${field.name}]`, formData[field.name]);
      }
    });

    const res = await fetch("http://127.0.0.1:8000/api/submit-request", {
      method: 'POST',
      body: form
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Submission failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-gray-700">Loading form...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow">
        <h2 className="text-xl font-bold text-blue-900 mb-2 capitalize">{slug.replace(/-/g, ' ')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Please complete the form below to request this service. Total: <strong>₦{price}</strong>
        </p>

        {submitted ? (
          <p className="text-green-600 text-sm">✅ Your request was submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                {field.type === 'file' ? (
                  <input
                    type="file"
                    onChange={(e) => handleFile(e, field.name)}
                    className="w-full border p-2 rounded"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(e, field.name)}
                    className="w-full border p-2 rounded"
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
