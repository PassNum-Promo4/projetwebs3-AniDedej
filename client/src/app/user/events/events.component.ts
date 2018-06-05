import { Component, OnInit } from '@angular/core';
import { SharedContentService } from "../../shared-content.service";
import { AuthService } from "../../auth.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  user;
  myShared = [];
  selectedEditContent: any;
  selectedContent: any;
  isEditMode: boolean = false;

  constructor(private auth: AuthService, private sharedService: SharedContentService, private userService: UserService) { }

  ngOnInit() {
    this.sharedService.getMyShared(this.auth.username).subscribe(res => this.myShared = res);
    this.sharedService.getUpdatedContent().subscribe(updatedC => {
      if (this.myShared) {
        for (let i = 0; i < this.myShared.length; i++) {
          if (this.myShared[i]._id == updatedC['_id']) {
            this.myShared.splice(i, 1);
            this.myShared.splice(i, 0, updatedC);
          }
        }
      }
    });
    this.sharedService.removedContent().subscribe(removedC => {
      if (this.myShared) {
        for (let i = 0; i < this.myShared.length; i++) {
          if (this.myShared[i]._id == removedC['_id']) {
            this.myShared.splice(i, 1);
          }
        }
      }
    });
    this.sharedService.addedComment().subscribe(data => {
      if (this.myShared) {
        for (let i = 0; i < this.myShared.length; i++) {
          if (this.myShared[i]._id == data['sharedContentId']) {
            this.myShared[i].comments.push(data['comment']);
          }
        }
      }
    });
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
  }

  onSelect(content: any): void {
    this.selectedContent = content;
  }

  openEdit(content: any): void {
    this.selectedEditContent = content;
    this.isEditMode = !this.isEditMode;
  }

  saveEditPost(content) {
    if (this.selectedEditContent) {
      if (this.selectedEditContent === content) {
        this.sharedService.editMyShared(this.auth.username, content);
        this.isEditMode = !this.isEditMode;
      }
    }
  }

}
