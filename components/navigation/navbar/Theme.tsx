"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

type iTheme = "light" | "dark";

const Theme = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    const newTheme: iTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const isLight = theme === "light";

  return (
    <button
      onClick={handleToggle}
      className={`
        relative h-6 w-12 rounded-full transition-all duration-300 ease-in-out
        ${isLight ? "bg-orange-500" : "bg-gray-900"}
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isLight ? "focus:ring-orange-300" : "focus:ring-gray-400"}
      `}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <div
          className={`transition-opacity duration-300 ${
            isLight ? "opacity-100" : "opacity-40"
          }`}
        >
          <Sun className="size-3 text-white" />
        </div>
        <div
          className={`transition-opacity duration-300 ${
            !isLight ? "opacity-100" : "opacity-40"
          }`}
        >
          <Moon className="size-3 text-white" />
        </div>
      </div>

      {/* Toggle Circle */}
      <div
        className={`
          absolute top-0.5 flex size-5 items-center justify-center rounded-full bg-white
          shadow-sm transition-transform duration-300 ease-in-out
          ${isLight ? "translate-x-0.5" : "translate-x-6"}
        `}
      >
        {isLight ? (
          <Sun className="size-3 text-orange-500" />
        ) : (
          <Moon className="size-3 text-gray-700" />
        )}
      </div>
    </button>
  );
};

export default Theme;
