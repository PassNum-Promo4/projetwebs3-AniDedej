import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from "../../user.service";
import { UserModel } from "../../model/User";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: ['./peoples.component.css']
})
export class PeoplesComponent implements OnInit, OnDestroy, OnChanges {

  usersObs: Observable<UserModel[]>;
  users = [];
  sub: Subscription;

  constructor(public userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    //this.usersObs = this.userService.getUsers(this.auth.username);
    this.sub = this.userService.getUsers(this.auth.username).subscribe(res => {
      this.users = res;
    });

    this.userService.getConnectedUser().subscribe(user => {
      if (this.users) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username == user['username']) {
            this.users.splice(i, 1);
            this.users.splice(i, 0, user);
          }
        }
      }
    });
    this.userService.getOfflineUser().subscribe(user => {
      if (this.users) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].username == user['username']) {
            this.users.splice(i, 1);
            this.users.splice(i, 0, user);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnChanges() {
  }

}
