import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikedItem } from 'src/app/interfaces';
import { AuthService, LikedService, UsersService } from "src/app/services";

@Component({
  selector: 'app-liked-card',
  templateUrl: './liked-card.component.html',
  styleUrls: ['./liked-card.component.scss']
})
export class LikedCardComponent implements OnInit {
  @Input() product: LikedItem;
  visibility = true;

  constructor(private usersService: UsersService, private snackBar: MatSnackBar, private authService: AuthService, private likedService: LikedService) { }

  ngOnInit(): void {
  }

  remove() {
    this.visibility = false;

    this.usersService.getAllUsers().then(users => {
      this.authService.userData.subscribe(sUser => {
        const user = users.find((u: any) => u.email === sUser.email);
        this.likedService.deleteItem(user, this.product.uuid!);
        this.snackBar.open(`${this.product.product.name} successfully disliked?`);
      });
    });

    this.snackBar.open(`${this.product.product.name} successfully removed from your liked items.`, "OK");
  }

}
