import React from "react";
import { Navigate } from "react-router-dom";

const PartnerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("partnerToken") || sessionStorage.getItem("partnerToken");

  if (!token) {
    return <Navigate to="/partner/login" />;
  }

  return children;
};

export default PartnerProtectedRoute;
