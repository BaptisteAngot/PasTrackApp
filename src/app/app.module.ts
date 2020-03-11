import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData  } from '@ionic-native/device-motion/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ModalPageModule } from './modal/modal.module';

import {Device} from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {CountStepServiceService} from './services/count-step-service.service';

@NgModule({
  declarations: [
      AppComponent
  ],
  entryComponents: [],
  imports: [
      FormsModule,
      ModalPageModule,
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      NgxMapboxGLModule.withConfig({
          accessToken: 'pk.eyJ1IjoiYmFwdGlzdGVhbmdvdCIsImEiOiJjazNrYTQwdGUwMHdyM2N0NXhhM210YzNzIn0.YefTLUjfpX1uMKBE885C-g',
      })],
  providers: [
    AppComponent,
    CountStepServiceService,
    DeviceMotion,
    Gyroscope,
    StatusBar,
    SplashScreen,
    NgxMapboxGLModule,
    AuthGuardService,
    AuthService,
    Device,
    Geolocation,
    BackgroundMode,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
