// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ path, ...props }) => {
  return (
    <Route
      {...props}
      path={path}
      element={
        AuthService.isAuthenticated() ? (
          props.children
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
