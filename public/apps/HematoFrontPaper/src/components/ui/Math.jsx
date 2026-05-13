import { useEffect, useRef } from 'react';
import katex from 'katex';

export default function Math({ tex, display = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: 'ignore',
      });
    }
  }, [tex, display]);
  return (
    <span
      ref={ref}
      className={className}
      role="math"
      aria-label={tex}
    />
  );
}
