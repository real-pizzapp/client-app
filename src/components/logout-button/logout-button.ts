import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'logout-button',
  templateUrl: 'logout-button.html'
})
export class LogoutButton {

  text: string;

  constructor(public auth: AuthProvider, public nav: NavController) {
    console.log('Hello LogoutButton Component');
    this.text = 'Hello World';
  }

  redirect(){
    this.nav.push(HomePage)
  }

}
