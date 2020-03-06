import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {

  constructor(
      private alertCtrl: AlertController,
      private backgroundMode: BackgroundMode
  ) { }

  ngOnInit() {
  }

  async confirmStopBgMode() {
    const confirm = await this.alertCtrl.create({
      header: 'Êtes vous sûr ?',
      message: 'Voulez-vous réellement enlever le mode background ? Certaines fonctionnalités peuvent ne plus marcher',
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () => {
            this.stopBgMode();
          }
        }
      ]
    });
    await confirm.present();
  }

  stopBgMode() {
    this.backgroundMode.disable();
  }

  activeBgMode() {
    this.backgroundMode.enable();
  }

  isenable() {
    return this.backgroundMode.isEnabled();
  }
}
