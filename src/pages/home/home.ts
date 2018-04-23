import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) {
  }

  dataEntryPage(){
    this.navCtrl.push("DataEntryPage");
  }

  reportsPage(){
    this.navCtrl.push("ReportsPage");
  }

  giveAwaysPage(){
    this.navCtrl.push("GiveAwaysPage");
  }

  recievingsPage(){
    this.navCtrl.push("ReceivingsPage");
  }

}
