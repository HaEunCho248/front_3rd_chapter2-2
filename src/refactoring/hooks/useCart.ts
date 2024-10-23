// useCart.ts
import { calculateCartTotal } from './utils/cartUtils';
import { useCartState } from './cart/useCartState';
import { useCartOperations } from './cart/useCartOperations';
import { useCouponManagement } from './cart/useCouponManagement';



export const useCart = () => {
  const {
    cart,
    setCart,
    selectedCoupon,
    setSelectedCoupon
  } = useCartState();
  

  const cartOperations = useCartOperations(cart, setCart);
  const couponManagement = useCouponManagement(setSelectedCoupon);
  const cartCalculations = calculateCartTotal(cart, selectedCoupon);

 

  return {
   
    cart,
    selectedCoupon,
    ...cartOperations,
    ...couponManagement,
    ...cartCalculations
 
  };
};
