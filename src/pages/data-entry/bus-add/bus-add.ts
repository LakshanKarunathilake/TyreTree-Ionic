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

  frontLeftFC = new FormControl();
  frontRightFC = new FormControl();
  rearLeftOuterFC = new FormControl();
  rearLeftInnerFC = new FormControl();
  rearRightOuterFC = new FormControl();
  rearRightInnerFC = new FormControl();

  dummyArray: string[] = [];

  tyreNumbers: Observable<string[]>;
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
      frontLeft: this.frontLeftFC,
      frontRight: this.frontRightFC,
      rearLeftOuter: this.rearLeftOuterFC,
      rearLeftInner: this.rearLeftInnerFC,
      rearRightOuter: this.rearRightOuterFC,
      rearRightInner: this.rearRightInnerFC,
      busNumber: ""
    });

    this.frontLeftNumberArray = this.frontLeftFC.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value, this.dummyArray))
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
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.tyreNumbers = this.afs
      .collection("Tyres")
      .valueChanges()
      .pipe(
        map(tyres => {
          return tyres.map(tyre => tyre["tyreNumber"]);
        })
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BusAddPage");
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
