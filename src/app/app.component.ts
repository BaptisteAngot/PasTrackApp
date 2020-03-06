import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // @ts-ignore
    this.authService.authState.subscribe((state) => {
      if (state) {
        this.router.navigate(['earth']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  isconnected() {
    // @ts-ignore
    return this.authService.isAuthenticated() === true;
  }

  disconnected() {
    this.authService.logout();
    console.log(this.authService.isAuthenticated());
    this.ngOnInit();
  }

  ngOnInit() {
  }

  async showConfirm() {
    const confirm = await this.alertCtrl.create({
      header: 'Êtes vous sûr ?',
      message: 'Voulez-vous réellement vous déconnecter ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () => {
            this.disconnected();
          }
        }
      ]
    });
    await confirm.present();
  }
}
