import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "src/app/interfaces";
import { ProductsService } from "src/app/services";

@Component({
  selector: 'app-dashboard-product-card',
  templateUrl: './dashboard-product-card.component.html',
  styleUrls: ['./dashboard-product-card.component.scss']
})
export class DashboardProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.snackBar.open(`${this.product.name} successfully deleted.`);
    this.productsService.deleteProduct(this.product);
  }

}
// aferin