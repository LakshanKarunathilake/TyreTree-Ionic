import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { TyreAway } from "../../models/TyreAway";
import { Timestamp } from "rxjs/internal/operators/timestamp";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
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
        val.forEach(element => {
          let deal = element.payload.doc.data() as TyreAway;
          deal.dueDate = this.formatDate(
            new Date(deal.dueDate["seconds"] * 1000)
          );
          deal.givenDate = this.formatDate(
            new Date(deal.givenDate["seconds"] * 1000)
          );
          if (deal.receivedStatus === false)
            this.allGiveAways.push({ id: element.payload.doc.id, ...deal });
        });
        console.log("allGiveAways :", this.allGiveAways);
      });
  }

  receiveTheTyre(id: string, number: string, purpose: string) {
    console.log("id", id, "number", number);
    this.updateTyreReceivedStatus(id, number, purpose);
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

  changeTyreAvailability(number: string, purpose: string) {
    this.selectTheNextStatus(purpose);
    const successMessage = `Details saved Successfully 
    <br>
    <br>      
    <div align="center"> <img src="../assets/imgs/success.png" weight="50px" height="50px"></div>
   `;
    this.afs
      .collection("Tyres")
      .doc(number)
      .update({ availability: "stock", purpose })
      .then(() => this.presentAlert(successMessage));
  }

  selectTheNextStatus(purpose: string) {
    switch (purpose) {
      case "firstDag":
        return "1 Dagged";
      case "secondDag":
        return "2 Dagged";
      case "thirdDag":
        return "3 Dagged";
      case "thirdDag":
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
  ionViewDidLoad() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  onInput(event) {
    console.log("event", event, "myinput", this.myInput);
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
}
