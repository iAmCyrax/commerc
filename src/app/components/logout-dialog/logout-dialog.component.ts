import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LogoutDialogComponent>, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut();
    this.close();
    this.toHome();
  }

  close() {
    this.dialogRef.close();
    // this.toHome();
  }

  toHome() {
    this.router.navigate(['home']);
  }

}
