import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/cl.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Alumni", to: "/alumni" },
    { name: "Events", to: "/events" },
    { name: "Notifications", to: "/notifications" },
  ];

  // Theme (dark/light) stored in localStorage and applied to document.documentElement
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("site-theme");
      if (stored) return stored;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    try {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("site-theme", theme);
    } catch (e) {}
  }, [theme]);

  const linkClassBase = "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

  return (
  <nav className="bg-white/90 text-gray-900 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm dark:bg-gradient-to-b dark:from-gray-900/80 dark:to-gray-900/60 dark:text-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Department Logo"
              className="w-10 h-10 rounded-full object-cover border border-gray-700 shadow-sm"
            />
            <span className="font-bold text-blue-700 text-sm md:text-xl tracking-tight dark:text-cyan-300">IT Dept. Alumni Portal</span>
          </div>

          {/* Desktop Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `${linkClassBase} ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md dark:bg-cyan-600 dark:text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 p-2 rounded-md text-blue-700 hover:text-blue-900 bg-blue-100 dark:text-gray-200 dark:hover:text-white dark:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-200 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white/95 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md animate-slide-down">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${linkClassBase} ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md dark:bg-cyan-600 dark:text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Removed mobile theme toggle */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
