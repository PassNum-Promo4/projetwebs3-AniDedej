import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserModel } from "./model/User";
import "rxjs/add/operator/do";
import {Observer} from "rxjs/Observer";
import {SocketIoService} from "./socket-io.service";
import {Router} from "@angular/router";

@Injectable()
export class UserService implements OnInit {
  public BASE_URL = 'http://localhost:3000/api/';
  private UNKNOWN_USER = new UserModel('', '', '', '', '', '', false);
  public userSubject = new BehaviorSubject(this.UNKNOWN_USER);
  private usersSubject = new BehaviorSubject(UserModel['']);
  public user: Observable<UserModel>;
  public users: Observable<UserModel[]>;
  public userThumbnail: string;
  public messages: any;
  selectedUser;

  constructor(private http: HttpClient, private auth: AuthService, private io: SocketIoService, private router: Router) {
  }

  ngOnInit() {
  }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(this.BASE_URL + 'users/me');
  }

  getConnectedUser() {
    return this.io.createObservable('connected-user');
  }

  getOfflineUser() {
    return this.io.createObservable('disconnected-user');
  }

  getThumbnail(filename) {
    if (this.user['thumbnail']) {
      return this.http.get(this.BASE_URL + 'users/images/' + filename, {
        responseType: 'blob'
      });
    }
  }

  getUsers(username): Observable<UserModel[]> {
    if (username) {
      return this.http.get<UserModel[]>(this.BASE_URL + 'users/' + username);
    }
  }

  saveUser(userData) {
    return this.http.post(this.BASE_URL + 'users/me', userData).subscribe(res => {
      this.messages = res;
    });
  }

  logout(user) {
    this.http.post(this.BASE_URL + 'users/logout', user).subscribe(res => {
      this.auth.authenticate(res);
      this.users.forEach(res => {
        this.user._do(user => {
          if (res[0] !== user) {
            console.log('its true');
            console.log(res);
            console.log(user);
          }
        });
      });
    });
    localStorage.removeItem(this.auth.TOKEN_KEY);
    localStorage.removeItem(this.auth.USERNAME_KEY);
    localStorage.removeItem(this.auth.ISONLINE_KEY);
    this.io.socket.disconnect();
    this.router.navigate(['/']);
  }

  removeUser(user) {
    return this.http.delete(this.BASE_URL + 'users/delete/' + user['username']);
  }
}
