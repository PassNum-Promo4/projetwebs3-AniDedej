import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { UserModel } from "../model/User";
import { SocketIoService } from "../socket-io.service";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel;

  editable: boolean = false;
  cancelEditable: boolean = false;
  messages: any;
  userData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    currPassword: '',
    newPassword: ''
  };

  constructor(private io: SocketIoService, private auth: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  post() {
    if (this.userData) {
      this.userData.firstName = this.user.firstName;
      this.userData.lastName = this.user.lastName;
      this.userData.username = this.user.username;
      this.userData.email = this.user.email;
      this.userService.saveUser(this.userData);
      this.editable = !this.editable;
      if (this.userData.username !== this.auth.username) {
        this.userService.logout(this.user);
      }
    }
  }

  edit() {
    if (!this.editable) {
      this.userData.firstName = this.user.firstName;
      this.userData.lastName = this.user.lastName;
      this.userData.username = this.user.username;
      this.userData.email = this.user.email;
    }
    this.editable = !this.editable;
  }
  cancelEdit() {
    if (!this.cancelEditable) {
      this.cancelEditable = true;
      this.user.firstName = this.userData.firstName;
      this.user.lastName = this.userData.lastName;
      this.user.username = this.userData.username;
      this.user.email = this.userData.email;
      this.editable = !this.editable;
    } else {
      this.cancelEditable = false;
      this.editable = !this.editable;
    }
  }

  deleteUser(user) {
    this.userService.removeUser(user).subscribe(res => {
      this.userService.logout(user);
    });
  }
}
