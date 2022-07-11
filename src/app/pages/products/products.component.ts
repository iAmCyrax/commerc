import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { HttpService, ProductsService } from "src/app/services";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private httpService: HttpService, private productsService: ProductsService) { }

  ngOnInit(): void {
    // this.httpService.getProducts().subscribe(products => {
    //   this.products = products;
    // });
    this.productsService.getProducts().then(products => {
      this.products = products;
    });
  }

}
