import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, LikedItem } from "src/app/interfaces";
import { UsersService } from ".";

@Injectable({
  providedIn: 'root'
})
export class LikedService {
  likedItems: LikedItem[] = [];

  constructor(private db: AngularFirestore, private usersService: UsersService) { }

  async getAllLikedItems(id: string): Promise<LikedItem[] | undefined> {
    const users: User[] = await this.usersService.getAllUsers();
    const user = users.find((u: User) => u.userId === id);

    return user?.liked;
  }

  addProductToLiked(user: User, product: LikedItem) {
    this.db.collection<User>('User').doc(user.userId).update({ liked: [...user.liked, product] });
  }

  deleteItem(user: User, uuid: string) {
    this.getAllLikedItems(user.userId).then(items => {
      const item = items?.find(i => i.uuid === uuid);
      const index = items?.indexOf(item!);

      user.liked.splice(index!, 1);

      this.db.doc<User>(`User/${user.userId}`).update({ liked: user.liked });
    });
  }
}
