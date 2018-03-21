import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from '../../providers/order';

@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
  orderId: number
  orderDetails
  orderStatus
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderServ: OrderProvider) {
  }

  ionViewDidLoad() {
    this.orderId = this.navParams.get('orderId')
    this.getOrderInfo(this.orderId)
  }

  getOrderInfo(orderId){
    this.orderServ.getIndividualOrder(orderId).subscribe(orderDetails => this.orderDetails = orderDetails)  
  }

  updateOrderStatus(event, orderId){
    event.toElement.id === 'accept'? this.orderStatus = 'accepted' : this.orderStatus = 'rejected'
    this.orderServ.updateOrderStatus(orderId, this.orderStatus)
    .subscribe(() => this.getOrderInfo(orderId))
  }



}
