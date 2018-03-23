import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';


@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  user: any;
  username: String;
  password: String;
  userId: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthProvider,public userServ: UserProvider) {
    console.log(this.auth)
    this.user = this.auth.user;
    this.username = this.user.username;
    this.userId = this.user._id
  }

  updateUserDetails(){
    this.userServ.updateUser(this.username, this.password, this.userId).subscribe()
  }

}
