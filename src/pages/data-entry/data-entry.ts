import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the DataEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-data-entry",
  templateUrl: "data-entry.html"
})
export class DataEntryPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DataEntryPage");
  }
  movePage(page: string) {
    console.log("page", page);
    this.navCtrl.push(page);
  }
  moveToHomePage() {
    this.navCtrl.setRoot("HomePage");
  }
  logOut() {
    this.navCtrl.setRoot("LoginPage");
  }
}
