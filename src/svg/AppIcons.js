import React from "react";

const AppIcons = ({ type }) => {
  return type === "notificationBell" ? (
    <svg
      height="23"
      width="18"
      fill="none"
      viewBox="0 0 18 23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.02009 2.91C5.71009 2.91 3.02009 5.6 3.02009 8.91V11.8C3.02009 12.41 2.76009 13.34 2.45009 13.86L1.30009 15.77C0.590088 16.95 1.08009 18.26 2.38009 18.7C6.69009 20.14 11.3401 20.14 15.6501 18.7C16.8601 18.3 17.3901 16.87 16.7301 15.77L15.5801 13.86C15.2801 13.34 15.0201 12.41 15.0201 11.8V8.91C15.0201 5.61 12.3201 2.91 9.02009 2.91Z"
        stroke="#6D6D6D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.8699 3.2C10.5599 3.11 10.2399 3.04 9.90992 3C8.94992 2.88 8.02992 2.95 7.16992 3.2C7.45992 2.46 8.17992 1.94 9.01992 1.94C9.85992 1.94 10.5799 2.46 10.8699 3.2Z"
        stroke="#6D6D6D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.02 19.06C12.02 20.71 10.67 22.06 9.02002 22.06C8.20002 22.06 7.44002 21.72 6.90002 21.18C6.36002 20.64 6.02002 19.88 6.02002 19.06"
        stroke="#6D6D6D"
        strokeWidth="1.5"
      />
      <circle cx="13.5" cy="4.5" fill="#EB5757" r="4.5" />
    </svg>
  ) : type === "generatelink" ? (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 12C13.5 15 12 17.5 8.99995 17.75M2 14C0.999985 10 4.57 6.25 7.75 6.25"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 12C10 8.69 12.69 6 16 6C19.31 6 22 8.69 22 12C22 15.31 19.31 18 16 18"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M9 17C9 17.75 8.79 18.46 8.42 19.06C8.21 19.42 7.94 19.74 7.63 20C6.93 20.63 6.01 21 5 21C3.54 21 2.27 20.22 1.58 19.06C1.21 18.46 1 17.75 1 17C1 15.74 1.58 14.61 2.5 13.88C3.19 13.33 4.06 13 5 13C7.21 13 9 14.79 9 17Z"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M6.49171 16.9795H3.51172"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M5 15.5195V18.5095"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "filter" ? (
    <svg
      height="22"
      width="20"
      fill="none"
      viewBox="0 0 20 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.3999 1.1001H16.5999C17.6999 1.1001 18.5999 2.0001 18.5999 3.1001V5.3001C18.5999 6.1001 18.0999 7.1001 17.5999 7.6001L13.2999 11.4001C12.6999 11.9001 12.2999 12.9001 12.2999 13.7001V18.0001C12.2999 18.6001 11.8999 19.4001 11.3999 19.7001L9.9999 20.6001C8.6999 21.4001 6.8999 20.5001 6.8999 18.9001V13.6001C6.8999 12.9001 6.4999 12.0001 6.0999 11.5001L2.2999 7.5001C1.7999 7.0001 1.3999 6.1001 1.3999 5.5001V3.2001C1.3999 2.0001 2.2999 1.1001 3.3999 1.1001Z"
        stroke="#006174"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.93 1.1001L4 9.0001"
        stroke="#006174"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "export" ? (
    <svg
      height="15"
      width="16"
      fill="none"
      viewBox="0 0 16 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66675 6.83337L14.1334 1.3667"
        stroke="#006174"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.6666 4.03325V0.833252H11.4666"
        stroke="#006174"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.33325 0.833252H5.99992C2.66659 0.833252 1.33325 2.16659 1.33325 5.49992V9.49992C1.33325 12.8333 2.66659 14.1666 5.99992 14.1666H9.99992C13.3333 14.1666 14.6666 12.8333 14.6666 9.49992V8.16659"
        stroke="#006174"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "copy" ? (
    <svg
      height="22"
      width="22"
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 11.9V16.1C15 19.6 13.6 21 10.1 21H5.9C2.4 21 1 19.6 1 16.1V11.9C1 8.4 2.4 7 5.9 7H10.1C13.6 7 15 8.4 15 11.9Z"
        stroke="#6D6D6D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M21 5.9V10.1C21 13.6 19.6 15 16.1 15H15V11.9C15 8.4 13.6 7 10.1 7H7V5.9C7 2.4 8.4 1 11.9 1H16.1C19.6 1 21 2.4 21 5.9Z"
        stroke="#6D6D6D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : type === "tickcircle" ? (
    <svg
      height="14"
      width="14"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00016 0.333008C3.32683 0.333008 0.333496 3.32634 0.333496 6.99967C0.333496 10.673 3.32683 13.6663 7.00016 13.6663C10.6735 13.6663 13.6668 10.673 13.6668 6.99967C13.6668 3.32634 10.6735 0.333008 7.00016 0.333008ZM10.1868 5.46634L6.40683 9.24634C6.3135 9.33967 6.18683 9.39301 6.0535 9.39301C5.92016 9.39301 5.7935 9.33967 5.70016 9.24634L3.8135 7.35967C3.62016 7.16634 3.62016 6.84634 3.8135 6.65301C4.00683 6.45967 4.32683 6.45967 4.52016 6.65301L6.0535 8.18634L9.48016 4.75967C9.6735 4.56634 9.9935 4.56634 10.1868 4.75967C10.3802 4.95301 10.3802 5.26634 10.1868 5.46634Z"
        fill="#292D32"
      />
    </svg>
  ) : type === "unchecked" ? (
    <svg
      height="14"
      width="14"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7.00016" cy="6.99967" fill="#F2F2F2" r="6.66667" />
    </svg>
  ) : null;
};

export default AppIcons;
