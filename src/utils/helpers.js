import dayjs from "dayjs";
import { useEffect } from "react";

// Functions
const isValidUrl = urlString => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const constrictAddr = (address, start = 6, end = 6) => {
  if (address) {
    return (
      address.substring(0, start) +
      "..." +
      address.substring(address.length - end, address.length)
    );
  }
};

const timeAgo = date => {
  if (!date) return;
  const presentTime = dayjs();
  const timer = dayjs(dayjs(date));
  const tdHrs = presentTime.diff(timer, "h");
  const tdMins = presentTime.diff(timer, "m");
  const tdSecs = presentTime.diff(timer, "s");
  const timerFormatted = timer.format("MMM DD, YYYY");
  const presentTimeFormatted = presentTime.format("MMM DD, YYYY");

  const processedTime =
    tdSecs < 60
      ? "Just now"
      : tdMins < 60
      ? tdMins + " mins ago"
      : tdHrs < 24
      ? tdHrs + " hours ago"
      : presentTimeFormatted.slice(-4) === timerFormatted.slice(-4)
      ? timerFormatted.slice(0)
      : timerFormatted;

  return processedTime;
};

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

export { timeAgo, isValidUrl, constrictAddr, useOutsideAlerter };
