import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import {SearchEngineService} from "../search-engine.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currUser: any;
  searchData = {
    value: ''
  };
  resultData: any[];

  constructor(private auth: AuthService, private userService: UserService, public searchService: SearchEngineService) { }

  ngOnInit() {
  }

  updateResults() {
    if (this.searchData.value) {
      this.searchService.postSearchedResults(this.searchData, this.auth.username).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].username === this.auth.username) {
            res.splice(i, 1);
            this.resultData = res;
          } else {
            this.resultData = res;
          }
        }
      });
    }
    if (this.searchData.value === '') {
      this.resultData = [];
    }
  }

  openDetails(data) {
    this.userService.selectedUser = data;
    this.searchData.value = '';
    this.resultData = [];
  }

}
