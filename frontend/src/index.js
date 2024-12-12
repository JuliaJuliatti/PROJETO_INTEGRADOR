// index.js
import React from "react";
import ReactDOM from "react-dom/client";  // Usando 'createRoot' no React 18+
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";  // Importando o Router do React Router

// Envolva o App inteiro com o Router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
