import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  LoadingController,
  Loading,
  AlertController
} from "ionic-angular";
import { User } from "../../models/User";
import { AngularFireAuth } from "@angular/fire/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  user = {} as User;
  loading: Loading;
  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private actControl: ActionSheetController,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  presentActionSheet() {
    let actionSheet = this.actControl.create({
      title: "Do you want to keep logged in",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            localStorage.setItem("keepLoggedInStatus", "true");
            this.moveToHomePage();
          }
        },
        {
          text: "No",
          handler: () => {
            console.log("Archive clicked");
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  moveToSignupPage() {
    this.navCtrl.push("SignupPage");
  }

  moveToHomePage() {
    this.navCtrl.setRoot("HomePage");
  }

  async clickLogin() {
    this.presentLoading();

    try {
      const result = await this.afAuth.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          this.hideLoading();
          this.user.user_id = data.user.uid;
          localStorage.setItem("user_id", data.user.uid); // Settting userID for future use
          this.moveToHomePage();
        });
      console.log(result);
    } catch (e) {
      this.hideLoading();

      this.alertCtrl
        .create({
          message:
            e.message +
            `<br><br>
        <div align="center"> <img src="assets/imgs/failure_icon.png" weight="50px" height="50px"></div>
       `,
          buttons: ["Dismiss"]
        })
        .present();
      console.error(e);
    }
  }
  moveFocusToNextElement(nextElement) {
    nextElement.setFocus();
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
}
