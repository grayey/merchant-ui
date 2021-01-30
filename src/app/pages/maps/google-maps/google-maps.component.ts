import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  options: google.maps.MapOptions = {
    center: {
      lat: 40.730610,
      lng: -73.935242
    }
  };

  markerOptions: google.maps.MarkerOptions = {
    position: {
      lat: 40.730610,
      lng: -73.935242
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
