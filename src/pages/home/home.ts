import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from "../../pages/signup/signup";
import { LoginPage } from "../../pages/login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  registerWithEmail() {
    this.navCtrl.push(SignupPage);
  }

  loginWithOldAccount(){
    this.navCtrl.push(LoginPage);
  }

}
