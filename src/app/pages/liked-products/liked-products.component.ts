import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from "src/app/services";

@Component({
  selector: 'app-liked-products',
  templateUrl: './liked-products.component.html',
  styleUrls: ['./liked-products.component.scss']
})
export class LikedProductsComponent implements OnInit {
  products = [];

  constructor(private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().then(users => {
      this.authService.userData.subscribe(sUser => {
        const user = users.find((u: any) => u.email = sUser.email);
        this.products = user.liked;
      });
    });
  }

}
