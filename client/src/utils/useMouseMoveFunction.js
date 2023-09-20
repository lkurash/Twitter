import { useEffect, useLayoutEffect, useRef } from "react";

function useLatest(value) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

export default function useMouseMove(elementRef, handler, attached = true) {
  const latestHandler = useLatest(handler);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;

      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener("mousemove", handleClick);

    return () => {
      document.removeEventListener("mouseout", handleClick);
    };
  }, [elementRef, latestHandler, attached]);
}
