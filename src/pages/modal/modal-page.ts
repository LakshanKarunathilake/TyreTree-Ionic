import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";

@Component({
  templateUrl: "modal-page.html"
})
export class ModalPage {
  myParam: string;

  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.myParam = params.get("myParam");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
