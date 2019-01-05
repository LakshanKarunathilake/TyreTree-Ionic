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
import { FormBuilder, FormGroup } from "@angular/forms";

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
      tyreHouses: "",
      tyreNumbers: "",
      purpose: ""
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
    this.afs
      .collection("Tyres")
      .valueChanges()
      .subscribe(res => {
        res.forEach(element => {
          this.tyreNumbers.push(element["tyreNumber"]);
        });
        this.tyreNumberOptions = this.tyreHouses;
        this.giveAwayForm.get("tyreNumbers").valueChanges.subscribe(res => {
          this.tyreNumberOptions = this._filter(res, this.tyreNumbers);
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

  onFocusEvent(name) {
    // const { collectionName, elementName, formController } = this.controllers[
    //   name
    // ];
    // this.afs
    //   .collection(collectionName)
    //   .valueChanges()
    //   .subscribe(res => {
    //     res.forEach(element => {
    //       this.tyreNumbers.push(element[elementName]);
    //     });
    //     this.tyreNumberOptions = this.tyreHouses;
    //     this.giveAwayForm.get(formController).valueChanges.subscribe(res => {
    //       this.tyreNumberOptions = this._filter(res, this.tyreNumbers);
    //     });
    //   });
  }

  onFormSubmission() {
    console.log("form Submitted");
    const tyreHouseName = this.giveAwayForm.value.tyreHouses;
    const purpose = this.giveAwayForm.value.purpose;
    Object.keys(this.selectedTyres).forEach(key => {
      console.log("key", key);
      this.selectedTyres[key].forEach(element => {
        console.log("element :", element);
        const timeStamp = new Date();
        const dueDate = timeStamp;
        dueDate.setMonth(timeStamp.getMonth() + 3);
        this.saveGiveAwayToFireStore(
          {
            tyreNumber: element,
            tyreHouse: tyreHouseName,
            purpose: purpose,
            givenDate: timeStamp.toString(),
            dueDate: dueDate,
            receivedStatus: false
          },
          timeStamp
        );
      });
    });
  }

  saveGiveAwayToFireStore(value, timeStamp) {
    this.afs
      .collection("GiveAways")
      .doc(timeStamp.toString())
      .set(value);
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
