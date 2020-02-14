import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import * as jwt_decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
};

const apiUrl = 'http://185.216.25.16:3000/user';

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
              const decode = jwt_decode(tokenStr);
              sessionStorage.setItem('role', decode.role);
              sessionStorage.setItem('token', tokenStr);
              return userData;
            }
        ));
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
