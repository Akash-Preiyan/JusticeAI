import React, { useState } from 'react';
import { Scale, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-red-900" />
            <Link to="/" className="text-2xl font-serif font-bold text-legal-black hover:text-deep-brown transition-colors">
              JusticeAI
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-red-900 transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-gray-700 hover:text-red-900 transition-colors">
              Benefits
            </a>
            <a href="#technology" className="text-gray-700 hover:text-red-900 transition-colors">
              Technology
            </a>
            <Link 
              to="/signup" 
              className="bg-burgundy-red text-cream px-6 py-2 rounded-lg font-semibold hover:bg-[#7a1515] transition-colors border-2 border-gold-500"
            >
              Dashboard
            </Link>
            
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#features" className="block py-2 text-gray-700 hover:text-red-900">
              Features
            </a>
            <a href="#benefits" className="block py-2 text-gray-700 hover:text-red-900">
              Benefits
            </a>
            <a href="#technology" className="block py-2 text-gray-700 hover:text-red-900">
              Technology
            </a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-red-900">
              Pricing
            </a>
            <button className="w-full bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors mt-2">
              Dashboard
            </button>
          
          </div>
        )}
      </div>
    </nav>
  );
}