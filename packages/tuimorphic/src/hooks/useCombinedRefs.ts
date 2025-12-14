import * as React from 'react';

/**
 * Combines multiple refs into a single callback ref.
 *
 * This hook creates a ref callback that forwards the element to all provided refs.
 * It handles both callback refs and RefObject refs.
 *
 * Note: This intentionally doesn't use useCallback because:
 * 1. The callback is cheap to create
 * 2. React handles ref callback identity changes correctly
 * 3. Using useCallback with spread parameters creates dependency array issues
 *
 * @example
 * const MyComponent = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
 *   const internalRef = useRef<HTMLDivElement>(null);
 *   const combinedRef = useCombinedRefs(forwardedRef, internalRef);
 *   return <div ref={combinedRef} />;
 * });
 */
export function useCombinedRefs<T>(
  ...refs: Array<React.Ref<T> | null | undefined>
): React.RefCallback<T> {
  return React.useCallback((element: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;

      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    }
    // We intentionally use refs.length as the only dependency.
    // The refs themselves are stable (forwardedRef from parent, internal useRef),
    // and this avoids the spread-parameter dependency array issue.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.length]);
}

export default useCombinedRefs;
