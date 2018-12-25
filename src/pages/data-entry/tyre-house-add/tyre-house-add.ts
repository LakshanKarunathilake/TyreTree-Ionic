import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { TyreHouse } from "../../../models/TyreHouse";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

/**
 * Generated class for the TyreHouseAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tyre-house-add",
  templateUrl: "tyre-house-add.html"
})
export class TyreHouseAddPage {
  tyreHouse = {} as TyreHouse;
  loading: Loading;
  tyreHouse_Collection: AngularFirestoreCollection;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreHouseAddPage");
  }

  saveTyreHouse() {
    this.presentLoading();
    this.afs
      .collection("TyreHouses")
      .doc(this.tyreHouse.name)
      .set(this.tyreHouse)
      .then(() => {
        this.hideLoading();
        let message = `Tyre House Registered Successfully 
        <br>
        <br>
        <div align="left">
        <p>TyreHouse Name : ${this.tyreHouse.name}</p>
        <p>TyreHouse Address : ${this.tyreHouse.address}</p>
        <p>TyreHouse Contact Number : ${this.tyreHouse.contactNumber}</p>
        <p>TyreHouse Contact Person : ${this.tyreHouse.contactPerson}</p>
        </div>
        
       
        <div align="center"> <img src="assets/imgs/failure_icon.png" weight="50px" height="50px"></div>
       `;
        this.presentAlert(message);
      });
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading data..."
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
