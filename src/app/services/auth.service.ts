import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {ToastController, Platform, AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import { Device } from '@ionic-native/device/ngx';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
        .append('Access-Control-Allow-Origin', 'http://185.216.25.16:5000/')
};

const apiUrl = 'https://185.216.25.16:5000/users';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authState = new BehaviorSubject(false);
  constructor(
      private  http: HttpClient,
      private storage: Storage,
      private router: Router,
      private platform: Platform,
      public toastController: ToastController,
      private alertCtrl: AlertController,
      private device: Device
  ) {
      this.platform.ready().then(() => {
          this.isUserLoggedIn();
      });
  }

  async login(identifiant: User, errorcb) {
    return this.http.post(apiUrl + '/login', identifiant, httpOptions)
        .subscribe((data: any) => {
            const session = {
                mail: identifiant.email,
                token: data.jwtoken,
                id_device: this.device.uuid
            };
            this.storage.set('USER_INFO', session ).then((response) => {
                this.authState.next(true);
                this.router.navigate(['heart']);
            });
        },  error => {
            if (error.statusText === 'Unknown Error') {
                errorcb('Pas de connexion');
            } else if (error.statusText === 'Unauthorized') {
                errorcb('L\'identifiant ou le mot de passe est incorrect');
            } else {
                console.log(error);
            }
        });
  }

  isUserLoggedIn() {
      this.storage.get('USER_INFO').then((response) => {
         if (response) {
             this.authState.next(true);
         }
      });
  }

  logout() {
      this.storage.clear().then(() => {
          this.router.navigate(['login']);
      });
      this.authState.next(false);
  }

  register(identifiant: User) {
    return this.http.post<User>(apiUrl + '/signup', identifiant);
  }

  isAuthenticated() {
      return this.authState.value;
  }
}
