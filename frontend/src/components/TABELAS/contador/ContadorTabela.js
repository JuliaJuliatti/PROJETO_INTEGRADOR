import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contador.css';

const TabelaContador = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        // Substitua pela URL da sua API Django
        axios.get('http://localhost:8000/api/contador/')
            .then(response => {
                setDados(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar os dados do contador:", error);
            });
    }, []);

    return (
        <div className='tabela-container'>
            <h2>Dados do Contador</h2>
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sensor</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.sensor}</td>
                            <td>{new Date(item.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaContador;
