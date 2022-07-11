import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService, UsersService } from "src/app/services";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = 0;
  products = [];
  constructor(private authService: AuthService, private usersService: UsersService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const userSubscription = this.authService.userData;

    this.usersService.getAllUsers().then(users => {
      userSubscription.subscribe(sUser => {
        const user = users.find((u: any) => u.email === sUser.email);
        // console.log(user);
        this.products = user.cart;

        this.products.forEach((p: any) => {
          this.total += p.product.price;
        });
      });
    });
  }

  complete() {
    this.snackBar.open(`Total ${this.total}`, "OK");
  }

}
