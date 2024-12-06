import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Luminosidade.module.css';
//  import Navbar from '../../PRINCIPAIS/Navbar';

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
    <div className={styles['tabela-container']}>
      <h1>Dados de Luminosidade</h1>
      <table className={styles["tabela"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Localização</th>
            <th>Luminosidade</th>
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
          {luminosidade.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.localizacao}</td> {/* Localização do sensor */}
              <td>{item.valor}</td> {/* Temperatura medida */}
              <td>{item.unidade_medida}</td> {/* Unidade de medida (°C, °F, etc.) */}
              <td>{item.latitude}</td> {/* Latitude do sensor */}
              <td>{item.longitude}</td> {/* Longitude do sensor */}
              <td>{item.responsavel}</td> {/* Responsável pelo sensor */}
              <td>{item.status_operacional ? 'Ativo' : 'Inativo'}</td> {/* Status operacional */}
              <td>{item.observacao}</td> {/* Observações sobre o sensor */}
              <td>{item.mac_address}</td> {/* MAC Address */}
              <td>{new Date(item.timestamp).toLocaleString()}</td> {/* Formatação da data de timestamp */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LuminosidadeTable;
