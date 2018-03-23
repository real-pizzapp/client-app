import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public auth: AuthProvider,
      public userServ: UserProvider, 
      public toast: ToastController) {
        this.user = this.auth.user;
        this.username = this.user.username;
        this.userId = this.user._id
    }

  updateUserDetails(){
    this.userServ.updateUser(this.username, this.password, this.userId).subscribe(()=>{
      this.presentToast()
    })
  }

  presentToast() {
    let toast = this.toast.create({
      message: 'El usuario se ha editado correctamente',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'X'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
