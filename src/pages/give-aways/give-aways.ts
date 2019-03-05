import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController,
  AlertController,
  Form
} from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the GiveAwaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-give-aways",
  templateUrl: "give-aways.html"
})
export class GiveAwaysPage {
  loading: Loading;
  tyreHouseOptions: string[];
  tyreHouses: string[] = [];
  tyreNumberOptions: string[];
  tyreNumbers: string[] = [];

  giveAwayForm: FormGroup;

  controllers = {
    tyre: {
      collectionName: "Tyres",
      elementName: "tyreNumber",
      formController: "tyreNumbers"
    },
    tyreHouse: {
      collectionName: "TyreHouse",
      elementName: "name",
      formController: "tyreHouses"
    }
  };

  selectedTyres = {
    firstDag: [],
    secondDag: [],
    thirdDag: [],
    noGuarantee: []
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad GiveAwaysPage");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.giveAwayForm = this.fb.group({
      tyreHouses: ["",Validators.required],
      tyreNumbers: "",
      purpose: ["",Validators.required]
    });
    this.afs
      .collection("TyreHouses")
      .valueChanges()
      .subscribe(res => {
        res.forEach(element => {
          this.tyreHouses.push(element["name"]);
        });
        this.tyreHouseOptions = this.tyreHouses;
        this.giveAwayForm.get("tyreHouses").valueChanges.subscribe(res => {
          this.tyreHouseOptions = this._filter(res, this.tyreHouses);
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

  addTyreToCategory() {
    const { tyreNumbers, purpose } = this.giveAwayForm.value;
    console.log("clicked", purpose);
    switch (purpose) {
      case "1 Dagging":
        this.selectedTyres.firstDag.push(tyreNumbers);
        break;
      case "2 Dagging":
        this.selectedTyres.secondDag.push(tyreNumbers);
        break;
      case "3 Dagging":
        this.selectedTyres.thirdDag.push(tyreNumbers);
        break;
      case "No guarantee":
        this.selectedTyres.noGuarantee.push(tyreNumbers);
        break;

      default:
        break;
    }
    console.log("this.selectedTyres :", this.selectedTyres);
  }

  onFormSubmission() {
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
  
    if(this.giveAwayForm.valid){
      this.presentLoading("Saving To DB...");
      console.log("form Submitted");
      const tyreHouseName = this.giveAwayForm.value.tyreHouses;
      const timeStamp = new Date();
      const givenDate = this.formatDate(timeStamp);
      const dueDate = timeStamp;
      dueDate.setMonth(timeStamp.getMonth() + 4);
      Object.keys(this.selectedTyres).forEach((key, index) => {
        this.selectedTyres[key].forEach(element => {
          this.saveGiveAwayToFireStore({
            tyreNumber: element,
            tyreHouse: tyreHouseName,
            purpose: key,
            givenDate: new Date(givenDate),
            dueDate: new Date(this.formatDate(dueDate)),
            receivedStatus: false
          });
          this.updateTyreAvailability(element);
        });
        if (index === 3) {
          this.emptySelectedTyreArray();
          this.hideLoading();
          this.presentAlert(successMessage);
          this.giveAwayForm.reset();
        }
      });
    }else{
      this.presentAlert(errorMessage);
    }
    
  }

  public hasError(controlName: string, errorName: string){
    return this.giveAwayForm.controls[controlName].hasError(errorName);
  }

  selectionAction() {
    const statusOfTyre = this.suitableTyreStatus();
    console.log('statusOfTyre', statusOfTyre)
    this.presentLoading("Accessing DB");
    this.tyreNumbers = [];
    this.afs
      .collection("Tyres", ref =>
        ref
          .where("tyreStatus", "==", statusOfTyre)
          .where("availability", "==", "stock")
      )
      .valueChanges()
      .subscribe(res => {
        console.log("res", res);
        res.forEach(element => {
          this.tyreNumbers.push(element["tyreNumber"]);
        });
        this.tyreNumberOptions = this.tyreHouses;
        this.giveAwayForm.get("tyreNumbers").valueChanges.subscribe(res => {
          this.tyreNumberOptions = this._filter(res, this.tyreNumbers);
        });
        this.giveAwayForm.get("tyreNumbers").setValue("");
        this.hideLoading();
      });
  }

  suitableTyreStatus() : string {
    const { purpose } = this.giveAwayForm.value;
    console.log("purpose", purpose);
    switch (purpose) {
      case "1 Dagging":
        return "Brand New";
      case "2 Dagging":
        return "1 Dagged";
      case "3 Dagging":
        return "2 Dagged";
      case "No guarantee":
        return "3 Dagged";

      default:
      console.log('default switch');
        return "";
    }
  }

  updateTyreAvailability(tyreNumber: string) {
    this.afs
      .collection("Tyres")
      .doc(tyreNumber)
      .update({ availability: "tyreHouse" });
  }

  emptySelectedTyreArray() {
    this.selectedTyres.firstDag = [];
    this.selectedTyres.secondDag = [];
    this.selectedTyres.thirdDag = [];
    this.selectedTyres.noGuarantee = [];
  }

  formatDate(timeStamp: Date) {
    const year = timeStamp.getFullYear();
    const month = timeStamp.getMonth() + 1;
    const day = timeStamp.getDate();

    return `${year}-${month}-${day}`;
  }

  saveGiveAwayToFireStore(value) {
    this.afs.collection("GiveAways").add(value);
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
