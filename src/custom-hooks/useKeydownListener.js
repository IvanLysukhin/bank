import {useEffect} from 'react';

export const useKeydownListener = (cb) => {
  useEffect(() => {
    window.addEventListener('keydown', cb);
    return () => {
      window.removeEventListener('keydown', cb);
    };
  });
};
