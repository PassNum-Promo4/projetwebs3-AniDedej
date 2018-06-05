import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../../auth.service";
import { SharedContentService } from "../../../shared-content.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() content: any;
  isClicked: boolean = false;
  selectedEditContent: any;
  isEditMode: boolean = false;

  constructor(private auth: AuthService, private sharedService: SharedContentService) { }

  ngOnInit() {
    this.sharedService.addedComment().subscribe(comment => {
      if (this.content.comments) {
        this.content.comments.push(comment);
      }
    });
    this.sharedService.updatedComment().subscribe(data => {
      if (this.content.comments) {
        for (let i = 0; i < this.content.comments.length; i++) {
          if (this.content.comments[i]._id == data['comment']._id) {
            this.content.comments.splice(i, 1);
            this.content.comments.splice(i, 0, data['comment']);
          }
        }
      }
    });
    this.sharedService.removedComment().subscribe(data => {
      if (this.content.comments) {
        for (let i = 0; i < this.content.comments.length; i++) {
          if (this.content.comments[i]._id == data['comment']._id) {
            this.content.comments.splice(i, 1);
          }
        }
      }
    });
  }

  openComments() {
    this.isClicked = !this.isClicked;
  }

  openEdit(content: any): void {
    this.selectedEditContent = content;
    this.isEditMode = !this.isEditMode;
    console.log(this.selectedEditContent);
  }

  saveEditPost(content) {
    if (this.selectedEditContent) {
      if (this.selectedEditContent === content) {
        this.sharedService.editComment(content, this.content['_id']);
        this.isEditMode = !this.isEditMode;
      }
    }
  }

}
