import { useState, useEffect } from "react";

export default function CountUp({ end, duration = 1500, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let startTime = null;
    let anim;
    const step = (now) => {
      if (!startTime) startTime = now;
      const pct = Math.min((now - startTime) / duration, 1);
      setVal(Math.floor(pct * end));
      if (pct < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, [end, duration]);
  return <>{val}{suffix}</>;
}
