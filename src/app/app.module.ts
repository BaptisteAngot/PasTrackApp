import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData  } from '@ionic-native/device-motion/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
      AppComponent
  ],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      NgxMapboxGLModule.withConfig({
          accessToken: 'pk.eyJ1IjoiYmFwdGlzdGVhbmdvdCIsImEiOiJjazNrYTQwdGUwMHdyM2N0NXhhM210YzNzIn0.YefTLUjfpX1uMKBE885C-g',
  })],
  providers: [
    DeviceMotion,
    Gyroscope,
    StatusBar,
    SplashScreen,
    NgxMapboxGLModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
