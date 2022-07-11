import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>(subscriber => {
      this.authService.userData.subscribe(user => {
        let canActive: boolean;
        if (!user) canActive = true;
        else {
          this.router.navigate(['home']);
          canActive = false;
        }

        subscriber.next(canActive);
      });
    });
  }

}
