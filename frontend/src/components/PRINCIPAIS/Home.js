import React from "react";
import Navbar from "./Navbar"; // Importando o componente Navbar
import './Home.css'; // Importando o CSS
 import SmartCity from './SENAI.png'





const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <h1>Seja Bem-Vindo no portal da <span>Smart City</span></h1>
            
            <div className="home-content">
                {/* Texto do lado esquerdo */}
                <div className="text-section">
                    <h2>Explorando o futuro das Cidades Inteligentes</h2>
                    <p>
                        Bem-vindo ao portal da Smart City. Aqui, você poderá visualizar dados importantes sobre o ambiente
                        e interagir com sistemas inteligentes que estão transformando as cidades do futuro.
                    </p>
                    <p>
                        Explore informações sobre luminosidade, temperatura, umidade e muito mais. Navegue por nosso portal
                        e descubra como a tecnologia pode ajudar a criar cidades mais inteligentes e sustentáveis.
                    </p>
                </div>

                {/* Imagem do lado direito */}
                <div className="image-section">
                    <img src={SmartCity} alt="Smart City" />
                </div>

            </div>
        
        </div>
    );
};

export default Home;
