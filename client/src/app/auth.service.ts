import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { SocketIoService } from "./socket-io.service";

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:3000/api/';

  TOKEN_KEY = 'token';
  USERNAME_KEY = 'username';
  ISONLINE_KEY = 'isOnline';
  res: any;
  user: any;

  constructor(private http: HttpClient, private io: SocketIoService, private router: Router) { }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get username() {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + 'users/add', user).subscribe();
  }

  login(data) {
    this.http.post(this.BASE_URL + 'users/login', data).subscribe(res => {
      this.authenticate(res);
      this.router.navigate(['user', res['username'], 'home']);
      this.io.socket.connect();
    });
  }

  authenticate(res) {
    let authResponse = res;
    this.res = res;
    if (!authResponse.token)
      return;
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USERNAME_KEY, authResponse.username);
    localStorage.setItem(this.ISONLINE_KEY, authResponse.isOnline);
  }

}
