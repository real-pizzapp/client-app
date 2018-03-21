import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const BASE_DOMAIN = "http://localhost:3000";
const BASE_URL = `${BASE_DOMAIN}/api/order`;

@Injectable()
export class OrderProvider {
  options: object = {
    withCredentials: true
  };

  order

  constructor(public http: HttpClient) {
  }

  getMyOrder() {
    return this.http.get(`${BASE_URL}/getMyOrder`, this.options);
  }

  getAllOrders() {
    return this.http.get(`${BASE_URL}/getAllOrders`, this.options)
  }

  getIndividualOrder(orderId){
    return this.http.get(`${BASE_URL}/getAllOrders/${orderId}`)
  }

  updateOrderWithRestaurant(restaurantId) {
    return this.http.patch(`${BASE_URL}/updateOrderWithRestaurant/${this.order._id}`, { restaurantId }, this.options)
  }
  
  updateOrderStatus(orderId, orderStatus){
    return this.http.patch(`${BASE_URL}/uptadeOrderStatus`, {orderStatus}, this.options)
  }

  
  addPizzasAndInitializeOrder(pizzasOrdered){
    const initialPizzas = pizzasOrdered
    return this.http.post(`${BASE_URL}/createOrder`, { initialPizzas }, this.options)
    .map(res => this.order = res)
  }
}
