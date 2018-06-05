import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  detailedUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.detailedUser = this.userService.selectedUser;
    console.log(this.detailedUser);
  }

}
