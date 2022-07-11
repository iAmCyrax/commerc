import { Product } from ".";

export interface CartItem {
    product: Product;
    uuid?: string;
}
