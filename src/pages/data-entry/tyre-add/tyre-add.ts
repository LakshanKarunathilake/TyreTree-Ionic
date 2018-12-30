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
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith, filter } from "rxjs/operators";

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
  loading: Loading;

  brandOptions: string[] = ["MRF", "DUNLOP", "DSI"];
  tyreBrands: Observable<string[]>;

  tyreHouseOptions: string[] = [];
  tyreHouses: Observable<string[]>;

  brandFormControl = new FormControl();
  tyreHouseFormControl = new FormControl();
  purchasedDateFormControl = new FormControl(new Date());

  tyreAddForm: FormGroup;

  ngOnInit() {
    this.tyreAddForm = this.formBuilder.group({
      tyreNumber: "",
      price: "",
      brand: this.brandFormControl,
      tyreHouse: this.tyreHouseFormControl,
      tyreStatus: "",
      purchasedDate: this.purchasedDateFormControl
    });

    this.tyreBrands = this.brandFormControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log("val 1", value);
        return this._filter(value, this.brandOptions);
      })
    );
    this.tyreHouses = this.tyreHouseFormControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log("val 2", value);
        console.log("tyrehouseoptionss", this.tyreHouseOptions);
        return this._filter(value, this.tyreHouseOptions);
      })
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.tyreHouses = this.afs
      .collection("TyreHouses")
      .valueChanges()
      .pipe(
        map(tyreHouse => {
          return tyreHouse.map(el => el["name"]);
        })
      );
    this.tyreHouses.subscribe(res => {
      console.log("res", res);
      this.tyreHouseOptions = res as string[];
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TyreAddPage");
  }

  saveTyreDetails() {
    const formSubmission = this.tyreAddForm.value;
    const successMessage = `Tyre details added Successfully 
        <br>
        <br>
        <div align="left">
        <p>Tyre Number : ${formSubmission.tyreNumber}</p>
        <pTyre purchased from : ${formSubmission.purchasedTyreHouse}</p>
        <p>Tyre price : ${formSubmission.price}</p>
        <p>Tyre Brand : ${formSubmission.brand}</p>
        <p>Tyre Purchased Date : ${formSubmission.purchasedDate}</p>
        <p>Tyre Status : ${formSubmission.tyreStatus}</p>
        </div>
        
       
        <div align="center"> <img src="../assets/imgs/success.png" weight="50px" height="50px"></div>
       `;
    const errorMessage =
      'Adding Failure <br><br><div align="center"> <img src="../../../assets/imgs/success.png" weight="40px" height="40px"></div>';
    this.presentLoading();
    this.afs
      .collection("Tyres")
      .doc(formSubmission.tyreNumber)
      .set(formSubmission)
      .then(() => {
        this.hideLoading();
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
