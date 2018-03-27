import { Component, NgZone } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";

import { PizzamenuPage } from '../../pages/pizzamenu/pizzamenu'


import { AddressProvider } from "../../providers/address";


import { AuthProvider } from "../../providers/auth";

@Component({
  selector: 'page-new-address',
  templateUrl: 'new-address.html',
})
export class NewAddressPage {

  
  postalCode;
  latitude;
  longitude;
  address;
  autocompleteItems = [];
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  user: any;
  formInfo: any = {
    streetName: "",
    floor: "",
    postalCode: "",
    coordinates: []
  };
  placesService = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addressServ: AddressProvider,
    public authServ: AuthProvider,
    public viewCtrl: ViewController,
    private zone: NgZone
  ) {
    this.address = {
      place: ""
    };
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ""
    }
  }

  ionViewDidLoad() {
    this.user = this.authServ.user;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getItemCoordinates(item) {
    return new Promise((resolve, reject) => {
      this.placesService.getDetails(
        {
          placeId: item.place_id
        },
        function(place) {
          resolve(place);
        }
      );
    });
  }

  chooseItem(item: any) {
    this.getItemCoordinates(item).then((place: any) => {
      let postalCode = Number(
        place.formatted_address.split(", ")[2].split(" ")[0]
      );
      let longitude = place.geometry.location.lng();
      let latitude = place.geometry.location.lat();
      let address = place.name;
      this.formInfo.postalCode = postalCode;
      this.formInfo.streetName = address;
      this.formInfo.coordinates = { type: "Point", coordinates: [longitude, latitude] };
    });
  }

  updateSearch() {
    if (this.autocomplete.query == "") {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions(
      {
        input: this.autocomplete.query
      },
      function(predictions: any, status) {
        if (!predictions)
          predictions = [{ description: "no street specified" }];
        me.autocompleteItems = [];
        me.zone.run(function() {
          predictions.forEach(function(prediction) {
            me.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  addAddress() {
    const userId = this.user._id;
    const { streetName, floor, postalCode, coordinates } = this.formInfo;
    if( postalCode === undefined || streetName ===  undefined || floor === undefined)
    { console.log("you must fill in all details") 
    } else {
      this.addressServ
      .newAddress(userId, streetName, floor, postalCode, coordinates)
      .subscribe(()=> {
        console.log('entro pero no quiero hacer el pop')
        this.navCtrl.setRoot(PizzamenuPage)});
    }
  }

}
