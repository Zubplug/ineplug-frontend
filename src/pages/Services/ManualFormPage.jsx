import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterNav from "../../components/FooterNav";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ManualFormPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    NProgress.start();
    axios.get(`http://127.0.0.1:8000/api/forms/${slug}`)
      .then(res => {
        setFormConfig(res.data);
        NProgress.done();
      })
      .catch(err => {
        console.error(err);
        NProgress.done();
      });
  }, [slug]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    NProgress.start();
    try {
      await axios.post("http://127.0.0.1:8000/api/submit-request", {
        service_slug: slug,
        user_id: userId,
        data: formData,
      });
      NProgress.done();
      alert("Request submitted successfully");
      navigate("/my-requests");
    } catch (err) {
      NProgress.done();
      alert("Something went wrong!");
      console.error(err);
    }
  };

  if (!formConfig) return <div className="p-6 text-center">Loading form...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
      <div className="p-4 md:p-8 pb-32">
        <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">← Go Back</button>
        <h1 className="text-xl font-bold mb-6 text-blue-900 dark:text-white">{formConfig.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formConfig.fields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
              </label>
              {field.type === "text" && (
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  onChange={e => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              )}
              {field.type === "select" && (
                <select
                  className="w-full p-2 border rounded"
                  onChange={e => handleChange(field.name, e.target.value)}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {field.type === "file" && (
                <input
                  type="file"
                  onChange={e => handleChange(field.name, e.target.files[0])}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded">
            Submit Request (₦{formConfig.price})
          </button>
        </form>
      </div>
      <FooterNav />
    </div>
  );
};

export default ManualFormPage;
