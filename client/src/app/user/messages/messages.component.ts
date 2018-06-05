import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() { }
}
