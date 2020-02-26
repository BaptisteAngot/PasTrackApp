import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import * as jwt_decode from 'jwt-decode';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
        .append('Access-Control-Allow-Origin', 'http://185.216.25.16:5000/')
};

const apiUrl = 'http://185.216.25.16:5000/users';

export class JwtResponse {
  constructor(
      public jwttoken: string,
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  http: HttpClient) {  }

    login(identifiant: User) {
        return this.http.post<User>(apiUrl + '/login', identifiant)
            .pipe(map(
                userData => {
                    sessionStorage.setItem('email', identifiant.email);
                    const tokenStr = 'Bearer ' + userData.token;
                    sessionStorage.setItem('token', tokenStr);
                    return userData;
                }));
    }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('token');
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
  }

  register(identifiant: User) {
    return this.http.post<User>(apiUrl + '/signup', identifiant);
  }
}
