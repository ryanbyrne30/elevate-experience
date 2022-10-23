import { MutableRefObject, useEffect } from "react";

export default function useOutsideAlerter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any>,
  callback: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
