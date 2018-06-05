import { Component, OnInit } from '@angular/core';
import { SharedContentService } from "../../shared-content.service";
import { AuthService } from "../../auth.service";
import { UserService } from "../../user.service";
import {SocketIoService} from "../../socket-io.service";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  constructor(private auth: AuthService, private io: SocketIoService, private sharedService: SharedContentService, private user: UserService) { }

  ngOnInit() {
    this.user.getUser().subscribe();
  }


}
