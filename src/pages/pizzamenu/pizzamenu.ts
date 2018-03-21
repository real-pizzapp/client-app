import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { OrderProvider } from "../../providers/order";
import { AuthProvider } from "../../providers/auth";
import { RestaurantlistPage } from "../../pages/restaurantlist/restaurantlist";
import { AddressPage } from "../../pages/address/address";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderServ: OrderProvider,
    public auth: AuthProvider,
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
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

}
