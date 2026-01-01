"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "candlelit", label: "Candlelit Tavern" },
  { id: "moonlit", label: "Moonlit Hearth" },
  { id: "forest", label: "Whispering Forest" }
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("candlelit");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("tavern-theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("tavern-theme", theme);
  }, [theme]);

  return (
    <label className="badge" style={{ gap: "0.5rem" }}>
      Theme
      <select
        aria-label="Theme selector"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        style={{
          background: "transparent",
          color: "inherit",
          border: "none",
          outline: "none",
          cursor: "pointer"
        }}
      >
        {themes.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
