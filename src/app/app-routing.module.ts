import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./modules/github-users/home/home.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import('./modules/github-users/github-users.module').then(
        (mod) => mod.GithubUsersModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
