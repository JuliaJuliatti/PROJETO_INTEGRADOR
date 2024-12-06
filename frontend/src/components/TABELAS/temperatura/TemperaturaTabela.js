import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './TemperaturaTabela.css';
import styles from './TemperaturaTabela.module.css';


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
    <div className={styles['tabela-container']}>
      <h1>Dados de Temperatura</h1>
      <table className={styles['tabela']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Localização</th>
            <th>Temperatura (°C)</th>
            <th>Unidade de Medida</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Responsável</th>
            <th>Status Operacional</th>
            <th>Observação</th>
            <th>MAC Address</th>
            <th>Hora e Dia</th>
          </tr>
        </thead>
        <tbody>
          {temperaturas.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.localizacao}</td>
              <td>{item.valor}</td>
              <td>{item.unidade_medida}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.responsavel}</td>
              <td>{item.status_operacional ? 'Ativo' : 'Inativo'}</td>
              <td>{item.observacao}</td>
              <td>{item.mac_address}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default TemperaturaTable;
