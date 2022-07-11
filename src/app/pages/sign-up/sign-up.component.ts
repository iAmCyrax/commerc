import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services";

interface SignUpOptions {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide: boolean = true;
  formGroup: FormGroup<SignUpOptions> = new FormGroup<SignUpOptions>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    const { email, password } = this.formGroup.value;

    if (!email || !password) {
      this.snackBar.open("Please type the blank areas", "OK");
      this.clearInputs();
      return;
    }

    this.authService.signUp(email, password);
    this.snackBar.open("Wohooo! You successfully created a account!");
    this.clearInputs();
    this.router.navigate(['home']);
  }

  clearInputs() {
    this.formGroup.setValue({ email: "", password: "" });
  }

}
