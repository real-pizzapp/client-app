import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup'
import { LoginPage } from '../pages/login/login'
import { PizzamenuPage } from '../pages/pizzamenu/pizzamenu'
import { RestaurantlistPage} from '../pages/restaurantlist/restaurantlist'
import { ConfirmationPage } from '../pages/confirmation/confirmation'
import { AddressPage } from '../pages/address/address'
import { RestaurantInfoForm } from '../pages/restaurant-info-form/restaurant-info-form'
import { ConfirmOrderByRestaurantPage } from '../pages/confirm-order-by-restaurant/confirm-order-by-restaurant'
import { OrderDetailsPage } from '../pages/order-details/order-details'
import { UserEditPage } from '../pages/user-edit/user-edit'
import { AddressListPage } from '../pages/address-list/address-list'
import { NewAddressPage } from "../pages/new-address/new-address"


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth';
import { RestaurantProvider } from '../providers/restaurant';
import { OrderProvider } from '../providers/order';
import { AddressProvider } from '../providers/address';
import { UserProvider } from '../providers/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    PizzamenuPage,
    RestaurantlistPage,
    ConfirmationPage,
    AddressPage,
    RestaurantInfoForm,
    ConfirmOrderByRestaurantPage,
    OrderDetailsPage,
    UserEditPage,
    AddressListPage,
    NewAddressPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    PizzamenuPage,
    RestaurantlistPage,
    ConfirmationPage,
    AddressPage,
    RestaurantInfoForm,
    ConfirmOrderByRestaurantPage,
    OrderDetailsPage,
    UserEditPage,
    AddressListPage,
    NewAddressPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RestaurantProvider,
    OrderProvider,
    AddressProvider,
    UserProvider,
  ]
})
export class AppModule {}
