import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {GhUserModel} from "../models/ghUser.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GhUsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getGithubUsers(username:any) {
    return this.http.get(`${environment.pathGH}${username}+in:login`);
  }

  getFollowers(url:string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `token ${environment.tkGH}`
    });
    return this.http.get<any[]>(`${url}?per_page=100`, { headers });
  }

  getRepos(url: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `token ${environment.tkGH}`
    });
    return this.http.get<any[]>(`${url}?per_page=100`, { headers });
  }

  getFollowing(url: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `token ${environment.tkGH}`
    });
    const cleanUrl = url.replace('{/other_user}', '');
    return this.http.get<any[]>(`${cleanUrl}?per_page=100`, { headers });
  }

  getAllDataGH(user:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `token ${environment.tkGH}`
    });
    return this.http.get<any[]>(`${environment.all}${user}`, { headers });
  }
}
