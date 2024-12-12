import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { Link } from "react-router-dom";
import "./Login.css";
import backgroundImage from "./SENAI.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: formData.username,
        password: formData.password,
      });

      const { access, refresh } = response.data;

      // Armazenar os tokens no localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setSuccessMessage("Login realizado com sucesso!");
      setErrorMessage("");

      // Redireciona para a página home após o login
      navigate("/"); // Aqui você garante que o redirecionamento seja feito para /home
    } catch (error) {
      setErrorMessage("Usuário ou senha inválidos. Tente novamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-container">
      <div className="image-section" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="form-section">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
          <p className="cadastro">
          Ainda não possui cadastro? <Link to="/cadastro">Se cadastre aqui!</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
