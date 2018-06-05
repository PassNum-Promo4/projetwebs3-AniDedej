import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {SocketIoService} from "./socket-io.service";

@Injectable()
export class SharedContentService {
  BASE_URL = 'http://localhost:3000/api/';

  sharedContents: any[];
  comments: any;

  constructor(private http: HttpClient, private auth: AuthService, private io: SocketIoService) {
  }

  getShared(): Observable<any[]>{
    return this.http.get<any[]>(this.BASE_URL + 'public').pipe();
  }

  getMyShared(username): Observable<any[]>{
    return this.http.get<any[]>(this.BASE_URL + 'public/' + username).pipe();
  }

  /*editMyShared(username, content) {
    return this.http.put(this.BASE_URL + 'public/edit/' + username, content);
  }*/

  editMyShared(username, shared) {
    if (this.auth.username === username) {
      this.io.emit('edit-shared', shared);
    }
  }

  getUpdatedContent() {
    return this.io.createObservable('updated-shared');
  }

  /*removeMyShared(username, id) {
    if (this.auth.username === username) {
      this.http.delete(this.BASE_URL + 'public/remove/' + id).subscribe(res => {
        if (this.sharedContents) {
          for (let i = 0; i < this.sharedContents.length; i++) {
            if (this.sharedContents[i]._id === res['_id']) {
              this.sharedContents.splice(i, 1);
            }
          }
        }
      });
    }
  }*/

  removeMyShared(username, shared) {
    if (this.auth.username === username) {
      this.io.emit('remove-shared', shared);
    }
  }

  removedContent() {
    return this.io.createObservable('removed-shared');
  }

  /*postShared(shared, username) {
    if (shared) {
      return this.http.post(this.BASE_URL + 'public/add/' + username, shared);
    }
  }*/

  addShared(shared) {
    if (shared) {
      this.io.emit('new-shared', shared);
    }
  }

  getNewShared() {
    return this.io.createObservable('sharedContent');
  }

  postComment(comment, id) {
    return this.http.post(this.BASE_URL + 'public/comments/add/' + id, comment);
  }

  addComment(comment, id) {
    let data = {
      sharedContentId: id,
      comment: comment
    };
    this.io.emit('new-comment', data);
  }

  addedComment() {
    return this.io.createObservable('comment');
  }

  removeComment(comment, id) {
    if (comment && id) {
      let data = {
        sharedContentId: id,
        comment: comment
      };
      this.io.emit('remove-comment', data);
    }
  }

  removedComment() {
    return this.io.createObservable('removed-comment');
  }


  editComment(comment, id) {
    let data = {
      sharedContentId: id,
      comment: comment
    };
    this.io.emit('edit-comment', data);
  }

  updatedComment() {
    return this.io.createObservable('updated-comment');
  }

}
