import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/90 backdrop-blur-md shadow-inner mt-12 border-t">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <span>© {currentYear} IT Dept. Alumni Management</span>
        <span className="mt-2 md:mt-0">HITK</span>
      </div>
    </footer>
  );
};

export default Footer;
