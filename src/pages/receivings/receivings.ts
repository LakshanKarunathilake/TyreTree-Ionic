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
        console.log("this.oldestGiveAways", this.oldestGiveAways);
      });
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
