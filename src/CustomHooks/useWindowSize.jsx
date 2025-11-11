import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== undefined ? window.innerWidth : 0
  );

  useEffect(() => {
    if(typeof window === undefined) return;   // SSR Guard

    const onResize = () => {
        setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', onResize);

    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return windowSize;
};
