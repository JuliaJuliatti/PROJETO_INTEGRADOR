import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";  // Importando o arquivo CSS
import backgroundImage from "./SENAI.png";  // A imagem de fundo

const Cadastro = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/registro/", {
        username: formData.username,
        email: formData.email,  // Enviando o campo email agora
        password: formData.password,  
      });

      setSuccessMessage("Cadastro realizado com sucesso! Faça login para continuar.");
      setErrorMessage("");

      // Após o cadastro bem-sucedido, redireciona para a tela de login
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Aguarda 2 segundos para mostrar a mensagem de sucesso antes de redirecionar

    } catch (error) {
      setErrorMessage("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="image-section" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="form-section">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
