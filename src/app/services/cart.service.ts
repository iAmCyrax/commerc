import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartItem, User } from 'src/app/interfaces';
import { UsersService } from ".";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  list: CartItem[] = [];

  constructor(private db: AngularFirestore, private usersService: UsersService) { }

  addProductToCart(user: User, product: CartItem): void {
    this.db.collection<User>('User').doc(user.userId).update({ cart: [...user.cart, product] });
  }

  deleteProduct(user: User, uuid: string): void {
    const item = this.list.find(i => i.uuid === uuid);
    const index = this.list.indexOf(item!);

    user.cart.splice(index, 1);

    this.db.doc<User>(`User/${user.userId}`).update({ cart: user.cart });
  }
  async _getAllCartItems(id: string): Promise<CartItem[] | undefined> {
    const users: User[] = await this.usersService.getAllUsers();
    // console.log(users);
    const user = users.find((u: User) => u.userId === id);

    return user?.cart;
  }
}
//!aferin