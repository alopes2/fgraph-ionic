import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireObject } from 'angularfire2/database/interfaces';
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

  @ViewChild('graficoCanvas1') graficoCanvas1;
  @ViewChild('graficoCanvas2') graficoCanvas2;

  objChartJs: any;
  objChartJs2: any;

  chartData = null;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public loadingCtrl: LoadingController) {

  }

}
