import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FireStoreProvider } from "../../providers/fire-store/fire-store";
import { Observable } from "rxjs";
import { Tyre } from "../../models/Tyre";

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
  tyresObservable: Observable<Tyre[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fsp: FireStoreProvider
  ) {
    this.tyresObservable = this.fsp.getTyres();
    this.tyresObservable.subscribe(el => (this.tyres = el));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreReportPage");
  }
}
