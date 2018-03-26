import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { UserProvider } from '../../providers/user';
import { AddressProvider } from '../../providers/address'


@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  email: any;
  user: any;
  username: String;
  password: String;
  userId: String;
  toastMessage: String[] = ['El usuario se ha editado correctamente', 'Has dejado campos vacios'];
  address: Object;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public auth: AuthProvider,
      public userServ: UserProvider, 
      public toast: ToastController, 
      public addressServ: AddressProvider,
      public alert: AlertController) {
        console.log(this.auth)
        this.user = this.auth.user;
        this.username = this.user.username;
        this.userId = this.user._id
        this.getAddressDetails()
    }

  // updateUserDetails(){
  //   this.userServ.updateUser(this.username, this.password, this.userId).subscribe((response)=>{
  //     console.log(response)
  //     this.presentToast(response)
  //   })
  // }

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

  presentPrompt(message, field, type) {
    console.log('entro aca hueva')
    let alert = this.alert.create({
      title: 'Editar',
      message: message,
      inputs: [
        {
          name: field,
          placeholder: field,
          type: type
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: "OK",
          handler: data => {
            if (data) {
              this.userServ.updateUser(data, this.userId).subscribe((newInfo: any) => 
                this.user.username = newInfo.username)
            } 
          }
        }
      ]
    });
    alert.present();
  }

  changeUsername(){
    this.presentPrompt('Introduce tu nuevo email', 'email', 'email')
  }

  changePassword(){
    this.presentPrompt('Introduce tu nueva contraseña', 'contrasena', 'password')
  }

  getAddressDetails(){
    console.log('entro en el front ')
    console.log(this.user.address[0])
    if(this.user.address.length === 0) {
      this.address = 'No hay dirección asociada'
    } else {
      this.addressServ.getAddressDetails(this.user.address[0]).subscribe((addressDetails) => {
        console.log(addressDetails)
        this.address = addressDetails
      })
    }
  }

}
