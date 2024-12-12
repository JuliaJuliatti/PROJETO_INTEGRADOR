import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/PRINCIPAIS/Home";
import Login from "./components/PRINCIPAIS/Login";
import Cadastro from "./components/PRINCIPAIS/Cadastro";
import Luminosidade from "./components/PRINCIPAIS/Luminosidade";
import Umidade from "./components/PRINCIPAIS/Umidade";
import Temperatura from "./components/PRINCIPAIS/Temperatura";
import Contador from "./components/PRINCIPAIS/Contador";

const Routers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && window.location.pathname !== '/cadastro') {
      // Se não houver token e não for a página de cadastro, redireciona para login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} /> {/* Acesso ao cadastro */}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/Luminosidade" element={<Luminosidade />} />
      <Route path="/Umidade" element={<Umidade />} />
      <Route path="/Temperatura" element={<Temperatura />} />
      <Route path="/Contador" element={<Contador />} />
    </Routes>
  );
};

export default Routers;
