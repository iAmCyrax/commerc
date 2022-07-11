import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "src/app/services";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Observable<boolean>((subscriber) => {
      this.authService.userData.subscribe(user => {
        let canActive: boolean;
        if (user) canActive = true;
        else {
          this.router.navigate(['login']);
          this.snackBar.open("You must login (or sign up) to access liked products and cart.", "OK");
          canActive = false;
        }

        subscriber.next(canActive);
      });
    });
  }

}
