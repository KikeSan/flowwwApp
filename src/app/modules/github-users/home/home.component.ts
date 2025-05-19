import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {GhUsersService} from "../services/gh-users.service";
import {GhUserModel} from "../models/ghUser.model";
import { gsap } from 'gsap';
import {forkJoin} from "rxjs";


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
  followersCountMap: { [login: string]: number } = {};


  initAnimation= false;

  usuarioSeleccionado: any = null;
  modalAbierto = false;
  repos: any[] = [];
  following: any[] = [];
  allDetail:any = {};

  loadingDetailInfo = true;

  constructor(
    private fb: FormBuilder,
    private ghService: GhUsersService
  ) {
  }

  ngOnInit(): void {
    this.aFormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), this.noFlowwwValidator()]],
    });
  }

  searchUser(evt:any){
    if (this.aFormGroup.invalid) {
      return;
    }
    // @ts-ignore
    this.ghService.getGithubUsers(this.aFormGroup.get('username')?.value
    ).subscribe(resp=>{
      console.log(resp);
      //this.dataUsers = resp;
      // @ts-ignore
      this.dataUsers = resp['items'];
      this.totalPages = Math.ceil(this.dataUsers.length / this.pageSize);
      this.updatePage();
      this.loadFollowersForCurrentPage();

      if(!this.initAnimation){
        gsap.fromTo(".search", { y: 0, duration: 0.2,ease: "circ.out"},{y:-100});
        gsap.fromTo(".result", { opacity: 0, duration: 0.5,ease: "circ.out", delay: 0.1},{opacity:1, y:-50});
        this.initAnimation = true;
      }

    })
  }

  noFlowwwValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase().trim();
      return value === 'flowww' ? { noFlowww: true } : null;
    };
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
      this.loadFollowersForCurrentPage();
    }
  }

  loadFollowersForCurrentPage(): void {
    this.currentPageUsers.forEach(user => {
      const login = user.login;
      if (this.followersCountMap[login] === undefined) {
        this.ghService.getFollowers(user.followers_url).subscribe(followers => {
          this.followersCountMap[login] = followers.length;
        });
      }
    });
  }

  getFollowersLabel(login: string): string {
    const count = this.followersCountMap[login];
    if (count === undefined) return 'Cargando...';
    return count < 100 ? `${count}` : '+100';
  }

  openUserInfo(user: GhUserModel): void {
    this.usuarioSeleccionado = user;
    this.modalAbierto = true;
    console.log('User selected--->', this.usuarioSeleccionado)
    console.log('Followers--->', this.followersCountMap[this.usuarioSeleccionado.login])

    this.allDetail = {};
    this.loadingDetailInfo = true;

    this.ghService.getAllDataGH(user.login).subscribe(resp => {
      this.allDetail = resp;
      this.loadingDetailInfo = false;
      console.log('DATA-->', this.allDetail)
    })
  }

  closeModal(): void {
    this.modalAbierto = false;
    this.usuarioSeleccionado = null;
  }
}
