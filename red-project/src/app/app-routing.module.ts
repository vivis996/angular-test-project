import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuad } from "./auth-guard.service";

import { HomeComponent } from "./home/home.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./servers/error/page-not-found/page-not-found.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent, },
  ]},
  { path: 'servers', canActivate: [AuthGuad], component: ServersComponent, children: [
    { path: ':id', component: ServerComponent, },
    { path: ':id/edit', component: EditServerComponent, },
  ]},
  { path: 'error/404', component: PageNotFoundComponent, },
  { path: '**', redirectTo: '/error/404', pathMatch: 'full', },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}