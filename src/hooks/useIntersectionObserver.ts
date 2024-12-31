import { useEffect, useState, useRef } from "react";

interface IntersectionObserverArgs {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

function useIntersectionObserver({
  threshold = 0.5,
  root = null,
  rootMargin = "0px",
  triggerOnce = true,
}: IntersectionObserverArgs) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || (triggerOnce && isVisible)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, isVisible, root, rootMargin, threshold, triggerOnce]);

  return [ref, isVisible] as const;
}

export default useIntersectionObserver;
