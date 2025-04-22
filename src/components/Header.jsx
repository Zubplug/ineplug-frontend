import React from 'react';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-[#003399] text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo + Name */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Zubplug Logo" className="h-8 w-auto" />
          <span className="text-lg md:text-xl font-bold">Zubplug</span>
        </div>

        {/* Nav links for desktop */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#services" className="hover:underline">Services</a>
          <a href="#faq" className="hover:underline">FAQs</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center space-x-3">
          <a
            href="/login"
            className="text-sm font-semibold hover:underline"
          >
            Log in
          </a>
          <a
            href="/register"
            className="bg-white text-[#003399] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-100 transition"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
