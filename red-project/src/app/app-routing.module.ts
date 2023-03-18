import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuad } from "./auth-guard.service";

import { HomeComponent } from "./home/home.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./error/page-not-found/page-not-found.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { ErrorComponent } from "./error/error.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent, },
  ]},
  { 
    path: 'servers',
    // canActivate: [AuthGuad],
    canActivateChild: [AuthGuad],
    component: ServersComponent,
    children: [
    { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard], },
  ]},
  // { path: 'error/404', component: PageNotFoundComponent, },
  { path: 'error/404', component: ErrorComponent, data: { message: 'Page not found!'} },
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