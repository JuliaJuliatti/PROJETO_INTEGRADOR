// src/pages/Page1.js
import React from 'react';
import TabelaContador from '../TABELAS/contador/ContadorTabela';
import Navbar from './Navbar';

const Contador = () => {
  return (
  <div>
    <Navbar/>
    <TabelaContador> </TabelaContador>
    </div>
  )
  
};

export default Contador;

// Repita para Page2, Page3, Page4, Page5, mudando apenas o texto
