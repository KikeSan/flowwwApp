import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {GithubUsersRoutingModule} from "./github-users-routing.module";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GithubUsersRoutingModule,
    NgOptimizedImage
  ]
})
export class GithubUsersModule { }
