// hooks/utils/useLocalStorage.ts

import { useState } from 'react';

/**
 * localStorage를 사용하여 상태를 관리하는 커스텀 훅
 * @param key localStorage에 저장될 키
 * @param initialValue 초기값
 * @returns [저장된 값, 값을 설정하는 함수] 튜플
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  // localStorage로부터 초기값을 가져오는 함수
  const readValue = (): T => {
    try {
      // 브라우저 환경인지 확인
      if (typeof window === 'undefined') {
        return initialValue;
      }

      // localStorage에서 값을 가져옴
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 실제 상태를 관리하는 useState
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // value를 localStorage와 state에 저장하는 함수
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // 새 값이 함수인 경우를 처리
      const newValue = value instanceof Function ? value(storedValue) : value;
      
      // 브라우저 환경인지 확인
      if (typeof window === 'undefined') {
        console.warn( 'window err' );
      }

      // localStorage에 저장
      window.localStorage.setItem(key, JSON.stringify(newValue));
      
      // state 업데이트
      setStoredValue(newValue);
    } catch (error) {
      console.warn(`Error localStorage key "${key}":`, error);
    }
  };

  

  return [storedValue, setValue];
}