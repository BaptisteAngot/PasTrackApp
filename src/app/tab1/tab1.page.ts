import { Component } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public xOrient: any;
  public yOrient: any;
  public zOrient: any;
  public timestamp: any;
  public accX: any;
  public accY: any;
  public accZ: any;
  public orientation: any;

  constructor(
      private deviceMotion: DeviceMotion,
      private gyroscope: Gyroscope
  ) {}

  getgyro() {
    this.gyroscope.getCurrent().then();


    this.gyroscope.watch({frequency: 1000})
        .subscribe((orientation: GyroscopeOrientation) => {
          this.xOrient = orientation.x * (180 / Math.PI);
          this.yOrient = orientation.y * (180 / Math.PI);
          this.zOrient = orientation.z * (180 / Math.PI);
          this.timestamp = orientation.timestamp;
        });
  }


  Accelerometer() {
    this.deviceMotion.getCurrentAcceleration().then();

    // Watch device acceleration
    // tslint:disable-next-line:prefer-const
    let subscription = this.deviceMotion.watchAcceleration({frequency: 100}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;
    });

  }
}
