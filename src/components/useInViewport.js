import { useState, useEffect, useRef } from "react";

export default function useInViewport(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
