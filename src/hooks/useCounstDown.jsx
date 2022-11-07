import { useState, useEffect } from 'react';

function useCountDown(targetDate) {
  const [countDown, setCountDown] = useState(() => {
    return Math.max(targetDate - new Date(), 0);
  });
  const isClosed = countDown <= 0;
  const isComingSoon = isNaN(countDown);

  useEffect(() => {
    const id = setInterval(() => {
      setCountDown(c => c - 1000, 0);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return { ...getValues(countDown), isClosed, isComingSoon };
}

function getValues(ms) {
  const sec = 1000;
  const min = 60 * sec;
  const hr = 60 * min;
  const d = 24 * hr;
  const days = Math.floor(ms / d);
  const hours = Math.floor((ms % d) / hr);
  const minutes = Math.floor((ms % hr) / min);
  const seconds = Math.floor((ms % min) / sec);

  return { days, hours, minutes, seconds };
}

export default useCountDown;
