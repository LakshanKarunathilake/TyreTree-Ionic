import { Component, Input } from "@angular/core";
import { FireStoreProvider } from "../../providers/fire-store/fire-store";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ModalController } from "ionic-angular";
import { TyrePage } from "../../pages/tyre/tyre";

/**
 * Generated class for the TyreStatusAccordionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "tyre-status-accordion",
  templateUrl: "tyre-status-accordion.html"
})
export class TyreStatusAccordionComponent {
  text: string;
  tyreTypes = {
    brandNew: [],
    firstDag: [],
    secondDag: [],
    thirdDag: [],
    noGuarantee: []
  };
  tyres = [];

  @Input()
  set tyreData(value) {
    console.log("tyreData", value);

    value.forEach(val => {
      switch (val.tyreStatus) {
        case "Brand New":
          this.tyreTypes.brandNew.push(val.tyreNumber);
          break;
        case "1 Dagged":
          this.tyreTypes.firstDag.push(val.tyreNumber);
          break;
        case "2 Dagged":
          this.tyreTypes.secondDag.push(val.tyreNumber);
          break;
        case "3 Dagged":
          this.tyreTypes.thirdDag.push(val.tyreNumber);
          break;
        case "No Guarantee":
          this.tyreTypes.noGuarantee.push(val.tyreNumber);
          break;

        default:
          break;
      }
    });
  }

  get tyreData() {
    return this.tyres;
  }

  constructor(
    private afs: AngularFirestore,
    private modalCtrl: ModalController
  ) {}

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
