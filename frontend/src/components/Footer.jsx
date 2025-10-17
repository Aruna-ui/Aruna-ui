import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-charcoal text-cream-white py-12 overflow-hidden">
      {/* Subtle Rose Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1516565349308-c76fe36a115c?w=400"
          alt="Rose pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-burgundy rounded-full flex items-center justify-center">
              <span className="text-cream-white text-2xl font-serif">A</span>
            </div>
            <div>
              <h3 className="text-2xl font-serif">Aruna</h3>
              <p className="text-xs tracking-widest text-warm-gray uppercase">Author</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-soft-pink italic font-serif text-lg">
            Where Beauty Holds the Blade
          </p>

          {/* Divider */}
          <div className="w-32 h-px bg-burgundy/50"></div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#home" className="hover:text-burgundy transition-colors duration-300">
              Home
            </a>
            <a href="#about" className="hover:text-burgundy transition-colors duration-300">
              About
            </a>
            <a href="#books" className="hover:text-burgundy transition-colors duration-300">
              Books
            </a>
            <a href="#contact" className="hover:text-burgundy transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 text-warm-gray text-sm">
            <p className="flex items-center justify-center">
              © {new Date().getFullYear()} Aruna. Crafted with
              <Heart className="w-4 h-4 mx-1 text-burgundy fill-burgundy" />
              for readers everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;