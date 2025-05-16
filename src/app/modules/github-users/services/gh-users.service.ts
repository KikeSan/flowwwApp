import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {GhUserModel} from "../models/ghUser.model";

@Injectable({
  providedIn: 'root'
})
export class GhUsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getGithubUsers(username:any) {
    return this.http.get(`${environment.pathGH}${username}`);
  }
}
