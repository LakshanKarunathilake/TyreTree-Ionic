import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { TyreAway } from "../../models/TyreAway";
import { map, groupBy, mergeMap, toArray, every } from "rxjs/operators";

import * as _ from "lodash";
import { ReceivingPage } from "../receiving/receiving";

/**
 * Generated class for the ToRecievePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-to-recieve",
  templateUrl: "to-recieve.html"
})
export class ToRecievePage {
  givenTyres;
  objectKeys = Object.keys;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private modalCtrl: ModalController
  ) {
    this.givenTyres = this.afs
      .collection("GiveAways", ref => ref.where("receivedStatus", "==", false))
      .valueChanges()

      .pipe(
        map(element => {
          console.log("element :", element);
          return [_.groupBy(element, val => val.tyreHouse)];
        })
      );
    this.givenTyres.subscribe(el => console.log("el :", el));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ToRecievePage");
  }

  viewReceiveDetails(tyreNumber) {
    console.log('clicked',tyreNumber);
    this.afs
      .collection("GiveAways", ref =>
        ref
          .where("tyreNumber", "==", tyreNumber)
          .where("receivedStatus", "==", false)
      )
      .valueChanges()
      .subscribe(response => {
        console.log('response :', response);
        this.modalCtrl.create(ReceivingPage, { Receiving: response[0] }).present();
      });
  }
}
