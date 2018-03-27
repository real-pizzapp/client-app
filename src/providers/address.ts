import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const BASE_DOMAIN = "http://localhost:3000";
const BASE_URL = `${BASE_DOMAIN}/api/address`;

@Injectable()
export class AddressProvider {
  options:object = {
    withCredentials:true,
  }
  constructor(public http: HttpClient) {
    console.log("Hello AddressProvider Provider");
  }

  addAddresstoUserAndGeneralInfo(userId, name, surname, telephone, streetName, floor, postalCode, coordinates) {
    return this.http
      .post(`${BASE_URL}/create`, {
        userId,
        streetName,
        floor,
        postalCode,
        coordinates,
      }, this.options)
      .map(res => console.log(res));
  }

  newAddress(userId, streetName, floor, postalCode, coordinates){
    return this.http.post(`${BASE_URL}/addAddress`,{userId, streetName, floor, postalCode, coordinates}, this.options)
  }

  getAddressDetails(addressId){
    return this.http.get(`${BASE_URL}/getAddress/${addressId}`, this.options)
  }
}
