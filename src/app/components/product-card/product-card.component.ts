import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces/product';
import {
  CartService,
  HttpService,
  LikedService,
  UsersService,
  AuthService,
} from 'src/app/services';
import { generateUuid } from 'src/app/utils/uuid';
import { LoginDialogComponent } from "..";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  userData = this.authService.userData;
  
  constructor(
    private cartService: CartService,
    private likedService: LikedService,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private usersService: UsersService,
    private authService: AuthService,
    private dialog: MatDialog
    ) { }
    
    ngOnInit(): void { }

  addProductToCart() {
    const userSubscription = this.authService.userData;

    this.usersService.getAllUsers().then((users) => {
      userSubscription.subscribe((sUser) => {
        const user = users.find((u: any) => u.email === sUser.email);
        // console.log(user);
        this.cartService.addProductToCart(user, {
          product: this.product,
          uuid: generateUuid(),
        });
        this.snackBar.open(
          `${this.product.name} successfully added to your cart.`,
          'OK'
        );
      });
    });
  }

  addLikedProduct() {
    const userSubscription = this.authService.userData;

    this.usersService.getAllUsers().then((users) => {
      userSubscription.subscribe((sUser) => {
        const user = users.find((u: any) => u.email === sUser.email);
        // console.log(user);
        this.likedService.getAllLikedItems(user.id).then((products) => {
          if (products?.some((p) => p.product.name === this.product.name)) {
            this.snackBar.open('You already liked this product.');
            return;
          }
          this.likedService.addProductToLiked(user, {
            product: this.product,
            uuid: generateUuid(),
          });
          this.snackBar.open(
            `${this.product.name} successfully added to liked products.`,
            'OK'
          );
        });
      });
    });
  }

  buyNow() {
    this.dialog.open(LoginDialogComponent, { data: { product: this.product } });
  }
}
