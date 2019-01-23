import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Tyre } from "../../models/Tyre";

/*
  Generated class for the FireStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireStoreProvider {
  tyres: Observable<Tyre[]>;
  constructor(public afs: AngularFirestore) {
    this.tyres = this.afs.collection("Tyres").valueChanges();
  }

  getTyres(): Observable<Tyre[]> {
    return this.tyres;
  }
}
