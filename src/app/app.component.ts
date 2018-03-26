import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AuthProvider } from "../providers/auth";

import { HomePage } from "../pages/home/home";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { PizzamenuPage } from "../pages/pizzamenu/pizzamenu";
import { RestaurantlistPage } from "../pages/restaurantlist/restaurantlist";
import { AddressPage } from "../pages/address/address";
import { ConfirmationPage } from "../pages/confirmation/confirmation";
import { RestaurantInfoForm } from "../pages/restaurant-info-form/restaurant-info-form";
import { ConfirmOrderByRestaurantPage } from "../pages/confirm-order-by-restaurant/confirm-order-by-restaurant";
import { UserEditPage } from '../pages/user-edit/user-edit'


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user: any;
  pages: Array<{ title: string; component: any; userRole: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
  ) {
    this.initializeApp();

    this.pages = [
      { title: "Home", component: HomePage, userRole: "user" },
      { title: "Signup", component: SignupPage, userRole: "user" },
      { title: "Login", component: LoginPage, userRole: "user" },
      { title: "Pizza", component: PizzamenuPage, userRole: "user" },
      { title: "Restaurant", component: RestaurantlistPage, userRole: "user" },
      { title: "Address", component: AddressPage, userRole: "user" },
      { title: "Pizza", component: PizzamenuPage, userRole: "user" },
      { title: "Confirmation", component: ConfirmationPage, userRole: "user" },
      { title: "Perfil", component: UserEditPage, userRole: "user"},
      { title: "RestInfo", component: RestaurantInfoForm, userRole: "admin" },
      { title: "restaurant-confirm", component: ConfirmOrderByRestaurantPage, userRole: "admin" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.auth.loginEvent.subscribe(user => { user.role == "user" ? (this.pages = this.pages.filter(e => e.userRole == "user")) : "" });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
