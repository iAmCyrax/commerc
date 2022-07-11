import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Product } from "src/app/interfaces";
import { ProductsService } from "src/app/services";
import { AddProductDialogComponent } from "..";

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.scss']
})
export class DashboardProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(public productsService: ProductsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productsService.getProducts().then(products => {
      this.products = products;
    });
  }

  addProduct() {
    this.dialog.open(AddProductDialogComponent);
  }

}
