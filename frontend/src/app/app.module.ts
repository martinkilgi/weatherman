import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { MapComponent } from './components/map/map.component';
import { MarkerService } from './services/marker.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MapsModule
  ],
  providers: [MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
