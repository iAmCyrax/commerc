import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces';

type Products = Product[];

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Products>(`${this.url}/products.json`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.url}/products.json`, product);
  }

  // TODO: Delete product
  deleteProduct(product: Product) {
    return this.http.delete(`${this.url}/products.json`, { body: product });
  }
}
