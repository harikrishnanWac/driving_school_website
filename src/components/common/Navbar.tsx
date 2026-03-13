'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Car } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-xl group-hover:bg-secondary transition-colors duration-300">
              <Car size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}>
              SafeDrive
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? 'text-gray-600' : 'text-white/90 hover:text-white'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a href="#contact">
              <Button variant={isScrolled ? 'primary' : 'secondary'} size="sm" className="hidden lg:inline-flex shadow-sm">
                Enroll Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-900 md:text-white hover:bg-black/10'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-base font-medium text-gray-700 py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="primary" fullWidth>
              Enroll Now
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
