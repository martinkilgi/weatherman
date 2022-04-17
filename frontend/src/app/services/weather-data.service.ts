import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private weather_url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=58.990459&lon=25.574680";

  constructor(
    private http: HttpClient,
  ) { }

  getMeteorologiskData(lat: number, lon: number): Observable<any> {
    //const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=0827dbe14786d005d4c920ab375b9306"
    const data = this.http.get(url);
    return data;
  }

  getWeatherApiData(lat: number, lon: number) {
    const url = "https://api.weatherapi.com/v1/forecast.json?key=23d80afb25784be797e110409221304&q=" + lat + "," + lon + "&days=3&aqi=no&alerts=no";
    const data = this.http.get(url);
    return data;
  }

  getLocationCode(lat: number, lon: number) {
    const url = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=gtSArTmdtOppj3HEaGvKnEfTHUqiw3Fw&q=" + lat + "%2C" + lon + "";
    const data = this.http.get(url);
    return data;
  }

  getAccuWeatherData(lat: number, lon: number, locationCode: number) {
    const url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationCode + "?apikey=gtSArTmdtOppj3HEaGvKnEfTHUqiw3Fw&metric=true";
    const data = this.http.get(url);
    return data;
  }

}