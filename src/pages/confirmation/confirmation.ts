import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})
export class ConfirmationPage {
  order: any;
  pushPage: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderServ: OrderProvider
  ) {}

  ionViewDidLoad() {
    this.orderServ.getMyOrder().subscribe(res => {
      this.order = res[0];
      console.log('mipedido=============>')
      console.log(this.order)
    });
  }
}
