import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
          <span className="hidden md:inline text-gray-300">|</span>
          <Link to="/plans" className="text-gray-600 hover:text-emerald-600 transition-colors">Plans</Link>
          <span className="hidden md:inline text-gray-300">|</span>
          <Link to="/schedule" className="text-gray-600 hover:text-emerald-600 transition-colors">Schedule</Link>
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} VitalCore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;