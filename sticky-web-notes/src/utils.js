import { useEffect, useRef } from "react";

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const calculateNewPosition = (position) => {
  const rest = position.substring(0, position.length - 1),
    last = position.substring(position.length - 1);
  return last === 'z' ? `${rest}${last}a` : `${rest}${String.fromCharCode(last.charCodeAt(0) + 1)}`;
}
