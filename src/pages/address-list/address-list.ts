import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { AddressProvider } from "../../providers/address";
import { AuthProvider } from "../../providers/auth";
import { UserProvider } from "../../providers/user";
import { NewAddressPage } from "../new-address/new-address"

@Component({
  selector: "page-address-list",
  templateUrl: "address-list.html"
})
export class AddressListPage {
  user: any;
  userAddresses: any;
  selectedAddress: any;
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
    this.getAllAddresses();
  }

  getAllAddresses() {
    this.userServ.getAllAddresses(this.user._id).subscribe((info: any) => {
      this.userAddresses = info.address;
    });
  }

  addNewAddress(){
    this.viewCtrl.dismiss()
    this.navCtrl.push(NewAddressPage)
  }

  dismiss() {
    if (this.selectedAddress) {

      let data = this.userAddresses[this.selectedAddress];
      this.viewCtrl.dismiss(data);
    }
  }

}
