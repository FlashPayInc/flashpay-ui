//

const Icon = {
  caretdown: () => (
    <svg
      fill="none"
      className="caret"
      viewBox="0 0 7 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6665 0.833415L3.83317 3.16675L5.99984 0.833415"
        strokeLinecap="round"
        strokeWidth=".6"
      />
    </svg>
  ),

  NavBtn: () => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 19.84L12.52 13.32C13.29 12.55 13.29 11.29 12.52 10.52L6 4"
        stroke="#16292D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M11 19.84L17.52 13.32C18.29 12.55 18.29 11.29 17.52 10.52L11 4"
        stroke="#16292D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  CloseX: () => (
    <svg
      height="10"
      width="10"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.757324 0.757324L9.24261 9.24261"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M0.757324 9.24261L9.24261 0.757324"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  ArrowLeft: () => (
    <svg
      height="24"
      width="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.57 5.93018L3.5 12.0002L9.57 18.0702"
        stroke="#16292D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M20.5 12H3.67001"
        stroke="#16292D"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

export default Icon;
