import {useEffect} from 'react';

export const useFocus = (states) => {
  useEffect(() => {
    const allInteractiveElements = document.querySelectorAll('a, button, input, .services__tab, .rc-slider-handle, .credit-calc__checkbox-label');
    allInteractiveElements.forEach((element,index)=> {
      element.tabIndex = index;
    });
  }, [...states]);
};


