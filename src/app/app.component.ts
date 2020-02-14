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
  }

  isconnected() {
    return this.authService.isUserLoggedIn() === true;
  }

  disconnected() {
    this.authService.logout();
    this.router.navigateByUrl('login');
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
            console.log('Confirm Okay.');
            this.disconnected();
          }
        }
      ]
    });
    await confirm.present();
  }


}
