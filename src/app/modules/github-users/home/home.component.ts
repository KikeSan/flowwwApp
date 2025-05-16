import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {GhUsersService} from "../services/gh-users.service";
import {GhUserModel} from "../models/ghUser.model";
import { gsap } from 'gsap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  aFormGroup!: FormGroup;

  dataUsers: GhUserModel[] = [];
  currentPageUsers: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;

  initAnimation= false;

  usuarioSeleccionado: any = null;
  modalAbierto = false;

  constructor(
    private fb: FormBuilder,
    private ghService: GhUsersService
  ) {
  }

  ngOnInit(): void {
    this.aFormGroup = this.fb.group({
      username: ['', Validators.required],
    });
  }

  searchUser(evt:any){
    // @ts-ignore
    this.ghService.getGithubUsers(this.aFormGroup.get('username').value
    ).subscribe(resp=>{
      console.log(resp);
      //this.dataUsers = resp;
      // @ts-ignore
      this.dataUsers = resp['items'];
      this.totalPages = Math.ceil(this.dataUsers.length / this.pageSize);
      this.updatePage();

      if(!this.initAnimation){
        gsap.fromTo(".search", { y: 0, duration: 0.2,ease: "circ.out"},{y:-100});
        gsap.fromTo(".result", { opacity: 0, duration: 0.5,ease: "circ.out", delay: 0.1},{opacity:1, y:-50});
        this.initAnimation = true;
      }

    })
  }
  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageUsers = this.dataUsers.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  openUserInfo(user: GhUserModel): void {
    this.usuarioSeleccionado = user;
    this.modalAbierto = true;
  }

  closeModal(): void {
    this.modalAbierto = false;
    this.usuarioSeleccionado = null;
  }
}
