import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  // Estado para armazenar as opções e a série de dados do gráfico
  const [state, setState] = useState({
    series: [{
      name: 'Temperatura (°C)', // Nome da série
      data: []  // Array de dados (temperaturas)
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',  // Tipo de gráfico (linha)
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'  // Curvatura da linha
      },
      title: {
        text: 'Temperatura ao Longo do Tempo',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // Cores alternadas nas linhas do gráfico
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [], // As categorias (datas)
        type: 'datetime', // Definir o eixo X como datetime
        labels: { format: 'dd/MM/yyyy HH:mm' }, // Formato das labels no eixo X
      }
    }
  });

  // Hook useEffect para buscar os dados assim que o componente for montado
  useEffect(() => {
    // Substitua pela URL da sua API
    axios.get('http://localhost:8000/api/temperaturas/')
      .then(response => {
        const data = response.data;

        // Verifica se há dados
        if (!data || data.length === 0) {
          console.error('Nenhum dado encontrado!');
          return;
        }

        // Processa as categorias (datas) e as temperaturas
        const categorias = data.map(dado => {
          const timestamp = new Date(dado['hora_e_dia']).getTime();
          return isNaN(timestamp) ? null : timestamp;
        }).filter(categoria => categoria !== null); // Filtra datas inválidas

        const temperaturas = data.map(dado => dado['temperatura'])
                                  .filter(temp => typeof temp === 'number');  // Filtra temperaturas inválidas

        if (categorias.length === 0 || temperaturas.length === 0) {
          console.error('Erro: Dados de temperatura ou categorias inválidos');
          return;
        }

        // Atualiza o estado do gráfico com os dados
        setState(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categorias // Atualiza as categorias com as datas
            }
          },
          series: [{
            name: 'Temperatura (°C)',
            data: temperaturas // Atualiza os dados da série com as temperaturas
          }]
        }));
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);  // O useEffect roda apenas uma vez após o componente ser montado

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
