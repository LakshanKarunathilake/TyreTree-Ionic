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
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

/**
 * Generated class for the BusAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bus-add",
  templateUrl: "bus-add.html"
})
export class BusAddPage {
  loading: Loading;

  busAddForm: FormGroup;

  tyreNumbers: string[] = [];

  tyreNumbersObservable: Observable<string[]>;
  frontLeftNumberArray: Observable<string[]>;
  frontRightNumberArray: Observable<string[]>;
  rearLeftOuterNumberArray: Observable<string[]>;
  rearLeftInnerNumberArray: Observable<string[]>;
  rearRightOuterNumberArray: Observable<string[]>;
  rearRightInnerNumberArray: Observable<string[]>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.busAddForm = this.fb.group({
      frontLeft: "",
      frontRight: "",
      rearLeftOuter: "",
      rearLeftInner: "",
      rearRightOuter: "",
      rearRightInner: "",
      busNumber: ""
    });

    this.tyreNumbersObservable = this.busAddForm
      .get("frontLeft")
      .valueChanges.pipe(
        startWith(""),
        map(value => {
          console.log("values", value, "tyreNumbers", this.tyreNumbers);
          return this._filter(value, this.tyreNumbers);
        })
      );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.tyreNumbersObservable = this.afs
      .collection("Tyres")
      .valueChanges()
      .pipe(
        map(tyres => {
          return tyres.map(tyre => tyre["tyreNumber"]);
        })
      );

    this.presentLoading("Loading DATA");

    this.tyreNumbersObservable.subscribe(res => {
      console.log("res", res);
      this.tyreNumbers = res as string[];
      this.hideLoading();
      this.busAddForm.get("frontLeft").setValue("");
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BusAddPage");
  }

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
