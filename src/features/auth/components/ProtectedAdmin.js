import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLoggedInUser } from '../authSlice';

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(user && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdmin;
