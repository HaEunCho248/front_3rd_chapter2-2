import { Coupon } from '../../../types';

/**
 * 쿠폰 관리 훅
 * @param selectedCoupon 쿠폰 선택 시 호출할 함수
 * @returns 쿠폰 관리 함수
 * @example
 * const { applyCoupon } = useCouponManagement(selectedCoupon);
 * applyCoupon(coupon);
 * ? : removeCoupon함수가 필요한지 확인
 */

export const useCouponManagement = ( setSelectedCoupon:(coupon: Coupon|null) => void)=>
    {
        const applyCoupon = (coupon: Coupon) => {
            setSelectedCoupon(coupon);
        };

        
        const removeCoupon = () => {
            setSelectedCoupon(null);
        }

          return {applyCoupon, removeCoupon};
    }