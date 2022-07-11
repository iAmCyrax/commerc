import { CartItem, LikedItem } from ".";

export interface User {
    email: string;
    password: string;
    cart: CartItem[];
    liked: LikedItem[];
    userId: string;
    isAdmin?: boolean;
}
