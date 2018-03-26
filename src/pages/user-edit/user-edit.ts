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
  toastMessage: String[] = ['El usuario se ha editado correctamente', 'Has dejado campos vacios'];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public auth: AuthProvider,
      public userServ: UserProvider, 
      public toast: ToastController) {
        console.log(this.auth)
        this.user = this.auth.user;
        this.username = this.user.username;
        this.userId = this.user._id
    }

  updateUserDetails(){
    console.log('entro en la funcion')
    this.userServ.updateUser(this.username, this.password, this.userId).subscribe((response)=>{
      console.log(response)
      this.presentToast(response)
    })
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
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
