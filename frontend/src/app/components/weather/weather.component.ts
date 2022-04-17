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

  weatherApiForecasts: weatherApi = {
    weatherApi: undefined,
    openWeather: undefined,
    accuWeather: undefined
  };

  wthData: weatherData = {
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

  wthTestData: any = {
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
  }

  getMeteorologiskData = (latitude: number, longitude: number, days: number) => {
    this.weatherService.getMeteorologiskData(latitude, longitude).subscribe(
      data => {
        this.meteorologiskData = data;

        this.weatherApiForecasts.openWeather = this.meteorologiskData.daily;
        console.log(this.meteorologiskData);

        // Vajuta mapil erinevate kohtade peale, et teha erinevate koordinaatidega requeste ja vaata kas siit console logist
        // on andmed erinevad nendest, mis arrays on

        for (let i = 0; i < days; i++) {
          this.wthData.openWthData.prec.push(Math.round(this.meteorologiskData.daily[i].pop * 10000) / 100);
          this.wthData.openWthData.temp.push(Math.round((this.meteorologiskData.daily[i].temp.day - 273.15) * 10) / 10);
        }
      }
    )
  }

  getWeatherApiData = (latitude: number, longitude: number, days: number) => { 
    this.weatherService.getWeatherApiData(latitude, longitude).subscribe(
      data => {
        this.weatherApiData = data;
        this.weatherApiForecasts.weatherApi = this.weatherApiData.forecast.forecastday;

        for (let i = 0; i < days; i++) {
          this.wthData.date.push(this.weatherApiData.forecast.forecastday[i].date);
          this.wthData.wthApiData.prec.push((this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain + this.weatherApiData.forecast.forecastday[i].day.daily_chance_of_rain) / 2);
          this.wthData.wthApiData.temp.push(this.weatherApiData.forecast.forecastday[i].day.avgtemp_c);
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
        this.weatherApiForecasts.accuWeather = this.accuWeatherData.DailyForecasts;
        console.log(this.accuWeatherData);


        
        for (let i = 0; i < days; i++) {
          if (this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability) {
            this.wthData.accuData.prec.push(Math.round(this.accuWeatherData.DailyForecasts[i].Day.PrecipitationProbability * 100) / 100);
          } else {
            this.wthData.accuData.prec.push(0);
          }
          this.wthData.accuData.temp.push((Math.round((this.accuWeatherData.DailyForecasts[i].Temperature.Maximum.Value + this.accuWeatherData.DailyForecasts[i].Temperature.Minimum.Value) / 2) * 100) / 100);
        }
        
        for (let i = 0; i < days; i++) {
          this.wthTestData = {
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
          this.wthTestData.date.push(this.wthData.date[i]);
          this.wthTestData.accuData.temp = this.wthData.accuData.temp[i];
          this.wthTestData.accuData.prec= this.wthData.accuData.prec[i];
          this.wthTestData.openWthData.temp = this.wthData.openWthData.temp[i];
          this.wthTestData.openWthData.prec= this.wthData.openWthData.prec[i];
          this.wthTestData.wthApiData.temp= this.wthData.wthApiData.temp[i];
          this.wthTestData.wthApiData.prec= this.wthData.wthApiData.prec[i];

          this.htmlWeather.push(this.wthTestData);
        }
        
      }
    )
      
  }
          
  onFormSubmit() {
    this.htmlWeather = [];
    this.wthData = {
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
    if (this.weatherForm.get('latitude')!.value != 0 && this.weatherForm.get('longitude')!.value != 0) {
      this.latitude = this.weatherForm.get('latitude')!.value;
      this.longitude = this.weatherForm.get('longitude')!.value;
    }
    let daysCount = this.weatherForm.get('days')!.value;
    this.getMeteorologiskData(this.latitude, this.longitude, daysCount);
    this.getWeatherApiData(this.latitude, this.longitude, daysCount);
    this.getLocationCode(this.latitude, this.longitude, daysCount);

    this.weatherForm.reset();
    console.log(this.htmlWeather);

    // Testi kas siin for loopis dayscount tootab ilusti
    
    // for (let i = 0; i < daysCount; i++) {
      // this.wthData = {
      //   date: [],
      //   accuData: {
      //     temp: 0,
      //     prec: 0
      //   },
      //   openWthData: {
      //     temp: 0,
      //     prec: 0
      //   },
      //   wthApiData: {
      //     temp: 0,
      //     prec: 0
      //   },
      // };
      
      // this.wthData.date.push(this.weatherApiForecasts.weatherApi[i].date);
      // let accuAvgTemp = Math.round((this.weatherApiForecasts.accuWeather[i].Temperature.Maximum.Value + this.weatherApiForecasts.accuWeather[i].Temperature.Maximum.Value) / 2);
      // let opnWthAvgTemp = Math.round((this.weatherApiForecasts.openWeather[i].temp.day - 273.15) * 100) / 100;
      // this.wthData.accuData.temp = accuAvgTemp;
      // this.wthData.openWthData.temp = opnWthAvgTemp;
      // this.wthData.wthApiData.temp = this.weatherApiForecasts.weatherApi[i].day.avgtemp_c;
      
      // if (this.weatherApiForecasts.accuWeather[i].Day.PrecipitationProbability) {
      //   this.wthData.accuData.prec = Math.round(this.weatherApiForecasts.accuWeather[i].Day.PrecipitationProbability * 100) / 100;
      // } else {
      //   this.wthData.accuData.prec = 0;
      // }
      // // Fixi ara, et AccuWeather api ka oigesti sademete voimalust naitaks
      
      // this.wthData.openWthData.prec = Math.round(this.weatherApiForecasts.openWeather[i].pop * 10000) / 100;
      // this.wthData.wthApiData.prec = Math.round(this.weatherApiForecasts.weatherApi[i].day.daily_chance_of_rain * 100) / 100;
      
      // this.htmlWeather.push(this.wthData);
    //}
  
    //console.log(this.htmlWeather);
  }
}

//  setCoordinates(value: any) {
//     this.latitude = value.lat;
//     this.longitude = value.lon;

//     console.log(this.latitude);
//   }

//   getMeteorologiskData = (latitude: number, longitude: number) => {
//     this.weatherService.getMeteorologiskData(latitude, longitude).subscribe(
//       data => {
//         this.meteorologiskData = data;

//         this.weatherApiForecasts.openWeather = this.meteorologiskData.daily;
//         this.getWeatherApiData(this.latitude, this.longitude);

//         console.log(this.meteorologiskData);
//       }
//       )
//     }

//   getWeatherApiData = (latitude: number, longitude: number) => { 
//     this.weatherService.getWeatherApiData(latitude, longitude).subscribe(
//       data => {
//         this.weatherApiData = data;
//         this.weatherApiForecasts.weatherApi = this.weatherApiData.forecast.forecastday;
//         this.getLocationCode(this.latitude, this.longitude);
//       }
//     )
      
//   }
    
//   getLocationCode = (latitude: number, longitude: number) => {
//     this.weatherService.getLocationCode(latitude, longitude).subscribe(
//       location => {
//         this.location = location;
//         this.locationCode = this.location.Key;
        
//         this.getAccuWeatherData(latitude, longitude, this.location.Key)
//       }
//     )
//   }
        
//   getAccuWeatherData = (latitude: number, longitude: number, locationCode: number) => {
//     this.weatherService.getAccuWeatherData(latitude, longitude, locationCode).subscribe(
//       data => {
//         console.log(data);
//         this.accuWeatherData = data;
//         this.weatherApiForecasts.accuWeather = this.accuWeatherData.DailyForecasts;
        
//       }
//     )
      
//   }
          
//   onFormSubmit() {
//     this.htmlWeather = [];
//     if (this.weatherForm.get('latitude')!.value != 0 && this.weatherForm.get('longitude')!.value != 0) {
//       this.latitude = this.weatherForm.get('latitude')!.value;
//       this.longitude = this.weatherForm.get('longitude')!.value;
//     }
//     let daysCount = this.weatherForm.get('days')!.value;
//     this.getMeteorologiskData(this.latitude, this.longitude);
//     //this.getWeatherApiData(this.latitude, this.longitude);
//     //this.getLocationCode(this.latitude, this.longitude);

//     // Testi kas siin for loopis dayscount tootab ilusti
    
//     for (let i = 0; i < daysCount; i++) {
//       this.wthData = {
//         date: [],
//         accuData: {
//           temp: 0,
//           prec: 0
//         },
//         openWthData: {
//           temp: 0,
//           prec: 0
//         },
//         wthApiData: {
//           temp: 0,
//           prec: 0
//         },
//       };
      
//       this.wthData.date.push(this.weatherApiForecasts.weatherApi[i].date);
//       let accuAvgTemp = Math.round((this.weatherApiForecasts.accuWeather[i].Temperature.Maximum.Value + this.weatherApiForecasts.accuWeather[i].Temperature.Maximum.Value) / 2);
//       let opnWthAvgTemp = Math.round((this.weatherApiForecasts.openWeather[i].temp.day - 273.15) * 100) / 100;
//       this.wthData.accuData.temp = accuAvgTemp;
//       this.wthData.openWthData.temp = opnWthAvgTemp;
//       this.wthData.wthApiData.temp = this.weatherApiForecasts.weatherApi[i].day.avgtemp_c;
      
//       if (this.weatherApiForecasts.accuWeather[i].Day.PrecipitationProbability) {
//         this.wthData.accuData.prec = Math.round(this.weatherApiForecasts.accuWeather[i].Day.PrecipitationProbability * 100) / 100;
//       } else {
//         this.wthData.accuData.prec = 0;
//       }
//       // Fixi ara, et AccuWeather api ka oigesti sademete voimalust naitaks
      
//       this.wthData.openWthData.prec = Math.round(this.weatherApiForecasts.openWeather[i].pop * 10000) / 100;
//       this.wthData.wthApiData.prec = Math.round(this.weatherApiForecasts.weatherApi[i].day.daily_chance_of_rain * 100) / 100;
      
//       this.htmlWeather.push(this.wthData);
//     }
  
//     console.log(this.htmlWeather);
//   }

