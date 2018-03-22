import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { PizzamenuPage } from '../pizzamenu/pizzamenu';
import { RecoverPasswordPage } from '../recover-password/recover-password'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formInfo = {
    username:"",
    password:""
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public auth: AuthProvider
            ) {
  }

  login(){
      const {username, password} = this.formInfo;
      if(username != "" && password != ""){
        this.auth.login(username, password)
        .subscribe(()=> 
          this.navCtrl.setRoot(PizzamenuPage))
      } else{
        console.log("You must set a username and a password");
      }
    }

  navToRecoverPassword(){
    this.navCtrl.push(RecoverPasswordPage)
  }

}
