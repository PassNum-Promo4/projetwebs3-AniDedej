import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class FileUploadService {
  BASE_URL = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, username): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post( this.BASE_URL + username + '/upload', formData);
  }
}
