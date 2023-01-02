import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}


  getLocationService(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    });
  }

  //for testing
  getNinjasApi(city:string,country?,state?) {
    const options = {
      params: new HttpParams()
        .set('city', city)
        .set('country', country)
        .set('state',state),
      headers: new HttpHeaders().set('X-Api-Key', environment.ninjas.X_Api_Key),
    };
    return this.http.get('https://api.api-ninjas.com/v1/geocoding?',options);
  }
  //for testing
    // getPositionStackApi() {
  //   const options = this.query ?
  //   {
  //     params: new HttpParams()
  //       .set('access_key', environment.positionStack.apiKey)
  //       .set('query', this.query)
  //   } : {};
  //   return this.http.get(
  //     'http://api.positionstack.com/v1/forward',options
  //   );
  // }
}
