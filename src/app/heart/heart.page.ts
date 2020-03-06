import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ModalPage } from '../modal/modal.page';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import {Gyroscope, GyroscopeOrientation, GyroscopeOptions} from '@ionic-native/gyroscope/ngx';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../services/auth.service';
import {Data} from '../model/Data';
import {Result} from '../model/Result';
import { Router } from '@angular/router';

const apiUrl = 'https://185.216.25.16:5000/datas';


@Component({
    selector: 'app-heart',
    templateUrl: './heart.page.html',
    styleUrls: ['./heart.page.scss'],
    providers: [Gyroscope]
})
export class HeartPage implements OnInit {
  public Array = [];
  public step = 0;
  public Data: Data;
  public stepStatus = false;

  public result: Result;

  public maxX: number;
  public minX: number;

  public maxY: number;
  public minY: number;

  public maxZ: number;
  public minZ: number;

  public x = 0;
  public y = 0;
  public z = 0;

  public accX = 0;
  public accY = 0;
  public accZ = 0;

  public positionX = 0;
  public positionY = 0;
  public positionZ = 0;

  public accuracy: any;
  public long: any;
  public lat: any;
  public speed: any;

  public timestamp: any;
  private barChart: Chart;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // @ts-ignore
  @ViewChild('barCanvas') barCanvas: ElementRef;
   // @ts-ignore
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
   // @ts-ignore
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  private doughnutChart: Chart;
  private lineChart: Chart;

  // tslint:disable-next-line:max-line-length
  constructor(
      public modalController: ModalController,
      private device: Device,
      private deviceMotion: DeviceMotion,
      private gyroscope: Gyroscope,
      private api: HttpClient,
      private geolocation: Geolocation,
      private authService: AuthService,
      private router: Router
  ) {
    this.isconnected();
    this.minX = 0;
    this.maxX = 0;
    this.minY = 0;
    this.maxY = 0;
    this.minZ = 0;
    this.maxZ = 0;
    this.gyro();
  }
  isconnected() {
    if (this.authService.isAuthenticated() === false) {
      this.router.navigate(['login']);
    }
  }
  gyro() {

    this.geolocation.getCurrentPosition().then((resp) => {}).catch((error) => {
      this.accuracy = 'error';
      this.long = 'error';
      this.lat = 'error';
      this.speed = 'error';
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.speed = data.coords.speed;
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.accuracy = data.coords.accuracy;
    });



    const options: GyroscopeOptions = {
      frequency: 50
    };

    this.gyroscope.getCurrent(options).then().catch();


    this.gyroscope.watch().subscribe((orientation: GyroscopeOrientation) => {
      this.x = orientation.x;
      this.z = orientation.z;
      this.y = orientation.y;
    });


    this.deviceMotion.getCurrentAcceleration().then().catch();

    this.deviceMotion.watchAcceleration({frequency: 50}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accZ = acceleration.z;
      this.accY = acceleration.y;
      this.timestamp = acceleration.timestamp;
    });

    setInterval(() => {
      this.position(this.accX, this.accY, this.accZ);
      if (this.minX > this.accX) {
        this.minX = this.accX;
      }
      if (this.maxX < this.accX) {
        this.maxX = this.accX;
      }
      if (this.minY > this.accY) {
        this.minY = this.accY;
      }
      if (this.maxY < this.accY) {
        this.maxY = this.accY;
      }
      if (this.minZ > this.accZ) {
        this.minZ = this.accZ;
      }
      if (this.maxZ < this.accZ) {
        this.maxZ = this.accZ;
      }
      this.Data = {
        x: this.x,
        y: this.y,
        z: this.z,
        positionX: this.positionX,
        positionY: this.positionY,
        positionZ: this.positionZ,
        accX: this.accX,
        accY: this.accY,
        accZ: this.accZ,
        steps: this.step,
        accuracy: this.accuracy,
        long: this.long,
        lat: this.lat,
        speed: this.speed,
        timestamp: this.timestamp,
        id_device: this.device.uuid
      };

      this.Array.push(this.Data);
    }, 50);

    setInterval(() => {
      const x = (this.maxX - this.minX);
      const y = (this.maxY - this.minY);
      const z = (this.maxZ - this.minZ);
      this.result = {
        X: x,
        Y: y,
        Z: z,
      };
      const AxeMax = Math.max(this.result.X, this.result.Y, this.result.Z);

      if ( this.result.X === AxeMax) {
        const treshold = ((this.minX + this.maxX) / 2);
        let somme = 0;
        let moyenne = 0;


        this.Array.forEach(function(element) {
          moyenne += element.accX;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accX - moyenne, 2));
        }
        let stepValid = 0;
        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accX <= 8.5 && this.Array[i].accX >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));
            if (i !== (this.Array.length - 1) && (this.Array[i].accX < et || this.Array[i].accX > (et * -1))) {
              if (this.Array[i].accX >= treshold && this.Array[a].accX <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if ( this.result.Y === AxeMax ) {
        const treshold = ((this.minY + this.maxY) / 2);
        let somme = 0;
        let moyenne = 0;
        let stepValid = 0;
        this.Array.forEach(function(element) {
          moyenne += element.accY;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accY - moyenne, 2));
        }


        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accY <= 8.5 && this.Array[i].accY >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));

            if (i !== (this.Array.length - 1) && (this.Array[i].accY < et || this.Array[i].accY > (et * -1))) {
              if (this.Array[i].accY >= treshold && this.Array[a].accY <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if ( this.result.Z == AxeMax ) {
        const treshold = ((this.minZ + this.maxZ) / 2);
        let somme = 0;
        let moyenne = 0;
        let stepValid = 0;
        this.Array.forEach(function(element) {
          moyenne += element.accZ;
        });
        moyenne = (moyenne / this.Array.length );

        for (let i = 0; i < this.Array.length; i++) {
          somme += (Math.pow(this.Array[i].accZ - moyenne, 2));
        }
        for (let i = 0; i < this.Array.length; i++) {
          const a = i + 1;
          if (this.Array[i].accZ <= 8.5 && this.Array[i].accZ >= -8.5) {
            const et = Math.sqrt((somme / (this.Array.length - 1)));
            if (i !== (this.Array.length - 1) && (this.Array[i].accZ < et || this.Array[i].accZ > (et * -1))) {
              if (this.Array[i].accZ >= treshold && this.Array[a].accZ <= treshold) {
                stepValid++;
              }
            }
          }
        }
        if ( this.stepStatus ) {
          if (stepValid <= 3 && stepValid >= 1) {
            this.step = (Number(this.step) + Number(stepValid));
          } else {
            this.stepStatus = false;
          }
        } else {
          if (stepValid <= 3 && stepValid >= 1) {
            this.stepStatus = true;
          }
        }
      }
      if (this.stepStatus && this.step > 0) {
        this.api.post(apiUrl + '/add', JSON.stringify(this.Array), this.httpOptions).subscribe();
      }
      this.Array.splice(0, 100);
      this.result.X = 0;
      this.result.Y = 0;
      this.result.Z = 0;
      this.maxX = 0;
      this.minX = 0;
      this.maxY = 0;
      this.minY = 0;
      this.maxZ = 0;
      this.minZ = 0;
    }, 1000);
  }
  async presentModal() {
    // console.log("COUCOU");

    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }
  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        datasets: [
          {
            label: 'Nombre de Pas',
            data: [5000, 3000, 2500, 1500, 12000, 6500, 4000],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,

          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });



    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [25000, 33000, 32500, 31500, 212000, 16500, 24000, 32500, 31500, 212000, 16500, 24000],
            spanGaps: false
          }
        ]
      }
    });
  }
  position(accX, accY, accZ) {
    this.positionX = Number(accX * 0.5 * 0.01) + Number(this.positionX) + Number(accX * 0.01);
    this.positionY = Number(accY * 0.5 * 0.01) + Number(this.positionY) + Number(accY * 0.01);
    this.positionZ = Number(accZ * 0.5 * 0.01) + Number(this.positionZ) + Number(accZ * 0.01);
  }
}
