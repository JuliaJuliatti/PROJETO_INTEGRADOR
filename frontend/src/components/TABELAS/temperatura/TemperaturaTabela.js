import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TemperaturaTabela.css' // Importe o arquivo CSS'

const TemperaturaTable = () => {
  const [temperaturas, setTemperaturas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/temperaturas/')
      .then(response => {
        setTemperaturas(response.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <div className="tabela-container">
      <h1>Dados de Temperatura</h1>
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sensor</th>
            <th>Temperatura (°C)</th>
            <th>Hora e Dia</th>
          </tr>
        </thead>
        <tbody>
          {temperaturas.map((item) => (
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

export default TemperaturaTable;
