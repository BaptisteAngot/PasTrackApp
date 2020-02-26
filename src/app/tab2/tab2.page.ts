import { Component } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public xOrient: any;
  public yOrient: any;
  public zOrient: any;
  public o = 0;
  public i = 0;
  public accX: any;
  public accY: any;
  public accZ: any;
  public orientation: any;
  public arrayG: any[];
  public arrayA: any[];




  constructor(private deviceMotion: DeviceMotion, private gyroscope: Gyroscope) {  }

  getgyro() {

    const options: GyroscopeOptions = {
      frequency: 100
    };

    this.gyroscope.getCurrent(options)
        .then((orientation: GyroscopeOrientation) => {
          this.xOrient = orientation.x;
          this.yOrient = orientation.y;
          this.zOrient = orientation.z;


        })
        .catch();


    this.gyroscope.watch()
        .subscribe((orientation: GyroscopeOrientation) => {
          this.xOrient = orientation.x;
          this.yOrient = orientation.y;
          this.zOrient = orientation.z;

          if (this.arrayG[9]) {
            console.log(this.arrayG);
            this.o = 0;
          } else {
            this.arrayG[this.o] = [
              this.xOrient,
              this.yOrient,
              this.zOrient
            ];
            this.o++;
          }
        });
  }

  test(x, y, z) {
    if (x > 0.30  || y > 0.30 || z > 0.30) {
      if (typeof this.arrayA[9] !== 'undefined') {
        console.log(this.arrayA);
        this.i = 0;
      } else {
        this.arrayA[this.i] = [
          x,
          y,
          z
        ];
        this.i++;
      }
    }
  }

  Accelerometer() {
    this.deviceMotion.getCurrentAcceleration().then();

    // Watch device acceleration
    // tslint:disable-next-line:prefer-const
    let test = this.deviceMotion.watchAcceleration({frequency: 100}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;

      this.test(this.accX, this.accY, this.accZ);

    });



  }

  ok() {
    this.deviceMotion.watchAcceleration().subscribe().unsubscribe();
  }

}
