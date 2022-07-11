import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { generateUuid } from "../utils/uuid";
import { UsersService } from ".";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Observable<firebase.default.User | any>;

  constructor(private angularFireAuth: AngularFireAuth, private usersService: UsersService, private snackBar: MatSnackBar) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.usersService.addUser({
      email,
      password,
      cart: [],
      liked: [],
      userId: generateUuid(),
      isAdmin: false
    });
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You are Successfully logged in!');
      })
      .catch((err: any) => {
        console.log('Something is wrong:', err.message);
        this.snackBar.open("Something went wrong. Check your email and password or create a new account", "OK");
        return;
      });
  }
  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

  /* Sign out */
  signOut() {
    this.angularFireAuth.signOut();
  }

}
