import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnyForUntypedForms, FormBuilder } from '@angular/forms';
import { weatherApi } from 'src/app/models/weatherApiModel';
import { weatherData } from 'src/app/models/weatherData';
import { WeatherDataService } from 'src/app/services/weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  weatherData: any;
  meteorologiskData: any;
  weatherApiData: any;
  accuWeatherData: any;
  location: any;
  htmlWeather: Array<any> = [];

  ol: any;
  map: any;

  defaultLat: number = 58.990459;
  defaultLon: number = 25.574680;

  latitude: number = 0;
  longitude: number = 0;

  weatherBe: any = {
    date: "",
    accuTemp: 0,
    accuPrec: 0,
    openWthTemp: 0,
    openWthPrec: 0,
    wthApiTemp: 0,
    wthApiPrec: 0
  }

  weatherDataList: weatherData = {
    date: [],
    accuData: {
      temp: [],
      prec: []
    },
    openWthData: {
      temp: [],
      prec: []
    },
    wthApiData: {
      temp: [],
      prec: []
    },
  }

  weatherDataObj: any = {
    date: [],
    accuData: {
      temp: 0,
      prec: 0
    },
    openWthData: {
      temp: 0,
      prec: 0
    },
    wthApiData: {
      temp: 0,
      prec: 0
    },
  };

  weatherForm = this.formBuilder.group({
    latitude: 0,
    longitude: 0,
    days: 0
  });

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherDataService
  ) { }

  ngOnInit(): void {

    this.map = new this.ol.Map({
      target: 'map',
      layers: [
        new this.ol.layer.Tile({
          source: new this.ol.source.OSM()
        })
      ],
      view: new this.ol.View({
        center: this.ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

  }

  setCoordinates(value: any) {
    this.latitude = value.lat;
    this.longitude = value.lon;

    this.weatherForm.get("latitude")?.reset();
    this.weatherForm.get("longitude")?.reset();
  }

  saveCurrentWeatherData = (dataList: any) => {
    this.weatherService.saveWeatherData(dataList).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  handleSave() {
    this.saveCurrentWeatherData(this.htmlWeather);
  }

  getMeteorologiskData = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getMeteorologiskData(latitude, longitude).subscribe(
      data => {
        this.meteorologiskData = data;

        //this.weatherApiForecasts.openWeather = this.meteorologiskData.daily;
        console.log(this.meteorologiskData);

        for (let i = 0; i < days; i++) {
          this.weatherDataList.openWthData.prec.push(Math.round(this.meteorologiskData.daily[i].pop * 10000) / 100);
          this.weatherDataList.openWthData.temp.push(Math.round((this.meteorologiskData.daily[i].temp.day - 273.15) * 10) / 10);

          this.weatherBe.openWthTemp = Math.round((this.meteorologiskData.daily[i].temp.day - 273.15) * 10) / 10
          this.weatherBe.openWthPrec = Math.round(this.meteorologiskData.daily[i].pop * 10000) / 100;


        }
      }
    )
  }

  getWeatherApiData = (latitude: number, longitude: number, days: number) => { 
    this.weatherService.getWeatherApiData(latitude, longitude).subscribe(
      data => {
        this.weatherApiData = data;
        //this.weatherApiForecasts.weatherApi = this.weatherApiData.forecast.forecastday;

        for (let i = 0; i < days; i++) {
          this.weatherDataList.date.push(this.weatherApiData.forecast.forecastday[i].date);
          this.weatherDataList.wthApiData.prec.push((this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain + this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain) / 2);
          this.weatherDataList.wthApiData.temp.push(this.weatherApiData.forecast.forecastday[i].day.avgtemp_c);

          // this.weatherBe.date = this.weatherApiData.forecast.forecastday[i].date;
          // this.weatherBe.wthApiTemp = 
        }
      }
    )
      
  }
    
  getLocationCode = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getLocationCode(latitude, longitude).subscribe(
      location => {
        this.location = location;
        //this.locationCode = this.location.Key;

        console.log(this.location.Key);

        this.getAccuWeatherData(this.latitude, this.longitude, this.location.Key, days);
      }
    )
  }
        
  getAccuWeatherData = (latitude: number, longitude: number, locationCode: number, days: number) => {
    this.weatherService.getAccuWeatherData(latitude, longitude, locationCode).subscribe(
      data => {
        this.accuWeatherData = data;
        //this.weatherApiForecasts.accuWeather = this.accuWeatherData.DailyForecasts;
        console.log(this.accuWeatherData);


        
        for (let i = 0; i < days; i++) {
          if (this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability) {
            this.weatherDataList.accuData.prec.push(Math.round(this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability * 100) / 100);
          } else {
            this.weatherDataList.accuData.prec.push(0);
          }
          this.weatherDataList.accuData.temp.push((Math.round((this.accuWeatherData.DailyForecasts[i].Temperature.Maximum.Value + this.accuWeatherData.DailyForecasts[i].Temperature.Minimum.Value) / 2) * 100) / 100);
        }
        
        for (let i = 0; i < days; i++) {
          this.weatherDataObj = {
            date: "",
            accuTemp: 0,
            accuPrec: 0,
            openWthTemp: 0,
            openWthPrec: 0,
            wthApiTemp: 0,
            wthApiPrec: 0
          };
          this.weatherDataObj.date = this.weatherDataList.date[i];
          this.weatherDataObj.accuTemp = this.weatherDataList.accuData.temp[i];
          this.weatherDataObj.accuPrec = this.weatherDataList.accuData.prec[i];
          this.weatherDataObj.openWthTemp = this.weatherDataList.openWthData.temp[i];
          this.weatherDataObj.openWthPrec = this.weatherDataList.openWthData.prec[i];
          this.weatherDataObj.wthApiTemp = this.weatherDataList.wthApiData.temp[i];
          this.weatherDataObj.wthApiPrec = this.weatherDataList.wthApiData.prec[i];

          this.htmlWeather.push(this.weatherDataObj);
        }
        
      }
    )
      
  }
          
  onFormSubmit() {
    this.htmlWeather = [];
    this.weatherDataList = {
      date: [],
    accuData: {
      temp: [],
      prec: []
    },
    openWthData: {
      temp: [],
      prec: []
    },
    wthApiData: {
      temp: [],
      prec: []
    },
    };
    if (this.weatherForm.get('latitude')!.value != null && this.weatherForm.get('longitude')!.value != null) {
      this.latitude = this.weatherForm.get('latitude')!.value;
      this.longitude = this.weatherForm.get('longitude')!.value;
    }
    let daysCount = this.weatherForm.get('days')!.value;
    console.log(daysCount);
    if (daysCount == null || daysCount == 0) {
      daysCount = 3;
    }
    this.getMeteorologiskData(this.latitude, this.longitude, daysCount);
    this.getWeatherApiData(this.latitude, this.longitude, daysCount);
    this.getLocationCode(this.latitude, this.longitude, daysCount);

    console.log(this.htmlWeather);

   
  }
}


// this.weatherDataObj = {
//             date: [],
//             accuData: {
//               temp: 0,
//               prec: 0
//             },
//             openWthData: {
//               temp: 0,
//               prec: 0
//             },
//             wthApiData: {
//               temp: 0,
//               prec: 0
//             },
//           };
//           this.weatherDataObj.date.push(this.weatherDataList.date[i]);
//           this.weatherDataObj.accuData.temp = this.weatherDataList.accuData.temp[i];
//           this.weatherDataObj.accuData.prec= this.weatherDataList.accuData.prec[i];
//           this.weatherDataObj.openWthData.temp = this.weatherDataList.openWthData.temp[i];
//           this.weatherDataObj.openWthData.prec= this.weatherDataList.openWthData.prec[i];
//           this.weatherDataObj.wthApiData.temp= this.weatherDataList.wthApiData.temp[i];
//           this.weatherDataObj.wthApiData.prec= this.weatherDataList.wthApiData.prec[i];

//           this.htmlWeather.push(this.weatherDataObj);
