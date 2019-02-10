import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Bus } from '../../models/Bus';
import { BusPage } from '../bus/bus';

/**
 * Generated class for the BusReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bus-report',
  templateUrl: 'bus-report.html',
})
export class BusReportPage {

  buses:Observable<Bus[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private afs:AngularFirestore,private modalCtrl:ModalController) {
    this.buses = this.afs.collection<Bus>('Buses').valueChanges()
    this.buses.subscribe(el=>console.log('el', el))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusReportPage');
  }

  viewBusDetails(busNumber) {
    this.afs
      .collection("Buses")
      .doc(busNumber)
      .valueChanges()
      .subscribe(response => {
        console.log('response :', response);
        this.modalCtrl.create(BusPage, { Bus: response }).present();
      });
  }

}
