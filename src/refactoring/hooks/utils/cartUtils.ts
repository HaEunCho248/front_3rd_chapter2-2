import { CartItem, Coupon } from "../../../types";

export const calculateItemTotal = (item: CartItem) => {
  const {product, quantity} = item;

  const discount = getMaxApplicableDiscount(item);

  return product.price * quantity * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const {discounts} = item.product;
  const {quantity} = item;
  let appliedDiscount = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }

  return appliedDiscount;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  let totalAfterDiscount= cart.reduce((total, item) => {
    return total + calculateItemTotal(item);
  },0);

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

      // 쿠폰 적용
      if (selectedCoupon) {
        if (selectedCoupon.discountType === 'amount') {
          totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
        } else {
          totalAfterDiscount *= (1 - selectedCoupon.discountValue / 100);
        }
        totalDiscount = totalBeforeDiscount - totalAfterDiscount;
      }
  
  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  const updatedCart = cart.map((item) => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
      return updatedQuantity > 0 ? {...item, quantity: updatedQuantity} : null;
    }
    return item;
  }).filter((item): item is CartItem => item !== null);
  return updatedCart
};
