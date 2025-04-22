// File: src/components/AdminProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const admin = JSON.parse(localStorage.getItem('adminUser'));

  if (!token || !admin || admin.role !== 'Admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
