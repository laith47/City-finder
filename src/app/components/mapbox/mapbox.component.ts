import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  map: mapboxgl.Map;
  geocoder: any;
  text:string='Light theme'
  json:any;
  DarkStyle = 'mapbox://styles/laith017/clcd363oi002i14p6y607a0rt';
  lightStyle = 'mapbox://styles/mapbox/streets-v11';
  defualtStyle = this.DarkStyle;
  defualtStyleLight = false;
  lat =  51.53272776027648;
  lng = -0.13227775571092354;

  city = 'london';
  country?: string;
  state?: string;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getLocationService().then((res) => {
      // this.lat = res.lat;
      // this.lng = res.lng;
    });
    mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      null,
      true
    );
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.defualtStyle,
      zoom: 14,
      center: [this.lng, this.lat],
    });
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
      reverseGeocode: true,


    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    const geoCoder = document.getElementById('geocoder');
    geoCoder.appendChild(this.geocoder.onAdd(this.map));

    // this.mapService.getNinjasApi(this.city, this.country, this.state).subscribe(
    //   (result) => {
    //     this.json=result;
    //     console.log(this.json);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  switchStyle() {
    if (!this.defualtStyleLight) {
      this.defualtStyleLight = !this.defualtStyleLight;
      this.text='Dark theme'
      this.map.setStyle(this.lightStyle);
    } else {
      this.defualtStyleLight = !this.defualtStyleLight;
      this.text='Light theme'
      this.map.setStyle(this.DarkStyle);
    }
  }
}
