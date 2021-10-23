import {useEffect} from 'react';

export const useFocusDisable = (states) => {
  useEffect(() => {
    const allInteractiveElements = document.querySelectorAll('a, button, input');
    allInteractiveElements.forEach((element)=> {
      if (element.tabIndex === 0) {
        element.tabIndex = -1;
      }
    });
    return () => {
      allInteractiveElements.forEach((element)=> {
        if (element.tabIndex === -1) {
          element.tabIndex = 0;
        }
      });
    };
  }, [...states]);
};


