import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UsersService } from "src/app/services";

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>(subscriber => {
      let canActivate: boolean;
      this.authService.userData.subscribe(user => {
        this.usersService.getAllUsers().then((users) => {
          if (user) {
            const currentUser = users.find((u: any) => u.email === user.email);
            if (currentUser.isAdmin) canActivate = true;
            else {
              this.router.navigate(['login']);
              this.snackBar.open("Please login as an admin");
              canActivate = false;
            }
          } else {
            this.router.navigate(['login']);
            this.snackBar.open("Please login as an admin");
            canActivate = false;
          }
          subscriber.next(canActivate);
        });
      });
    });
  }
}
