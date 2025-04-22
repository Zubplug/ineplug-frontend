// File: src/pages/admin/EditFormPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Plus, Trash2, Save } from "lucide-react";
import Sidebar from "../../components/admin/Sidebar";

export default function EditFormPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ label: "", name: "", type: "text", required: false, options: "" });
  const [formMeta, setFormMeta] = useState({ title: "", service_id: "" });

  useEffect(() => {
    if (slug !== "new") {
      axios.get(`http://127.0.0.1:8000/api/admin/forms/${slug}`)
        .then(res => {
          setFormMeta({ title: res.data.name, service_id: res.data.id });
          setFields(res.data.fields || []);
        });
    }
  }, [slug]);

  const addField = () => {
    const field = { ...newField };
    if (field.type === "select") {
      field.options = field.options.split(",").map(opt => opt.trim());
    } else {
      delete field.options;
    }
    setFields([...fields, field]);
    setNewField({ label: "", name: "", type: "text", required: false, options: "" });
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleSave = async () => {
    try {
      const payload = {
        slug,
        service_id: formMeta.service_id,
        name: formMeta.title,
        fields,
      };
      await axios.post("http://127.0.0.1:8000/api/admin/forms/save", payload);
      alert("Form saved!");
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">
          Edit Form for: {formMeta.title}
        </h1>

        {/* FIELD BUILDER */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">Add New Field</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              placeholder="Label (e.g. Full Name)"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Field Name (e.g. full_name)"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="file">File Upload</option>
              <option value="select">Select</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
          </div>

          {newField.type === "select" && (
            <input
              placeholder="Select options (comma separated)"
              value={newField.options}
              onChange={(e) => setNewField({ ...newField, options: e.target.value })}
              className="border p-2 rounded w-full mb-3"
            />
          )}

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
              />
              Required
            </label>
            <button onClick={addField} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1">
              <Plus size={14} /> Add Field
            </button>
          </div>
        </div>

        {/* FIELD LIST */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Form Preview</h2>
          {fields.length === 0 && <p className="text-sm text-gray-500">No fields added yet.</p>}
          {fields.map((field, i) => (
            <div key={i} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{field.label}</p>
                <p className="text-sm text-gray-600">
                  Name: {field.name} | Type: {field.type} {field.required && "| Required"}
                </p>
                {field.type === "select" && (
                  <p className="text-xs text-gray-500">Options: {field.options.join(", ")}</p>
                )}
              </div>
              <button onClick={() => removeField(i)} className="text-red-500 text-sm">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2">
            <Save size={16} /> Save Form
          </button>
        </div>
      </main>
    </div>
  );
}
