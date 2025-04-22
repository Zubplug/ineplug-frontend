import React from 'react';
import { Navigate } from 'react-router-dom';

const AggregatorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('aggregatorToken') || sessionStorage.getItem('aggregatorToken');
  return token ? children : <Navigate to="/aggregator/login" />;
};

export default AggregatorProtectedRoute;
