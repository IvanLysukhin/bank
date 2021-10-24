import {useEffect} from 'react';
import {useKeydownListener} from './useKeydownListener';

export const useModal = (cb,refs = []) => {
  useKeydownListener(cb);
  useEffect(() => {
    const allInteractiveElements = document.querySelectorAll('a, button, input, .services__tab, .rc-slider-handle, .credit-calc__checkbox-label');
    allInteractiveElements.forEach((element)=> {
      element.tabIndex = -1;
    });
    refs.forEach(({current}, index) => {
      current.tabIndex = index + 1;
    });
    document.documentElement.style.overflow = 'hidden';
    return () => {
      allInteractiveElements.forEach((element)=> {
        element.tabIndex = 0;
      });
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
};
