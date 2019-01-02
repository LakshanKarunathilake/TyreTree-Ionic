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
import { Observable, of } from "rxjs";
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
  tyreNumberOptions: string[];

  tyreNumbers: string[] = [];
  CONTROLLERS = [
    "frontLeft",
    "frontRight",
    "rearLeftOuter",
    "rearLeftInner",
    "rearRightOuter",
    "rearRightInner"
  ];

  tyreNumbersObservable: Observable<string[]>;
  // frontLeftNumberArray: Observable<string[]>;
  // frontRightNumberArray: Observable<string[]>;
  // rearLeftOuterNumberArray: Observable<string[]>;
  // rearLeftInnerNumberArray: Observable<string[]>;
  // rearRightOuterNumberArray: Observable<string[]>;
  // rearRightInnerNumberArray: Observable<string[]>;

  frontLeftFC = new FormControl();
  frontRightFC = new FormControl();

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

    this.afs
      .collection("Tyres")
      .valueChanges()
      .subscribe(res => {
        res.forEach(element => {
          this.tyreNumbers.push(element["tyreNumber"]);
        });
        this.tyreNumberOptions = this.tyreNumbers;

        this.CONTROLLERS.forEach(controller => {
          console.log("controller", controller);
          this.busAddForm.get(controller).valueChanges.subscribe(res => {
            this.tyreNumberOptions = this._filter(res, this.tyreNumbers);
          });
        });
      });
  }

  private _filter(value: string, options: string[]): string[] {
    console.log("value :", value);
    console.log("options :", options);
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFocusEvent(formController) {
    const formValue = this.busAddForm.value[formController];
    if (formValue === "") this.tyreNumberOptions = this.tyreNumbers;
  }

  private mapTheObservableForOptions(formControllerName) {
    console.log("mapping");
    this.tyreNumbersObservable = this.busAddForm
      .get(formControllerName)
      .valueChanges.pipe(
        startWith(""),
        map(value => {
          console.log("values", value, "tyreNumbers", this.tyreNumbers);
          return this._filter(value, this.tyreNumbers);
        })
      );
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad BusAddPage");
  }
  optionSelected() {
    console.log("selected");
    this.tyreNumberOptions = this.tyreNumbers;
  }

  saveBusDetails() {
    const busDetails = this.busAddForm.value;
    this.presentLoading("Savind to DB");
    this.afs
      .collection("Buses")
      .doc(busDetails.busNumber)
      .set(busDetails)
      .then(() => {
        this.hideLoading();
        this.busAddForm.reset();
      });
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
