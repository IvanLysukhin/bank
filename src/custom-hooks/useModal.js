import {useEffect} from 'react';
import {useKeydownListener} from './useKeydownListener';

export const useModal = (cb) => {
  useKeydownListener(cb);
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
};
