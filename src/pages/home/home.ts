import { Component, ViewChild, ElementRef } from '@angular/core';
import {  NavController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Observable<any[]>;
  ref: AngularFireList<any>;
  unidades = [
    { value: 'unidade1', name: 'Unidade ES'},
    { value: 'unidade2', name: 'Unidade SP'},
    { value: 'unidade3', name: 'Unidade RS'},
    { value: 'unidade4', name: 'Unidade RJ'}
  ];

  @ViewChild('graficoCanvas1') graficoCanvas1: ElementRef;
  @ViewChild('graficoCanvas2') graficoCanvas2: ElementRef;

  objChartJs: any;
  objChartJs2: any;

  chartData = null;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public loadingCtrl: LoadingController) {

  }

  coletarValoresDoGrafico() {
    let acumuladoPorUnidade = {
      'unidade1': null,
      'unidade2': null,
      'unidade3': null,
      'unidade4': null
    };

    for(let venda of this.chartData) {
      acumuladoPorUnidade[venda.unidade] += +venda.valor;
    }

    return Object.keys(acumuladoPorUnidade).map(a => acumuladoPorUnidade[a]);
  }

  criarGrafico(data) {
    this.chartData = data;

    let chartData = this.coletarValoresDoGrafico();

    this.objChartJs = new Chart(this.graficoCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(this.unidades).map(a => this.unidades[a].name),
        datasets: [{
          data: chartData
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItems, data) => {
              return 'R$ '+ data.datasets[tooltipItems.datasetIndes].data
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: (value, index, values) => 'R$ ' + value
            },
            suggestedMin: 0
          }]
        }
      }
    });
    // this.objChartJs2 = new Chart(this.graficoCanvas2.nativeElement, );
  }

  atualizarGrafico(data) {
    this.chartData = data;

    let chartData = this.coletarValoresDoGrafico();

    this.objChartJs.data.datasets.forEach(dataset => {
      console.log(dataset);
      dataset.data = chartData;
    });

    // this.objChartJs2.data.datasets.forEach(dataset => {
    //   dataset.data = chartData;
    // });

    this.objChartJs.update();
    // this.objChartJs2.update();
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
      duration: 3000
    });

    loader.present();

    this.ref = this.db.list('vendas');

    this.ref.valueChanges()
      .subscribe(result => {
        loader.dismiss();

        if(this.chartData) {
          this.atualizarGrafico(result);
        } else {
          this.criarGrafico(result);
        }

      });
  }

  sair() {

  }
}
