import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuad implements CanActivate{
  constructor(private authService: AuthService,
              private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): 
              boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return this.authService.isAuthenticated()
                .then(
                  (authentication: boolean) => {
                    if (authentication) {
                      return true;
                    }
                    else{
                      this.route.navigate(['/']);
                    }
                  }
                );
  }
}
