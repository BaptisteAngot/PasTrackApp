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
import { Router } from '@angular/router';
import { CountStepServiceService } from '../services/count-step-service.service';

@Component({
    selector: 'app-heart',
    templateUrl: './heart.page.html',
    styleUrls: ['./heart.page.scss'],
    providers: [Gyroscope, CountStepServiceService]
})
export class HeartPage implements OnInit {
  private barChart: Chart;
  // @ts-ignore
  @ViewChild('barCanvas') barCanvas: ElementRef;
   // @ts-ignore
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
   // @ts-ignore
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  private lineChart: Chart;
  public step;
  constructor(
      public modalController: ModalController,
      private device: Device,
      private deviceMotion: DeviceMotion,
      private gyroscope: Gyroscope,
      private api: HttpClient,
      private geolocation: Geolocation,
      private authService: AuthService,
      private router: Router,
      private countStepServiceService: CountStepServiceService,
  ) {
  }

  isconnected() {
    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['login']);
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }
  ngOnInit() {
    setInterval(() => {
      console.log('Time');
      console.log(this.countStepServiceService.getstep());
      this.step = this.countStepServiceService.getstep();
    }, 1000);
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
}
