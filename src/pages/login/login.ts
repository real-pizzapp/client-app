import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, LoadingController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth";
import { PizzamenuPage } from "../pizzamenu/pizzamenu";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  formInfo = {
    username: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alert: AlertController,
    public loading: LoadingController
  ) {}

  login() {
    const { username, password } = this.formInfo;
    if (username != "" && password != "") {
      console.log(username, password)
      this.auth
        .login(username, password)
        .subscribe(() => this.navCtrl.setRoot(PizzamenuPage));
    } else {
      console.log("You must set a username and a password");
    }
  }

  navToRecoverPassword() {
    let alert = this.alert.create({
      title: "Restablecer Contraseña",
      inputs: [
        {
          name: "email",
          placeholder: "email"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Send",
          handler: data => {
            if (data.email) {
              //add preloader
              let loading = this.loading.create({
                dismissOnPageChange: true,
                content: "comprobando si existe email asociado..."
              });
              //call to database
              this.auth.recoverPassword(data.email).subscribe((response: any) => {
                console.log('response recibida')
                console.log(response)
                if(response.success == "email enviado con exito"){
                  loading.dismiss().then(() => {
                    //show pop up confirming that mail has been sent
                    let alert = this.alert.create({
                      title: "Comprueba tu email",
                      subTitle: "email enviado correctamente!",
                      buttons: ["OK"]
                    });
                    alert.present();
                  })} 
                  
                  if (response.error === 'no hay un email asociado') {
                    loading.dismiss().then(() => {
                      let alert = this.alert.create({
                        title: "No hay un email asociado",
                        buttons: ["OK"]
                      });
                      alert.present();
                    });
                  }
              });
            }
          }
        }
      ]
    });
    alert.present();
    // this.navCtrl.push(RecoverPasswordPage)
  }
}
