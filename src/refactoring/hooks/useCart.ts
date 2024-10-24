// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from './utils/cartUtils';


export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);


//특정 상품의 남은 재고 수량을 계산하는 함수
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find(item => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  //장바구니에 상품을 추가하는 함수
  //이미 존재하는 상품이면 수량을 증가시키고, 없으면 새로 추가
  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    setCart(prevCart => {
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

  //장바구니에서 특정 상품을 제거하는 함수
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));

  };

  //장바구니에 있는 특정 상품의 수량을 업데이트하는 함수
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart => {
      // 먼저 해당 상품이 장바구니에 있는지 확인
      const existingItem = prevCart.find(item => item.product.id === productId);
      if (!existingItem) return prevCart; // 상품이 없으면 현재 상태 유지

      if (newQuantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }

      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
          : item
      );
    });
  };

  //쿠폰을 적용하는 함수
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);

  };

  //총 주문 금액을 계산하는 함수
  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);

  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
