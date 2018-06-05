import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import {UserService} from "./user.service";
import {SocketIoService} from "./socket-io.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {

  }

}
