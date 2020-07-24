import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css']
})
export class LocationInfoComponent implements OnInit {

  title = 'My first AGM project';
  lat: number=20.5937;
  lng: number=78.9629;

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  selectedState = '';
  selectedCity = '';
  states: string[] = [];
  cities: string[] = [];
  allCities;
  selectedStateCities;
  citiesWithDuplicate: string[] = [];
  statesWithDuplicate: string[] = [];

  constructor(private mapsAPILoader: MapsAPILoader, private _service: ApiService,private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.spinner.show();
    this._service.getData("cities").subscribe(data => {
      this.allCities = data;
      this.spinner.hide();

      this.statesWithDuplicate = this.allCities.map(address => {
        return address['State'];
      });

      this.states = this.statesWithDuplicate.filter((value, index) => {
        return this.statesWithDuplicate.indexOf(value) === index
      });
    });



  }

  stateSelected() {
    this.spinner.show();
    this._service.getDataByParamater("cities", this.selectedState).subscribe(data => {
      this.selectedStateCities = data;
      this.spinner.hide();

      this.citiesWithDuplicate = this.selectedStateCities.
        map(address => {
          return address['City']
        });

      this.cities = this.citiesWithDuplicate.filter((value, index) => {
        return this.citiesWithDuplicate.indexOf(value) === index
      })
    });



  }


  cityChange() {
    const geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, this.map);
  }

  geocodeAddress(
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map
  ) {


    const address = this.selectedCity;

    geocoder.geocode({ address: address }, (results, status) => {

      console.log(results[0].geometry.location)
      if (status === "OK") {
        console.log("got result");

        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }



}



