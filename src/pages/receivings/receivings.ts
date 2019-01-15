import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController,
  ModalController
} from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { TyreAway } from "../../models/TyreAway";
import { TyrePage } from "../tyre/tyre";
import { ModalPage } from "../modal/modal-page";

/**
 * Generated class for the ReceivingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-receivings",
  templateUrl: "receivings.html"
})
export class ReceivingsPage {
  myInput;
  loading: Loading;
  oldestGiveAways = [];
  allGiveAways = [];
  filteredGiveAways = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.afs
      .collection("GiveAways", ref =>
        ref
          .where("dueDate", "<", new Date())
          // .where("receivedStatus", "==", false)
          .orderBy("dueDate", "asc")
          .limit(10)
      )
      .snapshotChanges()
      .subscribe(val => {
        this.oldestGiveAways = [];
        val.forEach(el => {
          let deal = el.payload.doc.data() as TyreAway;
          deal.dueDate = this.formatDate(
            new Date(deal.dueDate["seconds"] * 1000)
          );
          deal.givenDate = this.formatDate(
            new Date(deal.givenDate["seconds"] * 1000)
          );

          if (deal.receivedStatus === false)
            this.oldestGiveAways.push({ id: el.payload.doc.id, ...deal });
        });
        console.log("this.allgiveaways", this.allGiveAways);
      });

    this.afs
      .collection("GiveAways", ref => ref.orderBy("givenDate", "asc"))
      .snapshotChanges()
      .subscribe(val => {
        console.log("val", val);
        this.allGiveAways = [];
        val.forEach((element, index) => {
          let deal = element.payload.doc.data() as TyreAway;
          deal.dueDate = this.formatDate(
            new Date(deal.dueDate["seconds"] * 1000)
          );
          deal.givenDate = this.formatDate(
            new Date(deal.givenDate["seconds"] * 1000)
          );
          if (deal.receivedStatus === false)
            this.allGiveAways.push({ id: element.payload.doc.id, ...deal });

          if (index + 1 === val.length)
            this.filteredGiveAways = this.allGiveAways;
        });
      });
  }

  receiveTheTyre(id: string, number: string, purpose: string) {
    console.log("id", id, "number", number);
    this.updateTyreReceivedStatus(id, number, purpose);
    this.removeGiveAwayFromArray(id);
  }

  updateTyreReceivedStatus(id: string, number: string, purpose: string) {
    this.afs
      .collection("GiveAways")
      .doc(id)
      .update({ receivedStatus: true })
      .then(() => {
        this.changeTyreAvailability(number, purpose);
      });
  }

  removeGiveAwayFromArray(docID) {
    this.allGiveAways.splice(
      this.allGiveAways.findIndex(element => element.id === docID),
      1
    );
  }

  viewTyreDetails(item) {
    console.log("clicked");
    this.afs
      .collection("Tyres")
      .doc(item.tyreNumber)
      .valueChanges()
      .subscribe(response => {
        this.modalCtrl
          .create(TyrePage, { Tyre: response, additionalInfo: item })
          .present();
      });
  }

  changeTyreAvailability(number: string, purpose: string) {
    const successMessage = `Details saved Successfully 
    <br>
    <br>      
    <div align="center"> <img src="../assets/imgs/success.png" weight="50px" height="50px"></div>
   `;

    var updatingObject = {};
    updatingObject["availability"] = "stock";
    updatingObject["tyreStats"] = this.selectTheNextStatus(purpose);
    updatingObject[purpose] = new Date();
    this.afs
      .collection("Tyres")
      .doc(number)
      .update(updatingObject)
      .then(() => this.presentAlert(successMessage));
  }

  saveTheDateOfActivity(purpose) {
    switch (purpose) {
      case "firstDag":
        return { firstDag: this.formatDate(new Date()) };
      case "secondDag":
        return { secondDag: this.formatDate(new Date()) };
      case "firstDag":
        return { secondDag: this.formatDate(new Date()) };
      case "firstDag":
        return { thirdDag: this.formatDate(new Date()) };
      case "noGuarantee":
        return { noGuarantee: this.formatDate(new Date()) };

      default:
        console.log("default case");
        break;
    }
  }

  selectTheNextStatus(purpose: string) {
    switch (purpose) {
      case "firstDag":
        return "Dagged 1";
      case "secondDag":
        return "Dagged 2";
      case "thirdDag":
        return "Dagged 3";
      case "noGuarantee":
        return "No Guarantee";

      default:
        break;
    }
  }

  formatDate(timeStamp: Date) {
    const year = timeStamp.getFullYear();
    const month = timeStamp.getMonth() + 1;
    const day = timeStamp.getDate();

    return `${year}-${month}-${day}`;
  }

  onInput(event) {
    if (this.myInput === "") {
      this.filteredGiveAways = this.allGiveAways;
    } else {
      this.filteredGiveAways = this.filteredGiveAways.filter(element => {
        if (element.tyreNumber.includes(this.myInput)) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  onCancel(event) {}
  presentLoading(message: string) {
    if (this.loading !== undefined)
      this.loading = this.loadingCtrl.create({
        spinner: "crescent",
        content: message
      });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  presentAlert(message) {
    this.alertCtrl
      .create({
        message: message,
        buttons: ["Dismiss"]
      })
      .present();
  }
  moveToHomePage() {
    this.navCtrl.setRoot("HomePage");
  }
  logOut() {
    this.navCtrl.setRoot("LoginPage");
  }
}
