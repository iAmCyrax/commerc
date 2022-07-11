import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Product } from "src/app/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFirestore) { }

  getProducts() {
    return new Promise<any>(resolve => {
      this.db.collection("Products").valueChanges().subscribe(users => resolve(users));
    });
  }

  addProduct(product: Product) {
    return this.db.collection<Product>("Products").doc(product.id).set(product);
  }

  deleteProduct(product: Product) {
    return this.db.collection<Product>("Products").doc(product.id).delete();
  }
}
