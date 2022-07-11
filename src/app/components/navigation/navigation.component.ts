import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthService, UsersService } from "src/app/services/";
import { LogoutDialogComponent } from "..";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(public authService: AuthService, private dialog: MatDialog, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().then(users => {
      this.authService.userData.subscribe(user => {
        const currentUser = users.find((u: any) => u.email === user.email);

        this.isAdmin = currentUser.isAdmin;
      });
    });
  }

  logout() {
    this.dialog.open(LogoutDialogComponent);
  }
}
