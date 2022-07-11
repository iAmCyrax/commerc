import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces';
import { AuthService, UsersService } from 'src/app/services';

interface DialogData {
  product: Product;
}

interface LoginOptions {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  hide: boolean = true;
  formGroup: FormGroup<LoginOptions> = new FormGroup<LoginOptions>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) { }

  ngOnInit(): void { }

  buy() {
    this.usersService.getAllUsers().then((users) => {
      this.authService.userData.subscribe((sUser) => {
        const { email, password } = this.formGroup.value;
        if (!email || !password) {
          this.snackBar.open('Please type the blank areas', 'OK');
          return;
        }
        // if (!sUser) {
        const condition = users.some(
          (u: any) => u.email === email && u.password === password
        );
        if (condition) this.success();
        else this.error();
        // } else {
        //   const user = users.find((u: any) => u.email === sUser.email);
        //   if (email === user.email && password === user.password) this.success();
        //   else this.error();
        // }
      });
    });
  }

  success() {
    this.snackBar.open(`You buyed this item. Item price: ${this.data.product.price}`, "OK");
    this.dialogRef.close();
    this.formGroup.setValue({ email: '', password: '' });
  }

  error() {
    this.snackBar.open(
      'Something went wrong. Check your email and password or sign up'
    );
    this.formGroup.setValue({ email: '', password: '' });
  }

}
