import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Bus } from '../../models/Bus';
import { AngularFirestore } from '@angular/fire/firestore';
import { TyrePage } from '../tyre/tyre';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private afs: AngularFirestore, private modalCtrl: ModalController) {
    this.bus = navParams.get('Bus');
    console.log('bus', this.bus)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  viewTyreDetails(tyreNumber) {
    console.log("clicked");
    this.afs
      .collection("Tyres")
      .doc(tyreNumber)
      .valueChanges()
      .subscribe(response => {
        this.modalCtrl.create(TyrePage, { Tyre: response }).present();
      });
  }

}
