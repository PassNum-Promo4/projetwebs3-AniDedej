import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SearchEngineService {
  BASE_URL = 'http://localhost:3000/api/';

  constructor (private http: HttpClient) { }

  postSearchedResults(searchData, username): any {
    return this.http.post(this.BASE_URL + 'users/' + username + '/search', searchData);
  }
}
