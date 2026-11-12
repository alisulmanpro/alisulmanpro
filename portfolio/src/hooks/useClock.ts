import { useEffect, useState } from 'react';

/** Current HH:MM in the given time zone, refreshed every 30 seconds. */
export function useClock(timeZone: string) {
  const read = () => {
    try {
      return new Date().toLocaleTimeString('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}
