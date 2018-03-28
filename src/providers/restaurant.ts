import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

const BASE_DOMAIN = "http://localhost:3000";
const DEPLOYED_DOMAIN = 'https://pizzappcompany.herokuapp.com'
const BASE_URL = `${DEPLOYED_DOMAIN}/api/restaurant`;

@Injectable()
export class RestaurantProvider {
  options: object = {
    withCredentials: true
  };

  constructor(public http: HttpClient) {}

  getRestaurants() {
    return this.http.get(`${BASE_URL}/getNearRestaurants`, this.options);
  }

  sendRestInfotoBack(
    name,
    image,
    jamonYQuesoPrice,
    cuatroQuesosPrice,
    barbacoaPrice,
    peperonniPrice,
    postalCodesServedto
  ) {
    return this.http.post(
      `${BASE_URL}/sendRestInfo`,
      {
        name,
        image,
        jamonYQuesoPrice,
        cuatroQuesosPrice,
        barbacoaPrice,
        peperonniPrice,
        postalCodesServedto
      },
      this.options
    );
  }
}
