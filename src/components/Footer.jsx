import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#003399] text-white px-6 py-12 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Zubplug</h3>
          <p className="text-sm">
            Your trusted platform for identity, compliance, business, and fintech services in Nigeria.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#faq" className="hover:underline">FAQs</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/register" className="hover:underline">Register</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="text-sm space-y-1">
            <li>Email: info@zubplug.com</li>
            <li>WhatsApp: +234 901 234 5678</li>
            <li>Location: Abuja, Nigeria</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-300 mt-10">
        &copy; {new Date().getFullYear()} Zubplug Digital Integrated Services Limited. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
