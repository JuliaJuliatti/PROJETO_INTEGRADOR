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
        email: formData.email,
        password: formData.password,
      });

      // Verifique a resposta aqui (console.log)
      console.log("Cadastro realizado com sucesso:", response.data);

      setSuccessMessage("Cadastro realizado com sucesso! Faça login para continuar.");
      setErrorMessage("");

      // Redirecionamento para a página de login
      navigate("/login");

    } catch (error) {
      console.log("Erro no cadastro:", error);
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
