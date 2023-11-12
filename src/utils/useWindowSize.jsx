import { useLayoutEffect, useState } from 'react';

function getWindowSize() {
  const {
    innerWidth: width
  } = window;
  return {width};
}

function useWindowSize() {
  const [width, setWidth] = useState(getWindowSize());
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

export default useWindowSize;