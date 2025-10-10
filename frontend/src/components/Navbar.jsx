import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Department Logo"
              className="w-10 h-10 rounded-full object-cover border border-blue-300 shadow-sm"
            />
            <span className="font-bold text-blue-700 text-sm md:text-xl tracking-tight">
              IT Dept. Alumni Portal
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className={linkClass}>
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
          <div className="md:hidden mt-2 bg-white border rounded-lg shadow-md animate-slide-down">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
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
