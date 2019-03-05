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
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
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
  frontLeftFC = new FormControl();
  frontRightFC = new FormControl();

  public hasError(controlName: string, errorName: string){
    return this.busAddForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.busAddForm = this.fb.group({
      frontLeft: ["",Validators.required],
      frontRight: ["",Validators.required],
      rearLeftOuter: ["",Validators.required],
      rearLeftInner: ["",Validators.required],
      rearRightOuter: ["",Validators.required],
      rearRightInner: ["",Validators.required],
      busNumber: ["",Validators.required],
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
    if (value === null) {
      value = "";
    }
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFocusEvent(formController) {
    const formValue = this.busAddForm.value[formController];
    if (formValue === "") this.tyreNumberOptions = this.tyreNumbers;
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
    const successMessage = `Details saved Successfully 
    <br>
    <br>      
    <div align="center"> <img src="../assets/imgs/success.png" weight="50px" height="50px"></div>
   `;

   const errorMessage = `Please enter valid details 
   <br>
   <br>      
   <div align="center"> <img src="../assets/imgs/failure.png" weight="50px" height="50px"></div>
  `;
    if(this.busAddForm.valid){
      const busDetails = this.busAddForm.value;
      this.presentLoading("Savind to DB");
      this.afs
        .collection("Buses")
        .doc(busDetails.busNumber)
        .set(busDetails)
        .then(() => {
          this.hideLoading();
          this.busAddForm.reset();
          this.presentAlert(errorMessage);
        });
    }else{
      this.presentAlert(errorMessage)
    }
    
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
  moveToHomePage() {
    this.navCtrl.setRoot("HomePage");
  }
  logOut() {
    this.navCtrl.setRoot("LoginPage");
  }
}
