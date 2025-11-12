import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="bg-gray-50 text-gray-500 dark:bg-gray-900/80 dark:text-gray-400 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <span>© {currentYear} IT Dept. Alumni Management</span>
        <span className="mt-2 md:mt-0">HITK</span>
      </div>
    </footer>
  );
};

export default Footer;
