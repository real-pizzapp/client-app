import { Component } from "@angular/core";
import { RestaurantProvider } from "../../providers/restaurant";

interface restInfo {
    name: string;
    image: string;
    jamonYQuesoPrice: number;
    cuatroQuesosPrice: number;
    barbacoaPrice: number;
    peperonniPrice: number;
    postalCodesServedto: number;
}

@Component({
  selector: "page-restaurant-info-form",
  templateUrl: "restaurant-info-form.html"
})
export class RestaurantInfoForm implements restInfo {
    name: ""
    image: ""
    jamonYQuesoPrice: 0
    cuatroQuesosPrice: 0
    barbacoaPrice: 0
    peperonniPrice: 0
    postalCodesServedto: 0
  constructor(public restServ: RestaurantProvider) {}

  createRestaurantInfo() {
    const name = this.name
    const  image = this.image
    const  jamonYQuesoPrice = this.jamonYQuesoPrice
    const cuatroQuesosPrice = this.cuatroQuesosPrice
    const barbacoaPrice = this.barbacoaPrice
    const peperonniPrice = this.peperonniPrice
    const postalCodesServedto = this.postalCodesServedto
   
    this.restServ.sendRestInfotoBack(
      name,
      image,
      jamonYQuesoPrice,
      cuatroQuesosPrice,
      barbacoaPrice,
      peperonniPrice,
      postalCodesServedto).subscribe(() => {console.log('successful submission')})
  }
}
