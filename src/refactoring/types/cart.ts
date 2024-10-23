import { CartItem, Coupon, Product } from '../../types';


export type CarState = {
    items : CartItem[];
    coupon: Coupon | null;
  }
  
  export interface CartOperations {
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
  }

  export type CartItemUpdate = {
    product: Product;
    quantity: number;
  }

  export type CartValidationResult = {
    idValid: boolean;
    message?: string;
  }

  
  