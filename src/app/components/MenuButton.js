// components/HamburgerIcon.js

import React from 'react';
import { useTheme } from "next-themes";

const HamburgerIcon = () => {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d={theme === "dark" ? "M4 6h16M4 12h16m-7 6h7" : "M4 6h16M4 12h16M4 18h16"}
        stroke={theme === "dark" ? "white" : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default HamburgerIcon;
