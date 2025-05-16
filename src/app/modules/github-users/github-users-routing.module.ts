import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: HomeComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubUsersRoutingModule {}
