import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Tyre } from "../../models/Tyre";

/**
 * Generated class for the TyrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tyre",
  templateUrl: "tyre.html"
})
export class TyrePage {
  tyre: Tyre;
  additionalInfo = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.tyre = navParams.get("Tyre");
    this.additionalInfo = navParams.get("additionalInfo");
    if(this.tyre.purchasedDate)
      this.tyre.purchasedDate = this.formatDate(
        new Date(this.tyre.purchasedDate["seconds"] * 1000)
      );
      
    if(this.tyre.firstDag)     
      this.tyre.firstDag = this.formatDate(
        new Date(this.tyre.firstDag["seconds"] * 1000)
      );

    if(this.tyre.secondDag)     
      this.tyre.secondDag = this.formatDate(
        new Date(this.tyre.secondDag["seconds"] * 1000)
      );
    if(this.tyre.thirdDag)   
      this.tyre.thirdDag = this.formatDate(
        new Date(this.tyre.thirdDag["seconds"] * 1000)
      );
      
    if(this.tyre.noGuarantee)   
      this.tyre.noGuarantee = this.formatDate(
        new Date(this.tyre.noGuarantee["seconds"] * 1000)
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyrePage");
  }

  formatDate(timeStamp: Date) {
    const year = timeStamp.getFullYear();
    const month = timeStamp.getMonth() + 1;
    const day = timeStamp.getDate();

    return `${year}-${month}-${day}`;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
