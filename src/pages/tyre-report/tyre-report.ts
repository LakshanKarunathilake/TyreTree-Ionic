import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FireStoreProvider } from "../../providers/fire-store/fire-store";
import { Observable } from "rxjs";
import { Tyre } from "../../models/Tyre";
import { AngularFirestore } from "@angular/fire/firestore";

/**
 * Generated class for the TyreReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tyre-report",
  templateUrl: "tyre-report.html"
})
export class TyreReportPage {
  tyres = [];
  inStock = [];
  inTyreHouse = [];
  inBus = [];
  tyresObservable: Observable<Tyre[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore
  ) {
    console.log("runing tyre report constructor");
    this.tyresObservable = this.afs.collection("Tyres").valueChanges();
    this.tyresObservable.subscribe(el => {
      this.tyres = el;
      let inStock = [];
      let inBus = [];
      let inTyreHouse = [];
      el.forEach(tyre => {
        switch (tyre.availability) {
          case "stock":
            inStock.push(tyre);
            break;
          case "tyreHouse":
            inTyreHouse.push(tyre);
            break;
          case "bus":
            inBus.push(tyre);
            break;

          default:
            console.log("Executing default in tyre Report class");
            break;
        }
      });
      this.inStock = inStock;
      this.inBus = inBus;
      this.inTyreHouse = inTyreHouse;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreReportPage");
  }
}
