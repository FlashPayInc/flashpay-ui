import React from "react";

const NavIcons = ({ type }) => {
  return type === "home" ? (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 7.52V2.98C21 1.57 20.36 1 18.77 1H14.73C13.14 1 12.5 1.57 12.5 2.98V7.51C12.5 8.93 13.14 9.49 14.73 9.49H18.77C20.36 9.5 21 8.93 21 7.52Z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 18.77V14.73C21 13.14 20.36 12.5 18.77 12.5H14.73C13.14 12.5 12.5 13.14 12.5 14.73V18.77C12.5 20.36 13.14 21 14.73 21H18.77C20.36 21 21 20.36 21 18.77Z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 7.52V2.98C9.5 1.57 8.86 1 7.27 1H3.23C1.64 1 1 1.57 1 2.98V7.51C1 8.93 1.64 9.49 3.23 9.49H7.27C8.86 9.5 9.5 8.93 9.5 7.52Z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 18.77V14.73C9.5 13.14 8.86 12.5 7.27 12.5H3.23C1.64 12.5 1 13.14 1 14.73V18.77C1 20.36 1.64 21 3.23 21H7.27C8.86 21 9.5 20.36 9.5 18.77Z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : type === "setup" ? (
    <svg
      height="22"
      width="22"
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.97 21C16.4928 21 20.97 16.5228 20.97 11C20.97 5.47715 16.4928 1 10.97 1C5.44712 1 0.969971 5.47715 0.969971 11C0.969971 16.5228 5.44712 21 10.97 21Z"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M11 15.5C13.4853 15.5 15.5 13.4853 15.5 11C15.5 8.51472 13.4853 6.5 11 6.5C8.51472 6.5 6.5 8.51472 6.5 11C6.5 13.4853 8.51472 15.5 11 15.5Z"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.90002 3.93L7.44002 7.46"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.90002 18.07L7.44002 14.54"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M18.05 18.07L14.51 14.54"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M18.05 3.93L14.51 7.46"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "transactions" ? (
    <svg
      height="20"
      width="22"
      fill="none"
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 6.50497H21" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M5 14.505H7" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M9.5 14.505H13.5" strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M5.44 1.50497H16.55C20.11 1.50497 21 2.38497 21 5.89497V14.105C21 17.615 20.11 18.495 16.56 18.495H5.44C1.89 18.505 1 17.625 1 14.115V5.89497C1 2.38497 1.89 1.50497 5.44 1.50497Z"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "paymentlinks" ? (
    <svg
      height="14"
      width="22"
      fill="none"
      viewBox="0 0 22 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.99 12.5H15.5C18.52 12.5 21 10.03 21 7.00002C21 3.98002 18.53 1.50002 15.5 1.50002H13.99"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M8 1.50002H6.5C3.47 1.50002 1 3.97002 1 7.00002C1 10.02 3.47 12.5 6.5 12.5H8"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M7 7.00002H15" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ) : type === "settings" ? (
    <svg
      height="22"
      width="22"
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34318 12.6569 8.00003 11 8.00003C9.34315 8.00003 8 9.34318 8 11C8 12.6569 9.34315 14 11 14Z"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M1 11.88V10.12C1 9.08003 1.85 8.22003 2.9 8.22003C4.71 8.22003 5.45 6.94003 4.54 5.37003C4.02 4.47003 4.33 3.30003 5.24 2.78003L6.97 1.79003C7.76 1.32003 8.78 1.60003 9.25 2.39003L9.36 2.58003C10.26 4.15003 11.74 4.15003 12.65 2.58003L12.76 2.39003C13.23 1.60003 14.25 1.32003 15.04 1.79003L16.77 2.78003C17.68 3.30003 17.99 4.47003 17.47 5.37003C16.56 6.94003 17.3 8.22003 19.11 8.22003C20.15 8.22003 21.01 9.07003 21.01 10.12V11.88C21.01 12.92 20.16 13.78 19.11 13.78C17.3 13.78 16.56 15.06 17.47 16.63C17.99 17.54 17.68 18.7 16.77 19.22L15.04 20.21C14.25 20.68 13.23 20.4 12.76 19.61L12.65 19.42C11.75 17.85 10.27 17.85 9.36 19.42L9.25 19.61C8.78 20.4 7.76 20.68 6.97 20.21L5.24 19.22C4.33 18.7 4.02 17.53 4.54 16.63C5.45 15.06 4.71 13.78 2.9 13.78C1.85 13.78 1 12.92 1 11.88Z"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "theme" ? (
    <svg
      height="24"
      width="46"
      fill="none"
      viewBox="0 0 46 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="24" width="46" fill="#BDBDBD" rx="12" x="0" y="0" />
      <g>
        <circle cx="12" cy="12" fill="white" r="8" />
      </g>
      <defs />
    </svg>
  ) : null;
};

export default NavIcons;
