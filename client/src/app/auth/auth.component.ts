import { Component, OnInit } from '@angular/core';
import {SocketIoService} from "../socket-io.service";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private io: SocketIoService, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.io.emit('user', { username: this.auth.username });
  }

}
