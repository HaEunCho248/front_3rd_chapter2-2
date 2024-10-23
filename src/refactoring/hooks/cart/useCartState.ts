import { useState } from 'react';
import { CartItem, Coupon } from '../../../types';

/**
 * 장바구니 상태를 관리하는 hook
 * @returns 장바구니 상태와 관련된 값과 함수
 * @example
 * const { cart, setCart, selectedCoupon, setSelectedCoupon } = useCartState();
 * setCart([...cart, { product, quantity: 1 }]);
 * setSelectedCoupon(coupon);
 */

export const useCartState = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    return {
        cart,
        setCart,
        selectedCoupon,
        setSelectedCoupon
    }
}