import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Tyre } from "../../../models/Tyre";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { TyreHouse } from "../../../models/TyreHouse";

/**
 * Generated class for the TyreAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface User {
  name: string;
}

@IonicPage()
@Component({
  selector: "page-tyre-add",
  templateUrl: "tyre-add.html"
})
export class TyreAddPage {
  tyre = {} as Tyre;
  loading: Loading;
  brandFormControl = new FormControl();
  tyreHouseFormControl = new FormControl();
  brandOptions: string[] = ["MRF", "DUNLOP", "DSI"];
  tyreHouseOptions: string[] = [];
  tyreBrands: Observable<string[]>;
  tyreHouses: Observable<string[]>;

  ngOnInit() {
    this.tyreBrands = this.brandFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.brandOptions))
    );
    this.tyreHouses = this.tyreHouseFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.tyreHouseOptions))
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    console.log("options", options);
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.afs
      .collection("TyreHouses")
      .snapshotChanges()
      .subscribe(tyreHouses => {
        tyreHouses.forEach(tyreHouse =>
          this.tyreHouseOptions.push(tyreHouse.payload.doc.id)
        );
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreAddPage");
  }

  saveTyreDetails() {
    const successMessage = `Tyre details added Successfully 
        <br>
        <br>
        <div align="left">
        <p>Tyre Number : ${this.tyre.number}</p>
        <pTyre purchased from : ${this.tyre.purchasedTyreHouse}</p>
        <p>Tyre price : ${this.tyre.price}</p>
        <p>Tyre Brand : ${this.tyre.brand}</p>
        <p>Tyre Purchased Date : ${this.tyre.purchasedDate}</p>
        </div>
        
       
        <div align="center"> <img src="assets/imgs/failure_icon.png" weight="50px" height="50px"></div>
       `;
    const errorMessage =
      'Adding Failure <br><br><div align="center"> <img src="assets/imgs/failure_icon.png" weight="50px" height="50px"></div>';
    this.presentLoading();
    this.afs
      .collection("Tyres")
      .doc(this.tyre.number)
      .set(this.tyre)
      .then(() => {
        this.hideLoading();
        this.tyre = {};
        this.presentAlert(successMessage);
      })
      .catch(err0r => {
        this.presentAlert(errorMessage);
      });
  }
  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Saving To DB..."
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
