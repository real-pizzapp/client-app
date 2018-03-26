import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, ViewController } from "ionic-angular";
import { OrderProvider } from "../../providers/order";
import { AuthProvider } from "../../providers/auth";
import { AddressProvider } from '../../providers/address'
import { UserProvider } from '../../providers/user'

import { RestaurantlistPage } from "../../pages/restaurantlist/restaurantlist";
import { AddressPage } from "../../pages/address/address";
import { AddressListPage } from "../../pages/address-list/address-list"

@Component({
  selector: "page-pizzamenu",
  templateUrl: "pizzamenu.html"
})
export class PizzamenuPage {
  user: any;
  pizzas: any[] = [{
    name: "PEPPERONI",
    image: "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
    number: 0,
    nameToCheck: 'peperonniPrice'
  },
  {
    name: "JAMON Y QUESO",
    image: "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
    number: 0,
    nameToCheck: 'jamonYQuesoPrice'
  },
  {
    name: "CUATRO QUESOS",
    image: "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
    number: 0,
    nameToCheck: 'cuatroQuesosPrice'

  },
  {
    name: "BARBACOA",
    image: "http://res.cloudinary.com/ddesyiweo/image/upload/v1514023273/pizza-icon-vector-illustration-60015303_ycovbj.jpg",
    number: 0,
    nameToCheck: 'barbacoaPrice'
  }];
  pizzasOrdered: any[] = [];
  counter: number = 0;
  buttonDisabled: boolean = true;
  address: Object;
  userAddresses: any = [{ text: 'pedro'}, {text: 'juan'}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderServ: OrderProvider,
    public auth: AuthProvider,
    public addressServ: AddressProvider,
    public userServ: UserProvider,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    this.getAddressDetails();
    // this.getAllAddresses()
  }

  checkIfThereIsOrder(){
    if(this.pizzasOrdered.length === 0){
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }


  addPizzaToOrder(pizzaIndex) {
    let add = this.pizzas[pizzaIndex];
    let foundPizza = this.pizzasOrdered.find(element => element.name == add.name);
    add.number++
    if (foundPizza == undefined) this.pizzasOrdered.push(add)
    this.checkIfThereIsOrder()
  }

  reduceOrder(pizzaIndex) {
    let reduce = this.pizzas[pizzaIndex];
    let foundPizza = this.pizzasOrdered.find(element => element.name == reduce.name);
    if (foundPizza !== undefined) foundPizza.number--
    if (foundPizza.number == 0) {
      this.pizzasOrdered = this.pizzasOrdered.filter( element => element.name !== foundPizza.name)
    }
    this.checkIfThereIsOrder()
    
  };

  continueToRestPage() {
    if(this.pizzasOrdered.length === 1 && this.pizzasOrdered[0].number === 0){
      this.pizzasOrdered = undefined;
    }
 
      this.orderServ.addPizzasAndInitializeOrder(this.pizzasOrdered).subscribe(() => {
        this.user.address.length === 0
          ? this.navCtrl.push(AddressPage)
          : this.navCtrl.push(RestaurantlistPage);
      });
 
  }

  getAddressDetails(){
    if(this.user.address.length === 0) {
      this.address = 'No hay dirección asociada'
    } else {
      this.addressServ.getAddressDetails(this.user.address[0]).subscribe((addressDetails: any) => {
        this.address = addressDetails.streetName
      })
    }
  }

  openMenu() {
    let profileModal = this.modalCtrl.create(AddressListPage);
   profileModal.onDidDismiss(data => {
     console.log(data);
   });
   profileModal.present();
  }

  getAllAddresses(){
    console.log('ejecuto esto ====>')
    this.userServ.getAllAddresses(this.user._id).subscribe((info: any)=>
    {this.userAddresses = info.address
    console.log(this.userAddresses)}
  )
  }

  

}

// @Component({selector: "page-footer"})
// class Profile {

//  constructor(public viewCtrl: ViewController) {

//  }

//  dismiss() {
//    let data = { 'foo': 'bar' };
//    this.viewCtrl.dismiss(data);
//  }

// }
