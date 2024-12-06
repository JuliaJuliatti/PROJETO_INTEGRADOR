import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/PRINCIPAIS/Home";
import Login from "./components/PRINCIPAIS/Login";
import Luminosidade from "./components/PRINCIPAIS/Luminosidade";
import Umidade from "./components/PRINCIPAIS/Umidade";
import Temperatura from "./components/PRINCIPAIS/Temperatura";
import Contador from "./components/PRINCIPAIS/Contador";
import ProtectedRoute from "./components/PRINCIPAIS/ProtectedRoute";
import Cadastro from "./components/PRINCIPAIS/Cadastro";

const Routers = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Home />} />
      
        {/* Usando ProtectedRoute para proteger as rotas */}
        <Route
          path="/Luminosidade"
          element={
            <ProtectedRoute>
              <Luminosidade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Umidade"
          element={
            <ProtectedRoute>
              <Umidade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Temperatura"
          element={
            <ProtectedRoute>
              <Temperatura />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contador"
          element={
            <ProtectedRoute>
              <Contador />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;
