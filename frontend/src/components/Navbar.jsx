import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for hamburger icon
import logo from "../assets/cl.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkBase =
    "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const linkActive =
    "bg-blue-600 text-white shadow-md hover:bg-blue-700";
  const linkInactive =
    "text-gray-700 hover:bg-blue-100 hover:text-blue-700";

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Projects", to: "/projects" },
    { name: "Alumni", to: "/alumni" },
    { name: "Events", to: "/events" },
    { name: "Notifications", to: "/notifications" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Department Logo"
              className="w-10 h-10 rounded-full object-cover border border-blue-300 shadow-sm"
            />
            <span className="text-sm md:text-xl font-bold text-blue-700 tracking-tight">
              IT Dept. Alumni Management
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-700 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white border rounded-lg shadow-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)} // close menu on click
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive ? linkActive : linkInactive
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
