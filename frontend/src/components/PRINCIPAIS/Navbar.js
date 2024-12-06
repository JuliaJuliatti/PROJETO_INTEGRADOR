import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importando Link e useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importando ícone de logout
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate(); // Hook para navegação
    const token = localStorage.getItem("accessToken"); // Verifica se o token existe no localStorage

    const handleNavigation = (path) => {
        if (token) {
            navigate(path); // Navega apenas se o token existir
        } else {
            // Se não estiver autenticado, armazene o caminho desejado para redirecionar depois do login
            localStorage.setItem("next", path);
            navigate("/login"); // Redireciona para login
        }
    };

    const handleLogout = () => {
        // Remove o token e o refresh token do localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redireciona o usuário para a página de login
        navigate("/login");
    };

    return (
        <nav className="navbar">

              {/* Botão de Home */}
              <button onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHome} />
                </button>

            <button onClick={() => handleNavigation("/Luminosidade")}>Luminosidade</button>
            <button onClick={() => handleNavigation("/Umidade")}>Umidade</button>
            <button onClick={() => handleNavigation("/Temperatura")}>Temperatura</button>
            <button onClick={() => handleNavigation("/Contador")}>Contador</button>

            {/* Se o token existir, exibe o botão de logout */}
            {token ? (
                <button onClick={handleLogout} className="logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    
                </button>
            ) : (
                <Link to="/login" className="login-link">
                    <button>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        
                    </button>
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
