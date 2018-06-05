import { Component, Input, OnInit } from '@angular/core';
import { SharedContentService } from "../../../shared-content.service";
import { AuthService } from "../../../auth.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.css']
})
export class CommentContainerComponent implements OnInit {

  @Input() content: any;

  comments = {
    username: '',
    content: '',
    date: Date.now()
  };
  liked: boolean = false;
  disLiked: boolean = false;
  isClicked: boolean = false;

  constructor(private route: ActivatedRoute, private sharedService: SharedContentService, private auth: AuthService) { }

  ngOnInit() {
  }

  addComment() {
    if (this.comments.content) {
      this.comments.username = this.auth.username;
      /*this.sharedService.postComment(this.comments, this.content._id).subscribe(res => {
        for (let i = 0; i < this.sharedService.sharedContents.length; i++) {
          if (this.sharedService.sharedContents[i]._id == this.content._id) {
            this.sharedService.sharedContents[i].comments.unshift(res);
            this.comments.content = '';
          }
        }
      });*/
      this.sharedService.addComment(this.comments, this.content._id);
      this.comments.content = '';
    }
    this.isClicked = !this.isClicked;
  }

  openComment() {
    this.isClicked = !this.isClicked;
  }

}
