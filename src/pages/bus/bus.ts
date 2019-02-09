import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Bus } from '../../models/Bus';

/**
 * Generated class for the BusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
})
export class BusPage {
  bus: Bus
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
    this.bus = navParams.get('Bus');
    console.log('bus', this.bus)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
