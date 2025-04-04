import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import ApiService from "../../service/api";

export const ProtectedRoute = ({ children, requiredPermission }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Kiểm tra nếu có accessToken
  const { getCurrentUser, setCurrentUser } = useUserStore();
  const currentUser = getCurrentUser();

  console.log("protected route", currentUser);
  if (requiredPermission && Object.keys(currentUser).length !== 0) {
    const hasPermission = currentUser?.role?.permissions.some(
      (p) => p.name === requiredPermission
    );
    if (!hasPermission) {
      // console.log("no permission");

      return <Navigate to="/no-permission" replace />;
    }
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
