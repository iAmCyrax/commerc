import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "src/app/interfaces";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFirestore) { }

  getAllUsers() {
    return new Promise<any>(resolve => {
      this.db.collection('User').valueChanges().subscribe(users => resolve(users));
    });
  }

  addUser(user: User) {
    this.db.collection<User>('User').doc(user.userId).set(user);
  }
}
