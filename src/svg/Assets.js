import React from "react";

const Assets = ({ asset }) => {
  return asset === "usdt" ? (
    <svg
      height="30"
      width="30"
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C23.2839 0 30 6.7161 30 15C30 23.2839 23.2836 30 15 30C6.7164 30 0 23.2857 0 15C0 6.7143 6.7152 0 15 0Z"
        fill="#53AE94"
      />
      <path
        d="M16.8513 13.0014V10.77H21.954V7.37012H8.05918V10.77H13.1625V12.9996C9.01498 13.1901 5.89648 14.0115 5.89648 14.9955C5.89648 15.9795 9.01648 16.8009 13.1625 16.9926V24.1401H16.8525V16.992C20.9925 16.8009 24.1047 15.9801 24.1047 14.997C24.1047 14.0139 20.9925 13.1931 16.8525 13.002L16.8513 13.0014ZM16.8525 16.3866V16.3848C16.7484 16.3914 16.2135 16.4235 15.0225 16.4235C14.0703 16.4235 13.4004 16.3965 13.1643 16.3842V16.3872C9.50008 16.2249 6.76498 15.5868 6.76498 14.8233C6.76498 14.0598 9.50038 13.4226 13.1643 13.26V15.7515C13.4043 15.768 14.0907 15.8085 15.0381 15.8085C16.176 15.8085 16.7481 15.7611 16.8531 15.7515V13.26C20.5101 13.4229 23.2389 14.0616 23.2389 14.8224C23.2389 15.5832 20.5089 16.2222 16.8531 16.3851"
        fill="white"
      />
    </svg>
  ) : asset === "usdc" ? (
    <svg
      viewBox="0 0 2000 2000"
      xmlns="http://www.w3.org/2000/svg"
      data-name="86977684-12db-4850-8f30-233a7c267d11"
    >
      <path
        d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
        fill="#2775ca"
      />
      <path
        d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
        fill="#fff"
      />
      <path
        d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
        fill="#fff"
      />
    </svg>
  ) : asset === "algo" ? (
    <svg
      height="378"
      width="378"
      fill="none"
      viewBox="0 0 378 378"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="189" cy="189" fill="black" r="189" />
      <path
        d="M308.36 308.68H270.99L246.72 218.4L194.54 308.69H152.82L233.47 168.93L220.49 120.41L111.74 308.72H70L207.82 70H244.36L260.36 129.31H298.06L272.32 174.07L308.36 308.68Z"
        fill="white"
      />
    </svg>
  ) : null;
};

export default Assets;
