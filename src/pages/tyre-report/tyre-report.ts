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
  // tyres;
  // inStock;
  // inTyreHouse;
  // inBus;
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
      console.log('this.tyres :', this.tyres);
      el.forEach((tyre, index) => {
        console.log("tyre", tyre);

        switch (tyre.availability) {
          case "stock":
            this.inStock.push(tyre);
            break;
          case "tyreHouse":
            this.inTyreHouse.push(tyre);
            break;
          case "bus":
            this.inBus.push(tyre);
            break;

          default:
            console.log("Executing default in tyre Report class");
            break;
        }        
      });
      console.log("this.inStock", this.inStock);
      console.log("this.inTyreHouse", this.inTyreHouse);
    });
  }

  ngOnInit(): void {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreReportPage");
  }
}
