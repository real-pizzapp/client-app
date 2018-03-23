import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth";
import { PizzamenuPage } from "../pizzamenu/pizzamenu";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  formInfo = {
    username: "",
    password: ""
  };
  
  errorSignup: String = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider
  ) {}

  signup() {
    const { username, password } = this.formInfo;
    if(username=="" || password==""){
      this.errorSignup = this.auth.errors[1]
      return 
    }
    else if (username.includes('@') && password != "") {
      this.auth
        .signup(username, password)
        .subscribe(() => this.navCtrl.setRoot(PizzamenuPage));
    } else {
      this.errorSignup = this.auth.errors[0]
    }
  }
}
