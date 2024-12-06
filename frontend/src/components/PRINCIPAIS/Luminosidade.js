// src/pages/Page1.js
import React from 'react';
import LuminosidadeTable from '../TABELAS/luminosidade/LuminosidadeTabela';
import Navbar from './Navbar';




const Luminosidade = () => {
  return (
    <div>
      <Navbar/>
      <LuminosidadeTable></LuminosidadeTable>
   
      
    </div>
  );
};

export default Luminosidade;
