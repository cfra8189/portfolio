import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("color-scheme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("color-scheme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label="Toggle color scheme"
      onClick={toggle}
      className={`theme-toggle ${isDark ? "is-dark" : "is-light"}`}
    >
      <span className="track" />
      <span className="thumb" />
    </button>
  );
};

export default ThemeToggle;
