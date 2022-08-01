import React from "react";

const AppIcons3 = ({ type, dotted }) => {
  return type === "notif-transfer" ? (
    <svg
      height="40"
      width="46"
      fill="none"
      viewBox="0 0 46 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!!dotted ? <circle cx="3" cy="3" fill="#EB5757" r="3" /> : null}
      <circle cx="26" cy="20" fill="#D7FFDB" r="20" />
      <path
        d="M29.6296 25.0204L21.2103 25.0204L21.2103 16.4361"
        stroke="#00AB11"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M33 12.9998L21.3281 24.9004"
        stroke="#00AB11"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ) : null;
};

export default AppIcons3;
