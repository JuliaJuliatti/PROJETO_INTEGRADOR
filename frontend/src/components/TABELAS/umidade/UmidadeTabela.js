import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TabelaUmidade = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        // Substitua a URL pela URL da sua API Django
        axios.get('http://localhost:8000/api/umidade/')
            .then(response => {
                setDados(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar os dados:", error);
            });
    }, []);

    return (
        <div className='tabela-container'>
            <h2>Dados de Umidade</h2>
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sensor</th>
                        <th>Valor (%)</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
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
};

export default TabelaUmidade;
