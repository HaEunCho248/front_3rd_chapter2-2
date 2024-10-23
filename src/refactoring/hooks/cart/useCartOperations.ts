import { CartItem, Product } from '../../../types';
import { CartOperations } from '../../types/cart';
import { updateCartItemQuantity } from '../utils/cartUtils';

/**
 * 장바구니에 상품을 추가하는 함수
 * @param cart
 * @param product
 * @returns
 * @example
 * const newCart = addToCart(cart, product);
 * setCart(newCart); 
 */

export const useCartOperations = (
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
):CartOperations => {  

    
    //상품의 남은 재고를 계산
    const getRemainingStock = (product: Product):number => {
        const cartItem = cart.find(item => item.product.id === product.id);
        return product.stock - (cartItem?.quantity || 0);
      };

      //상품을 장바구니에 추가
      const addToCart = (product: Product) => {
        const remainingStock = getRemainingStock(product);
        if (remainingStock <= 0) return;
    
        setCart((prevCart : CartItem[]) => {
          const existingItem = prevCart.find(item => item.product.id === product.id);
          if (existingItem) {
            return prevCart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
                : item
            );
          }
          return [...prevCart, { product, quantity: 1 }];
        });
      };

//장바구니에서 상품을 제거
  const removeFromCart = (productId: string) => {
    setCart((prevCart:CartItem[] ) => prevCart.filter(item => item.product.id !== productId));

  };

    //장바구니에 있는 상품의 수량을 변경
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  



return { addToCart, removeFromCart, updateQuantity };
}