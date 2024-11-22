import React from "react";
import { Navigate } from "react-router-dom";

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // Se não houver token, redireciona para o login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se houver token, renderiza o componente protegido
  return children;
};

export default ProtectedRoute;
