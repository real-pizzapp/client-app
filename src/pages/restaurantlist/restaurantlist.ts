import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { RestaurantProvider } from "../../providers/restaurant";
import { OrderProvider } from "../../providers/order";
import { AuthProvider } from "../../providers/auth";
import { ConfirmationPage } from "../../pages/confirmation/confirmation";

@Component({
  selector: "page-restaurantlist",
  templateUrl: "restaurantlist.html"
})
export class RestaurantlistPage {
  user: any;
  restaurants: any;
  totalPrice: any;
  buttonDisabled: boolean = true;
  colors: Array<object>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restaurantServ: RestaurantProvider,
    public orderServ: OrderProvider,
    public auth: AuthProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.auth.user;
    this.restaurantServ
      .getRestaurants()
      .subscribe((restaurants: Array<any>) => {
        this.restaurants = restaurants;
        this.setInitialColors();
      });
  }
  setInitialColors(){
    this.colors = this.restaurants.map(e=>{
      return {'background':'white'}
    })
  }
  changeColor(index){
    this.setInitialColors();
    this.colors[index] ={'background':'red'}
    this.buttonDisabled = false;
  }

  updateOrderWithRestaurant(restaurant) {
    const restaurantId = restaurant;
    this.orderServ.updateOrderWithRestaurant(restaurantId).subscribe();
  }

  navigateToNextPage() {
    this.navCtrl.setRoot(ConfirmationPage);
  }
}
