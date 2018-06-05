import { Component, OnInit } from '@angular/core';
import { SharedContentService } from "../../shared-content.service";
import { AuthService } from "../../auth.service";
import { UserService } from "../../user.service";
import { SocketIoService } from "../../socket-io.service";

@Component({
  selector: 'app-shared-content',
  templateUrl: './shared-content.component.html',
  styleUrls: ['./shared-content.component.css']
})
export class SharedContentComponent implements OnInit {

  sharedContents: any[];
  isEditMode: boolean = false;

  sharedContent = {
    username: '',
    thumbnail: '',
    content: '',
    date: Date.now()
  };

  selectedContent: any;
  selectedEditContent: any;

  constructor(private auth: AuthService, private sharedService: SharedContentService, private userService: UserService) {
  }

  ngOnInit() {
    this.sharedContents = [];
    this.sharedService.getShared().subscribe(res => this.sharedContents = res);
    this.sharedService.getNewShared().subscribe(sharedC => {
      this.sharedContents.push(sharedC);
    });
    this.sharedService.removedContent().subscribe(removedC => {
      if (this.sharedContents) {
        for (let i = 0; i < this.sharedContents.length; i++) {
          if (this.sharedContents[i]._id == removedC['_id']) {
            this.sharedContents.splice(i, 1);
          }
        }
      }
    });
    this.sharedService.getUpdatedContent().subscribe(updatedC => {
      if (this.sharedContents) {
        for (let i = 0; i < this.sharedContents.length; i++) {
          if (this.sharedContents[i]._id == updatedC['_id']) {
            this.sharedContents.splice(i, 1);
            this.sharedContents.splice(i, 0, updatedC);
          }
        }
      }
    });
  }

  post() {
    this.sharedContent.username = this.auth.username;
    //this.sharedContent.thumbnail = this.userService.user['thumbnail'];
    //this.sharedService.postShared(this.sharedContent, this.auth.username).subscribe(res => this.sharedService.sharedContents.unshift(res));
    this.sharedService.addShared(this.sharedContent);
    this.sharedContent.content = '';
  }

  onSelect(content: any): void {
    this.selectedContent = content;
  }

  openEdit(content: any): void {
    this.selectedEditContent = content;
    this.isEditMode = !this.isEditMode;
    console.log(this.selectedEditContent);
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
