import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Luminosidade.css'; // Importe o arquivo CSS para estilização
import Navbar from '../../PRINCIPAIS/Navbar';

const LuminosidadeTable = () => {
  const [luminosidade, setLuminosidade] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/luminosidade/')
      .then(response => {
        setLuminosidade(response.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os dados de luminosidade:', error);
      });
  }, []);

  return (
    
    <div className="tabela-container">
      <Navbar></Navbar>
      <h2>Dados de Luminosidade</h2>
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sensor</th>
            <th>Luminosidade (Lux)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {luminosidade.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sensor}</td>
              <td>{item.valor}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LuminosidadeTable;

// pedir amanha para criar as outras tabelas 
// - mostrar o model e pedir essa tabela como exemplo