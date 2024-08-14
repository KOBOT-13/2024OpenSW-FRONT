import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 최신 콜백을 기억합니다.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌을 설정합니다.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
