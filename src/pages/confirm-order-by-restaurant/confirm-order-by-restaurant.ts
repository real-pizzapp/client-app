import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { OrderDetailsPage } from '../order-details/order-details'
import { OrderProvider } from '../../providers/order';

@Component({
  selector: 'page-confirm-order-by-restaurant',
  templateUrl: 'confirm-order-by-restaurant.html',
})
export class ConfirmOrderByRestaurantPage {
  orders
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider) {
    this.orderServ.getAllOrders().subscribe(orders => this.orders = orders)
  }

  navigateToDetail(orderId: number){
    this.navCtrl.push(OrderDetailsPage, { orderId })
  }
}
