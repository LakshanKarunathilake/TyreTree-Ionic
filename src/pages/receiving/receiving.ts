import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TyreAway } from '../../models/TyreAway';

/**
 * Generated class for the ReceivingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receiving',
  templateUrl: 'receiving.html',
})
export class ReceivingPage {
  receiving: TyreAway;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.receiving = navParams.get('Receiving')
    this.receiving.givenDate = this.formatDate(this.receiving.givenDate);
    this.receiving.dueDate = this.formatDate(this.receiving.dueDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceivingPage');
  }

  formatDate(value) {
    console.log('value', value)
    const timeStamp = new Date(value["seconds"] * 1000);
    const year = timeStamp.getFullYear();
    const month = timeStamp.getMonth() + 1;
    const day = timeStamp.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    console.log('formattedDate', formattedDate)
    return formattedDate;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
