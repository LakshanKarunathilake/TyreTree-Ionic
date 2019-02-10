import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the QuickFabComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'quick-fab',
  templateUrl: 'quick-fab.html'
})
export class QuickFabComponent {

  text: string;

  constructor(private navCtrl:NavController) {
    console.log('Hello QuickFabComponent Component');
    this.text = 'Hello World';
  }

  moveToHomePage() {
    this.navCtrl.setRoot("HomePage");
  }
  logOut() {
    this.navCtrl.setRoot("LoginPage");
  }

}
