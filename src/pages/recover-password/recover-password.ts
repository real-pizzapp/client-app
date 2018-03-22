import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth'


@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {
  email: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {}

  sendEmailToRecoverPassword(){
    console.log('entro en la funcion')
    console.log(this.email)
    this.auth.recoverPassword(this.email).subscribe()
  }
}
