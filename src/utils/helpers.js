import { useEffect } from "react";

// Functions
const constrictAddr = (address, start = 5, end = 7) =>
  address.substring(0, start) +
  "..." +
  address.substring(address.length - end, address.length);

function useOutsideAlerter(ref, ref2, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ref2.current &&
        !ref2.current.contains(event.target)
      ) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export { constrictAddr, useOutsideAlerter };
