import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  // HttpClient -> fazer chamadas para a API do backend
  http = inject(HttpClient);

  // Armazena os dados do resumo de produtos
  resumoProduto = signal<any>({});

  // Armazena o gráfico
  grafico = signal<Chart>(new Chart());

  // Método executado quando a página abre
  ngOnInit() {

    // Consulta do resumo de produtos
    this.http
      .get(`${environment.dashBoardUrl}/resumo-produtos`)
      .subscribe((data: any) => {
        this.resumoProduto.set(data);
      });

    // Consulta de produtos por status
    this.http
      .get<any[]>(`${environment.dashBoardUrl}/produtos-por-status`)
      .subscribe((data) => {

        // Convertendo os dados da API para o formato do Highcharts
        const dadosGrafico = data.map(item => ({
          name: item.statusProduto,
          y: item.quantidadeProdutos
        }));

        // Criando o gráfico de donut
        this.grafico.set(
          new Chart({
            chart: {
              type: 'pie'
            },

            title: {
              text: 'Produtos por status'
            },

            subtitle: {
              text: 'Distribuição dos produtos cadastrados'
            },

            tooltip: {
              pointFormat:
                '<b>{point.y}</b> produto(s) - <b>{point.percentage:.1f}%</b>'
            },

            accessibility: {
              point: {
                valueSuffix: '%'
              }
            },

            plotOptions: {
              pie: {
                innerSize: '60%',
                borderRadius: 5,

                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b><br>{point.y} produto(s)'
                },

                showInLegend: true
              }
            },

            series: [
              {
                type: 'pie',
                name: 'Produtos',
                data: dadosGrafico
              }
            ],

            credits: {
              enabled: false
            }
          })
        );
      });
  }
}