import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

interface LoginOptions {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  formGroup: FormGroup<LoginOptions> = new FormGroup<LoginOptions>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.formGroup.value;
    if (!email || !password) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.authService.signIn(email, password);
    this.clearInputs();
    this.snackBar.open("Welcome!");
    this.router.navigate(['home']);
  }

  clearInputs() {
    this.formGroup.setValue({ email: "", password: "" });
  }
}
