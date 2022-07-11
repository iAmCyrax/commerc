import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductsService } from "src/app/services";
import { generateUuid } from "src/app/utils/uuid";

interface AddProductData {
  name: FormControl<string | null>;
  imageSrc: FormControl<string | null>;
  price: FormControl<number | null>;
}

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  formGroup: FormGroup<AddProductData> = new FormGroup<AddProductData>({
    name: new FormControl<string>('', [Validators.required]),
    imageSrc: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required]),
  });

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  ngOnInit(): void {
  }

  addProduct() {
    const { name, imageSrc, price } = this.formGroup.value;
    if (!name || !imageSrc || !price) {
      this.snackBar.open("Please type the blank areas", "OK");
      return;
    }

    this.productsService.addProduct({ name, imageSrc, price, id: generateUuid() });
    this.snackBar.open(`Product ${name} successfully added.`);
    this.dialogRef.close();
  }

}
