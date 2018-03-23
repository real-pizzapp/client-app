import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'something-else'
})
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPasswordPage');
  }

}
