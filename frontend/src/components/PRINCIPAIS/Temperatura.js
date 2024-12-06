// src/pages/Page1.js
import React from 'react';
import TemperaturaTable from '../TABELAS/temperatura/TemperaturaTabela';
import Navbar from './Navbar';

const Temperatura = () => {
  return(
 <div>
    <Navbar/>
    <TemperaturaTable>
    </TemperaturaTable>
</div>
  ) 
  
 
};

export default Temperatura;

// Repita para Page2, Page3, Page4, Page5, mudando apenas o texto
