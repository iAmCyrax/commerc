import { Component, Input, OnInit, Type } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/interfaces';
import { AuthService, CartService, UsersService } from "src/app/services/";

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Input() item: CartItem;
  visibility = true;

  constructor(private cartService: CartService, private snackBar: MatSnackBar, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  remove() {
    this.visibility = false;
    this.usersService.getAllUsers().then(users => {
      this.authService.userData.subscribe(sUser => {
        const user = users.find((u: any) => u.email === sUser.email);
        this.cartService.deleteProduct(user, this.item.uuid!);
        this.snackBar.open(`${this.item.product.name} successfully removed from your cart.`, "OK");
      });
    });
  }

}
