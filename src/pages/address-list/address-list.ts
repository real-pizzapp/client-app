import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { AddressProvider } from "../../providers/address";
import { AuthProvider } from "../../providers/auth";
import { UserProvider } from "../../providers/user";

@Component({
  selector: "page-address-list",
  templateUrl: "address-list.html"
})
export class AddressListPage {
  user: any;
  userAddresses: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addressServ: AddressProvider,
    public auth: AuthProvider,
    public userServ: UserProvider,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    this.getAllAddresses()
  }

  getAllAddresses() {
    this.userServ.getAllAddresses(this.user._id).subscribe((info: any) => {
      this.userAddresses = info.address;
    });
  }

  dismiss() {
    let data = { foo: "bar" };
    this.viewCtrl.dismiss(data);
  }
}